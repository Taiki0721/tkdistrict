// Common JavaScript for TKDistrict Website
// This file contains common elements like GA tags, meta tags, and shared functionality

(function() {
    'use strict';
    
    // ========================================
    // Google Analytics 4 (GA4) Configuration
    // ========================================
    
    // Get GA Measurement ID from config
    const GA_MEASUREMENT_ID = window.TKDistrict?.Config?.analytics?.measurementId || 'G-GGV3SKNK0P';
    
    // Load Google Analytics
    function loadGoogleAnalytics() {
        // Create script element for GA
        const gaScript = document.createElement('script');
        gaScript.async = true;
        gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(gaScript);
        
        // Initialize GA
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', GA_MEASUREMENT_ID, {
            page_title: document.title,
            page_location: window.location.href
        });
        
        // Make gtag available globally
        window.gtag = gtag;
    }
    
    // ========================================
    // Common Meta Tags Injection
    // ========================================
    
    function injectCommonMetaTags() {
        const commonMetaTags = [
            { name: 'author', content: 'TKDistrict' },
            { name: 'robots', content: 'index, follow' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
            { name: 'theme-color', content: '#2d2d2d' },
            { property: 'og:site_name', content: 'TKDistrict' },
            { property: 'og:type', content: 'website' },
            { property: 'og:locale', content: 'ja_JP' }
        ];
        
        commonMetaTags.forEach(tag => {
            if (!document.querySelector(`meta[name="${tag.name}"]`) && 
                !document.querySelector(`meta[property="${tag.property}"]`)) {
                const meta = document.createElement('meta');
                if (tag.name) meta.name = tag.name;
                if (tag.property) meta.setAttribute('property', tag.property);
                meta.content = tag.content;
                document.head.appendChild(meta);
            }
        });
    }
    
    // ========================================
    // Sample Page CSS Injection
    // ========================================
    
    function injectSamplePageCSS() {
        if (document.querySelector('link[href*="css/sample_page.css"]')) {
            return;
        }
        
        const commonCSS = document.createElement('link');
        commonCSS.rel = 'stylesheet';
        commonCSS.href = 'css/sample_page.css';
        commonCSS.type = 'text/css';
        document.head.appendChild(commonCSS);
    }
    
    // ========================================
    // Sample Page Header/Footer Injection
    // ========================================
    
    function injectSamplePageHeader() {
        const headerContainer = document.getElementById('common-header');
        if (headerContainer && !headerContainer.innerHTML.trim()) {
            headerContainer.innerHTML = `
            `;
        }
    }
    
    function injectSamplePageFooter() {
        const footerContainer = document.getElementById('common-footer');
        if (footerContainer && !footerContainer.innerHTML.trim()) {
            footerContainer.innerHTML = `
                <footer class="footer fade-in">
                    <div class="footer-logo">TKD</div>
                    <nav class="nav">
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li><a href="sample1.html">Sample1</a></li>
                            <li><a href="sample2.html">Sample2</a></li>
                            <li><a href="sample3.html">Sample3</a></li>
                            <li><a href="sample4.html">Sample4</a></li>
                            <li><a href="sample5.html">Sample5</a></li>
                        </ul>
                    </nav>
                    <p class="footer-text">&copy; 2025 TKDistrict. All rights reserved.</p>
                </footer>
            `;
        }
    }
    
    // ========================================
    // Utility Functions
    // ========================================
    
    function addFadeInAnimation() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.fade-in').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            observer.observe(el);
        });
    }
    
    function addSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // ========================================
    // Page Load Handler
    // ========================================
    
    function initializePage() {
        // Load GA (only in production)
        if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
            loadGoogleAnalytics();
        }
        
        // Inject common elements
        injectCommonMetaTags();
        
        // Inject header only for sample pages (sample1.html to sample5.html)
        const currentPage = window.location.pathname.split('/').pop();
        if (currentPage && currentPage.match(/^sample[1-5]\.html$/)) {
            injectSamplePageCSS();
            injectSamplePageHeader();
            injectSamplePageFooter();
        }
        
        // Add common functionality
        addFadeInAnimation();
        addSmoothScrolling();
        
        // Page-specific initialization
        if (typeof window.initializePageSpecific === 'function') {
            window.initializePageSpecific();
        }
    }
    
    // ========================================
    // Export Functions for External Use
    // ========================================
    
    window.TKDistrict = window.TKDistrict || {};
    window.TKDistrict.Common = {
        loadGoogleAnalytics,
        injectCommonMetaTags,
        injectSamplePageCSS,
        injectSamplePageHeader,
        injectSamplePageFooter,
        addFadeInAnimation,
        addSmoothScrolling,
        initializePage
    };
    
    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializePage);
    } else {
        initializePage();
    }
    
})(); 