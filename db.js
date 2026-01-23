import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'iakvenir_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

let pool;

export async function getDbConnection() {
    if (!pool) {
        pool = mysql.createPool(dbConfig);

        // Test connection and create table if not exists
        try {
            const connection = await pool.getConnection();
            console.log('[DB] Connected to MySQL');

            await connection.query(`
                CREATE TABLE IF NOT EXISTS identities (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    prenom VARCHAR(255),
                    nom VARCHAR(255),
                    email VARCHAR(255),
                    phone VARCHAR(50),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);

            await connection.query(`
                CREATE TABLE IF NOT EXISTS reservations (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    prenom VARCHAR(255),
                    nom VARCHAR(255),
                    email VARCHAR(255),
                    phone VARCHAR(50),
                    pickup VARCHAR(255),
                    drop_off VARCHAR(255),
                    pax INT,
                    duration VARCHAR(50),
                    price_est VARCHAR(50),
                    pickup_datetime VARCHAR(100),
                    arrival_datetime VARCHAR(100),
                    option_type VARCHAR(255),
                    ambiance VARCHAR(255),
                    notes TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);

            await connection.query(`
                CREATE TABLE IF NOT EXISTS route_cache (
                    route_key VARCHAR(500) PRIMARY KEY,
                    dist_km INT,
                    duration_min INT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);

            await connection.query(`
                CREATE TABLE IF NOT EXISTS api_usage (
                    month_year VARCHAR(7) PRIMARY KEY,
                    request_count INT DEFAULT 0
                )
            `);

            await connection.query(`
                CREATE TABLE IF NOT EXISTS user_daily_usage (
                    user_id VARCHAR(255),
                    usage_date DATE,
                    request_count INT DEFAULT 0,
                    PRIMARY KEY (user_id, usage_date)
                )
            `);

            connection.release();
        } catch (err) {
            console.error('[DB] MySQL Connection/Init Error:', err);
        }
    }
    return pool;
}

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const HISTORY_FILE = path.join(__dirname, 'simulator_history.json');

// Helper to read/write JSON history
function readHistory() {
    try {
        if (!fs.existsSync(HISTORY_FILE)) {
            return { routes: {}, quota: {} };
        }
        return JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'));
    } catch (err) {
        console.error('[CACHE] Read Error:', err);
        return { routes: {}, quota: {} };
    }
}

function writeHistory(data) {
    try {
        fs.writeFileSync(HISTORY_FILE, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('[CACHE] Write Error:', err);
    }
}

export async function getCachedRoute(key) {
    // Try Database First
    try {
        const db = await getDbConnection();
        const [rows] = await db.execute(`SELECT dist_km, duration_min FROM route_cache WHERE route_key = ?`, [key]);
        if (rows.length > 0) return rows[0];
    } catch (err) {
        // Fallback to JSON
        const history = readHistory();
        if (history.routes[key]) {
            console.log(`[CACHE] Serving from JSON History: ${key}`);
            return history.routes[key];
        }
    }
    return null;
}

export async function saveToCache(key, distKm, durationMin) {
    // Save to Database
    try {
        const db = await getDbConnection();
        await db.execute(
            `INSERT INTO route_cache (route_key, dist_km, duration_min) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE dist_km = ?, duration_min = ?`,
            [key, distKm, durationMin, distKm, durationMin]
        );
    } catch (err) {
        // Keep it simple if DB fails: use JSON
    }

    // Always keep JSON in sync (for portability/backup)
    const history = readHistory();
    history.routes[key] = { dist_km: distKm, duration_min: durationMin, date: new Date().toISOString() };
    writeHistory(history);
}

export async function checkQuotaAndIncrement(limit = 9999) {
    const monthYear = new Date().toISOString().slice(0, 7); // "YYYY-MM"
    let currentCount = 0;

    // Try DB Quota first
    try {
        const db = await getDbConnection();
        const [rows] = await db.execute(`SELECT request_count FROM api_usage WHERE month_year = ?`, [monthYear]);
        currentCount = rows.length > 0 ? rows[0].request_count : 0;

        if (currentCount >= limit) return { allowed: false, currentCount };

        if (rows.length > 0) {
            await db.execute(`UPDATE api_usage SET request_count = request_count + 1 WHERE month_year = ?`, [monthYear]);
        } else {
            await db.execute(`INSERT INTO api_usage (month_year, request_count) VALUES (?, 1)`, [monthYear]);
        }
        return { allowed: true, currentCount: currentCount + 1 };
    } catch (err) {
        // Fallback to JSON Quota
        const history = readHistory();
        if (!history.quota) history.quota = {};
        currentCount = history.quota[monthYear] || 0;

        if (currentCount >= limit) return { allowed: false, currentCount };

        history.quota[monthYear] = currentCount + 1;
        writeHistory(history);
        return { allowed: true, currentCount: currentCount + 1 };
    }
}

export async function checkUserQuotaAndIncrement(userId, limit = 4) {
    if (!userId || userId === 'anonymous') return { allowed: true, currentCount: 0 };

    const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
    let currentCount = 0;

    try {
        const db = await getDbConnection();
        const [rows] = await db.execute(
            `SELECT request_count FROM user_daily_usage WHERE user_id = ? AND usage_date = ?`,
            [userId, today]
        );
        currentCount = rows.length > 0 ? rows[0].request_count : 0;

        if (currentCount >= limit) return { allowed: false, currentCount };

        if (rows.length > 0) {
            await db.execute(
                `UPDATE user_daily_usage SET request_count = request_count + 1 WHERE user_id = ? AND usage_date = ?`,
                [userId, today]
            );
        } else {
            await db.execute(
                `INSERT INTO user_daily_usage (user_id, usage_date, request_count) VALUES (?, ?, 1)`,
                [userId, today]
            );
        }
        return { allowed: true, currentCount: currentCount + 1 };
    } catch (err) {
        console.error('[DB] User Quota Error:', err);
        // On error, let it pass to avoid blocking users if DB has issues
        return { allowed: true, currentCount: 0 };
    }
}

export async function saveIdentity(data) {
    const db = await getDbConnection();
    const [result] = await db.execute(
        `INSERT INTO identities (prenom, nom, email, phone) VALUES (?, ?, ?, ?)`,
        [data.prenom, data.nom, data.email, data.phone]
    );
    return result.insertId;
}

export async function saveReservation(data) {
    const db = await getDbConnection();
    const [result] = await db.execute(
        `INSERT INTO reservations 
        (prenom, nom, email, phone, pickup, drop_off, pax, duration, price_est, pickup_datetime, arrival_datetime, option_type, ambiance, notes) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            data.prenom,
            data.nom,
            data.email,
            data.phone,
            data.pickup,
            data.drop,
            data.pax,
            data.duration,
            data.price_est,
            data.pickup_datetime,
            data.arrival_datetime,
            data.option_type,
            data.ambiance,
            data.notes
        ]
    );
    return result.insertId;
}
