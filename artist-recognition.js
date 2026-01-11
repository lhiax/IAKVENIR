// ============================================
// ARTIST RECOGNITION SYSTEM - CAPTION-BASED
// ============================================
// Version 2.0 - Manuel avec stockage de légendes
// Désactivation de l'API Google Vision
// Utilisation de localStorage pour les légendes

// YouTube Player Variables
let ytPlayer = null;
let ytPlayerReady = false;

// Caption Storage (localStorage)
const CAPTION_STORAGE_KEY = 'festival_photo_captions';

// ============================================
// YOUTUBE PLAYER INITIALIZATION
// ============================================

window.onYouTubeIframeAPIReady = function () {
    ytPlayer = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'modestbranding': 1,
            'rel': 0
        },
        events: {
            'onReady': () => {
                ytPlayerReady = true;
                console.log('YouTube Player Ready');
            },
            'onStateChange': (event) => {
                if (event.data === YT.PlayerState.ENDED) {
                    console.log('YouTube video ended');
                }
            }
        }
    });
};

// ============================================
// CAPTION STORAGE FUNCTIONS
// ============================================

/**
 * Get all stored captions from localStorage
 */
function getCaptions() {
    const stored = localStorage.getItem(CAPTION_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
}

/**
 * Save a caption for a specific image
 */
function saveCaption(imageUrl, artistName) {
    const captions = getCaptions();
    captions[imageUrl] = artistName;
    localStorage.setItem(CAPTION_STORAGE_KEY, JSON.stringify(captions));
    console.log(`Caption saved: ${imageUrl} -> ${artistName}`);
}

/**
 * Get caption for a specific image
 */
function getCaption(imageUrl) {
    const captions = getCaptions();
    return captions[imageUrl] || null;
}

/**
 * Delete caption for a specific image
 */
function deleteCaption(imageUrl) {
    const captions = getCaptions();
    delete captions[imageUrl];
    localStorage.setItem(CAPTION_STORAGE_KEY, JSON.stringify(captions));
}

// ============================================
// ARTIST NAME EXTRACTION
// ============================================

/**
 * Extract artist name from filename
 * Supports multiple formats:
 * 1. "festival_XXX Artist Name.jpg" -> "Artist Name"
 * 2. "Avicii festival_001.jpg" -> "Avicii"
 * 3. "festival_artist-slug_XXX.jpg" -> "Artist Slug" (Legacy)
 */
function extractArtistFromFilename(imageUrl) {
    // Decode URL to handle spaces (%20)
    const filename = decodeURIComponent(imageUrl.split('/').pop().split('.')[0]);

    // Format 1: "festival_XXX Artist Name" (e.g., festival_002 JOACHIM GARRAUD)
    // Regex: starts with festival_, then 3 digits, then space, then capturing group
    const matchSuffix = filename.match(/^festival_\d{3}\s+(.+)$/i);
    if (matchSuffix && matchSuffix[1]) {
        return matchSuffix[1].trim();
    }

    // Format 2: "Artist Name festival_XXX" (e.g., Avicii festival_001)
    // Regex: capturing group, then space, then festival_, then 3 digits
    const matchPrefix = filename.match(/^(.+)\s+festival_\d{3}$/i);
    if (matchPrefix && matchPrefix[1]) {
        return matchPrefix[1].trim();
    }

    // Format 3: Legacy "festival_artist_XXX"
    const parts = filename.split('_');
    if (parts.length >= 3 && parts[0] === 'festival') {
        // Exclude first part (festival) and last (number)
        // Only if they look like the legacy format (no spaces logic handled above)
        if (!filename.includes(' ')) {
            const artistSlug = parts.slice(1, -1).join(' ');
            return artistSlug.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
        }
    }

    return null;
}

/**
 * Get artist name with priority:
 * 1. Caption from localStorage
 * 2. Filename extraction
 * 3. null (needs manual input)
 */
function getArtistName(imageUrl) {
    // Priority 1: Check caption storage
    const storedCaption = getCaption(imageUrl);
    if (storedCaption) {
        console.log(`Artist from caption: ${storedCaption}`);
        return storedCaption;
    }

    // Priority 2: Try filename extraction
    const filenameArtist = extractArtistFromFilename(imageUrl);
    if (filenameArtist) {
        console.log(`Artist from filename: ${filenameArtist}`);
        // Auto-save to caption storage for future use
        saveCaption(imageUrl, filenameArtist);
        return filenameArtist;
    }

    // No artist found
    console.log('No artist name found - manual input required');
    return null;
}

// ============================================
// YOUTUBE MUSIC SEARCH
// ============================================

/**
 * Search YouTube for artist music
 */
async function searchYouTubeMusic(artistName) {
    if (!window.API_CONFIG || !window.API_CONFIG.youtube.apiKey) {
        console.error('YouTube API not configured');
        return null;
    }

    try {
        const searchQuery = encodeURIComponent(`${artistName} live concert`);
        const url = `${window.API_CONFIG.youtube.searchEndpoint}?part=snippet&q=${searchQuery}&type=video&videoCategoryId=10&maxResults=1&key=${window.API_CONFIG.youtube.apiKey}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            const videoId = data.items[0].id.videoId;
            console.log(`YouTube video found: ${videoId} for ${artistName}`);
            return videoId;
        } else {
            console.warn(`No YouTube video found for ${artistName}`);
            return null;
        }
    } catch (error) {
        console.error('YouTube search error:', error);
        return null;
    }
}

// ============================================
// UI MANAGEMENT
// ============================================

/**
 * Show caption editor
 */
function showCaptionEditor(imageUrl) {
    const editor = document.getElementById('caption-editor');
    const input = document.getElementById('caption-input');
    const savedMsg = document.getElementById('caption-saved-msg');

    if (!editor || !input) return;

    // Reset UI
    input.value = '';
    savedMsg.classList.add('hidden');

    // Show editor
    editor.classList.remove('hidden');

    // Focus input
    setTimeout(() => input.focus(), 100);
}

/**
 * Hide caption editor
 */
function hideCaptionEditor() {
    const editor = document.getElementById('caption-editor');
    if (editor) {
        editor.classList.add('hidden');
    }
}

/**
 * Show caption display with artist name
 */
function showCaptionDisplay(artistName) {
    const display = document.getElementById('caption-display');
    const text = document.getElementById('caption-text');

    if (!display || !text) return;

    text.textContent = artistName.toUpperCase();
    display.classList.remove('hidden');
}

/**
 * Hide caption display
 */
function hideCaptionDisplay() {
    const display = document.getElementById('caption-display');
    if (display) {
        display.classList.add('hidden');
    }
}

// ============================================
// MAIN PLAYBACK FUNCTION
// ============================================

/**
 * Main function to handle artist music playback
 * Called when a festival photo is opened in lightbox
 * SILENT MODE: No UI, just automatic music playback for surprise effect
 */
window.playArtistMusic = async function (imageUrl) {
    console.log('=== Artist Music System (Silent Mode) ===');
    console.log('Image:', imageUrl);

    // 1. Check if radio is playing
    if (typeof isRadioPlaying === 'function' && isRadioPlaying()) {
        console.log('Radio is playing, skipping artist music');
        return;
    }

    // 2. Get artist name (from filename or localStorage)
    const artistName = getArtistName(imageUrl);

    // 3. If no artist name found, silently skip (no UI prompt)
    if (!artistName) {
        console.log('No artist name found - skipping music playback');
        return;
    }

    // 4. Artist found - play music silently
    console.log(`Artist found: ${artistName} - Playing music silently`);

    // 5. Check if YouTube player is ready
    if (!ytPlayerReady) {
        console.warn('YouTube player not ready yet');
        return;
    }

    // 6. Search for YouTube video
    const videoId = await searchYouTubeMusic(artistName);
    if (!videoId) {
        console.warn('No video found for artist');
        return;
    }

    // 7. Play the video (invisible, surprise effect)
    ytPlayer.loadVideoById(videoId);
    ytPlayer.setVolume(30); // Volume à 30%
    console.log(`🎵 Playing music for ${artistName} (silent mode - surprise!)`);
};

/**
 * Stop YouTube music playback
 */
window.stopYouTubeMusic = function () {
    if (ytPlayer && ytPlayerReady) {
        ytPlayer.stopVideo();
        console.log('YouTube music stopped');
    }
};

// ============================================
// SYSTEM READY
// ============================================

console.log('Artist Recognition System v2.0 (Silent Mode) Loaded');
console.log('✓ Automatic artist detection from filename');
console.log('✓ Silent music playback for surprise effect');
console.log('✓ No UI - fully invisible system');
