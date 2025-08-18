// Configuration file for TKDistrict Website
// Update these values as needed

window.TKDistrict = window.TKDistrict || {};
window.TKDistrict.Config = {
    // ========================================
    // Google Analytics Configuration
    // ========================================
    analytics: {
        // Replace with your actual GA4 Measurement ID
        measurementId: 'G-GGV3SKNK0P',
        
        // Enable/disable analytics
        enabled: true,
        
        // Track specific events
        trackEvents: {
            pageViews: true,
            buttonClicks: true,
            formSubmissions: true,
            downloads: true
        }
    },
    
    // ========================================
    // Site Configuration
    // ========================================
    site: {
        name: 'TKDistrict',
        description: 'IT Consultant - デジタル変革をサポートするITコンサルタント',
        url: 'https://tkdistrict.com',
        email: 'info@tkdistrict.com'
    },
    
    // ========================================
    // Navigation Configuration
    // ========================================
    navigation: {
        items: [
            { name: 'ホーム', url: 'index.html' },
            { name: 'サンプル1', url: 'sample1.html' },
            { name: 'サンプル2', url: 'sample2.html' },
            { name: 'サンプル3', url: 'sample3.html' },
            { name: 'サンプル4', url: 'sample4.html' },
            { name: 'サンプル5', url: 'sample5.html' },
            { name: 'サンプル6', url: 'sample6.html' }
        ]
    },
    
    // ========================================
    // Social Media Configuration
    // ========================================
    social: {
        twitter: '@tkdistrict',
        linkedin: 'tkdistrict',
        github: 'tkdistrict'
    },
    
    // ========================================
    // Feature Flags
    // ========================================
    features: {
        darkMode: true,
        animations: true,
        lazyLoading: true,
        serviceWorker: false
    },
    
    // ========================================
    // Performance Configuration
    // ========================================
    performance: {
        lazyLoadImages: true,
        preloadCriticalResources: true,
        cacheStrategy: 'network-first'
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.TKDistrict.Config;
} 