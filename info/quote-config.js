/**
 * Sky Shield Quote Calculator Configuration
 * 
 * Edit these values to adjust pricing and calculator behavior.
 * All prices in USD.
 */

const QUOTE_CONFIG = {
    // ============================================
    // BASE PRICING
    // ============================================
    
    // Price per team for base coverage (8 hours)
    BASE_PER_TEAM: 7500,
    
    // Number of hours included in base package
    BASE_HOURS: 8,
    
    // Price per extra hour (per team)
    EXTRA_HOUR_RATE: 750,
    
    // Drones per team (for display purposes)
    DRONES_PER_TEAM: '2-3',
    
    
    // ============================================
    // LOAD CALCULATION
    // ============================================
    // Teams = ceil((area/AREA_DIVISOR + perimeter/PERIMETER_DIVISOR) * complexity)
    
    // Acres - higher = fewer teams for same area
    AREA_DIVISOR: 15,
    
    // Feet - higher = fewer teams for same perimeter
    PERIMETER_DIVISOR: 5000,
    
    
    // ============================================
    // COMPLEXITY MULTIPLIERS
    // ============================================
    // These add to the base complexity of 1.0
    
    RISK_MULTIPLIER: {
        standard: 0,      // No additional complexity
        elevated: 0.25,   // VIPs, media presence
        high: 0.5         // Executives, public figures
    },
    
    // Site complexity toggles
    ENTRANCES_MULTIPLIER: 0.2,    // 4+ entrances
    PARKING_MULTIPLIER: 0.2,      // Multi-lot parking
    ROOFTOPS_MULTIPLIER: 0.15,    // Adjacent rooftops to monitor
    NIGHT_MULTIPLIER: 0.1,        // Night event (thermal needed)
    
    
    // ============================================
    // ADD-ON PRICING
    // ============================================
    
    ADDONS: {
        // Cinematic recap reel for marketing/social
        recap: {
            name: 'Cinematic Recap Reel',
            price: 1500,
            description: 'Professional edited highlight video'
        },
        
        // Full raw content for client use
        content: {
            name: 'Full Content Capture',
            price: 2500,
            description: 'All raw footage and clips delivered'
        },
        
        // Pre-event site mapping with zone overlay
        mapping: {
            name: 'Site Mapping + Zone Overlay',
            price: 1000,
            description: 'Detailed venue map with security zones'
        },
        
        // Same-night safety receipt delivery
        expedited: {
            name: 'Expedited Safety Receipt',
            price: 1000,
            description: 'Report delivered same night instead of next day'
        },
        
        // LiDAR/3D scan - custom quoted
        lidar: {
            name: 'Advanced Site Scan (LiDAR/3D)',
            price: 0,  // Custom quote
            description: 'High-resolution 3D scan of venue',
            customQuote: true
        }
    },
    
    
    // ============================================
    // MAPBOX CONFIGURATION
    // ============================================
    
    // Replace with your Mapbox public token
    // Get one at https://account.mapbox.com/
    MAPBOX_TOKEN: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
    
    // Default map center (Austin, TX)
    DEFAULT_CENTER: [-97.7431, 30.2672],
    DEFAULT_ZOOM: 15,
    
    // Map style
    MAP_STYLE: 'mapbox://styles/mapbox/satellite-streets-v12',
    
    
    // ============================================
    // FORM CONFIGURATION
    // ============================================
    
    // Email recipient for quote requests
    QUOTE_EMAIL: 'kavin.lingham@alpha.school',
    
    // Calendly link for booking calls
    CALENDLY_URL: 'https://calendly.com',
    
    
    // ============================================
    // DEFAULTS
    // ============================================
    
    // Default values for manual input fallback
    DEFAULT_AREA: 5,        // acres
    DEFAULT_PERIMETER: 3000, // feet
    DEFAULT_HOURS: 8,
    
    // Hour slider range
    MIN_HOURS: 4,
    MAX_HOURS: 16,
    
    
    // ============================================
    // VALIDATION
    // ============================================
    
    // Minimum teams (never show 0)
    MIN_TEAMS: 1,
    
    // Maximum reasonable values for manual input
    MAX_AREA: 500,         // acres
    MAX_PERIMETER: 50000,  // feet
};

// Export for use in quote calculator
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QUOTE_CONFIG;
}
