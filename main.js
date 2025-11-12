/**
 * 🕌 TOWN JAMA MASJID - COMPLETE WEBSITE FUNCTIONALITY
 * Combines EmailJS, Islamic Calendar, Carousel, Form Validation & Network Monitoring
 * Merged from existing working code with enhanced error handling
 */

// ============================================
// Initialize Everything on DOM Load
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🕌 Town Jama Masjid website loaded');
    logger.info('=== Page Loaded ===');
    
    // Initialize all modules
    initializeEmailJS();
    initializeIslamicCalendar();
    initHeroCarousel();
    setupNetworkMonitoring();
    handleBackToTopButton();
});

// ============================================
// EmailJS INITIALIZATION & FORM HANDLING
// ============================================

function initializeEmailJS() {
    logger.info('Initializing EmailJS...');
    console.log('🔧 Initializing EmailJS...');
    
    if (typeof emailjs === 'undefined') {
        logger.error('EmailJS not loaded', 'Check CDN link');
        console.error('❌ EmailJS not loaded - check CDN');
        showFormMessage('Email service not available. Please call us directly.', 'error');
        return;
    }
    
    try {
        emailjs.init("pi8Au8y-sgqaRjOEo");
        logger.info('EmailJS initialized successfully');
        console.log('✅ EmailJS initialized successfully');
        setupContactForm();
    } catch (error) {
        logger.error('EmailJS initialization failed', error);
        console.error('❌ EmailJS initialization error:', error);
        showFormMessage('Email service temporarily unavailable. Please call us directly.', 'error');
    }
}

function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) {
        logger.error('Contact form not found in DOM', null);
        console.error('❌ Contact form not found!');
        return;
    }
    
    logger.info('Contact form found and event listener attached');
    console.log('✅ Contact form found');
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        logger.info('Contact form submission initiated');
        handleFormSubmission(this);
    });
}

function handleFormSubmission(form) {
    const submitBtn = document.getElementById('submit-btn');
    const originalText = submitBtn.textContent;
    
    // Get form data
    const formData = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        message: form.message.value.trim()
    };

    // Validate form data
    if (!validateFormData(formData)) {
        logger.warn('Form validation failed', formData);
        return;
    }

    logger.info('Form data validated successfully', { name: formData.name, email: formData.email });
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    showFormMessage('Sending your message...', 'info');
    
    logger.info('Sending email via EmailJS', { to: 'townjamamasjid@gmail.com' });
    
    emailjs.send('service_sunf15q', 'template_iirfx9j', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'Not provided',
        message: formData.message
    })
    .then(function(response) {
        logger.info('Email sent successfully', { status: response.status });
        console.log('✅ SUCCESS! Email sent. Status:', response.status);
        showFormMessage('✅ Message sent successfully! We will contact you within 24 hours.', 'success');
        form.reset();
    })
    .catch(function(error) {
        logger.error('Email sending failed', error);
        console.error('❌ Email sending failed:', error);
        showFormMessage('❌ Failed to send message. Please call us directly at +91 8920556818', 'error');
    })
    .finally(function() {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}

// ============================================
// FORM VALIDATION
// ============================================

/**
 * Validate contact form data
 * @param {Object} data - Form data object
 * @returns {boolean} - True if valid
 */
function validateFormData(data) {
    // Validate name
    if (!data.name || data.name.length < 2) {
        logger.warn('Invalid name', { name: data.name });
        alert('Please enter a valid name (at least 2 characters)');
        return false;
    }

    // Validate email
    if (!isValidEmail(data.email)) {
        logger.warn('Invalid email', { email: data.email });
        alert('Please enter a valid email address');
        return false;
    }

    // Validate message
    if (!data.message || data.message.length < 10) {
        logger.warn('Invalid message', { messageLength: data.message.length });
        alert('Please enter a message (at least 10 characters)');
        return false;
    }

    // Validate message length
    if (data.message.length > 5000) {
        logger.warn('Message too long', { messageLength: data.message.length });
        alert('Message is too long (max 5000 characters)');
        return false;
    }

    return true;
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean}
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormMessage(message, type) {
    const messageDiv = document.getElementById('form-messages');
    
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.className = type;
        messageDiv.style.display = 'block';
        
        if (type === 'success') {
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        }
    }
}

// ============================================
// NETWORK MONITORING
// ============================================

function setupNetworkMonitoring() {
    logger.info('Setting up network monitoring');
    console.log('🌐 Setting up network monitoring');

    // Handle online event
    window.addEventListener('online', () => {
        logger.info('Network status changed to ONLINE');
        console.log('✅ Network: ONLINE');
        showFormMessage('You are back online ✓', 'success');
    });

    // Handle offline event
    window.addEventListener('offline', () => {
        logger.warn('Network status changed to OFFLINE');
        console.warn('⚠️ Network: OFFLINE');
        showFormMessage('You are offline. Please check your connection.', 'error');
    });

    // Log initial status
    const status = navigator.onLine ? 'ONLINE' : 'OFFLINE';
    logger.info(`Initial network status: ${status}`);
    console.log(`🌐 Initial network status: ${status}`);
}

// ============================================
// BACK TO TOP BUTTON
// ============================================

function handleBackToTopButton() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) {
        logger.warn('Back to top button not found');
        return;
    }
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        logger.info('Back to top clicked');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// UTILITY: COPY TO CLIPBOARD
// ============================================

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            logger.info('Text copied to clipboard', { text });
            console.log('✅ Copied to clipboard:', text);
            alert('UPI ID copied to clipboard!');
        })
        .catch((error) => {
            logger.error('Failed to copy to clipboard', error);
            console.error('❌ Failed to copy:', error);
            alert('Failed to copy. Please try again.');
        });
}

// ==================== FIXED ISLAMIC CALENDAR MODULE ====================

class IslamicCalendar {
    constructor() {
        this.debugLog = [];
        this.cache = {
            hijriDate: null,
            prayerTimes: null,
            lastUpdated: null
        };
        
        logger.info('Fixed Islamic Calendar Module Initialized');
        console.log('🕌 Fixed Islamic Calendar Module Initialized');
        this.log('System', 'Fixed calendar module starting...', 'info');
    }

    log(module, message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = `[${timestamp}] ${module}: ${message}`;
        
        const emojis = {
            'success': '✅',
            'error': '❌',
            'warning': '⚠️',
            'info': 'ℹ️'
        };
        
        console.log(`${emojis[type] || '📝'} ${logEntry}`);
        
        this.debugLog.push({ timestamp, module, message, type });
        if (this.debugLog.length > 20) {
            this.debugLog.shift();
        }
    }

    async initialize() {
        this.log('Initialization', 'Starting accurate calendar services...', 'info');
        
        try {
            this.loadFromCache();
            
            await Promise.all([
                this.fetchAccurateHijriDate(),
                this.fetchAccuratePrayerTimes()
            ]);
            
            this.log('Initialization', 'All services started successfully!', 'success');
            this.applyLocalAdjustments();
            this.startLiveUpdates();
            
        } catch (error) {
            this.log('Initialization', `Failed to initialize: ${error.message}`, 'error');
            this.useManualTimings();
        }
    }

    async fetchAccurateHijriDate() {
        this.log('Hijri Date', 'Fetching accurate Islamic date...', 'info');
        
        try {
            const today = new Date();
            const response = await fetch(`https://api.aladhan.com/v1/gToH?date=${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}&adjustment=0`);
            
            if (!response.ok) {
                throw new Error(`API returned ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.code === 200) {
                const hijri = data.data.hijri;
                const hijriDateString = `${hijri.day} ${hijri.month.en} ${hijri.year}`;
                
                this.updateHijriDate(hijriDateString, today);
                this.cache.hijriDate = hijriDateString;
                this.cache.lastUpdated = new Date();
                
                logger.info('Hijri date fetched successfully', { date: hijriDateString });
                this.log('Hijri Date', `Success: ${hijriDateString}`, 'success');
            } else {
                throw new Error('Invalid API response');
            }
            
        } catch (error) {
            logger.error('Failed to fetch Hijri date', error);
            this.log('Hijri Date', `API failed: ${error.message}`, 'error');
            this.useManualHijriDate();
        }
    }

    async fetchAccuratePrayerTimes() {
        this.log('Prayer Times', 'Fetching accurate prayer times for Jaigaon...', 'info');
        
        try {
            const response = await fetch('https://api.aladhan.com/v1/timingsByCity?city=Jaigaon&country=India&method=1&school=0');
            
            if (!response.ok) {
                throw new Error(`API returned ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.code === 200) {
                const timings = data.data.timings;
                const date = data.data.date;
                
                this.updatePrayerTimes(timings);
                this.cache.prayerTimes = timings;
                this.cache.lastUpdated = new Date();
                
                logger.info('Prayer times fetched successfully', { date: date.readable });
                this.log('Prayer Times', `Accurate timings fetched for ${date.readable}`, 'success');
                this.startIftarCountdown(timings.Maghrib);
                
            } else {
                throw new Error('Invalid prayer times response');
            }
            
        } catch (error) {
            logger.error('Failed to fetch prayer times', error);
            this.log('Prayer Times', `API failed: ${error.message}`, 'error');
            this.useManualPrayerTimes();
        }
    }

    startIftarCountdown(iftarTime) {
        this.log('Countdown', `Starting countdown for iftar at ${iftarTime}`, 'info');
        
        const updateCountdown = () => {
            try {
                const now = new Date();
                const iftarDate = this.parseIftarTime(iftarTime, now);
                const timeDiff = iftarDate - now;
                
                if (timeDiff <= 0) {
                    document.getElementById('time-remaining').textContent = '🕋 Time for Iftar!';
                    document.getElementById('time-remaining').style.background = '#4CAF50';
                    this.log('Countdown', 'Iftar time reached!', 'success');
                    return;
                }
                
                const hours = Math.floor(timeDiff / (1000 * 60 * 60));
                const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
                
                document.getElementById('time-remaining').textContent = 
                    `Iftar in: ${hours}h ${minutes}m ${seconds}s`;
                    
            } catch (error) {
                this.log('Countdown', `Countdown error: ${error.message}`, 'error');
                document.getElementById('time-remaining').textContent = 'Iftar time: ' + iftarTime;
            }
        };
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    parseIftarTime(iftarTime, referenceDate) {
        let timeParts = iftarTime.split(':');
        let hours = parseInt(timeParts[0]);
        let minutes = parseInt(timeParts[1]);
        
        if (iftarTime.includes('PM') && hours < 12) hours += 12;
        if (iftarTime.includes('AM') && hours === 12) hours = 0;
        
        const iftarDate = new Date(referenceDate);
        iftarDate.setHours(hours, minutes, 0, 0);
        
        if (iftarDate < referenceDate) {
            iftarDate.setDate(iftarDate.getDate() + 1);
        }
        
        return iftarDate;
    }

    applyLocalAdjustments() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        
        let localIftarTime = this.calculateLocalIftarTime(month, day);
        
        if (localIftarTime) {
            this.log('Adjustment', `Applying local iftar time: ${localIftarTime}`, 'warning');
            this.updateIftarTime(localIftarTime, true);
            this.startIftarCountdown(localIftarTime);
        }
    }

    calculateLocalIftarTime(month, day) {
        if (month === 1) return '17:15';
        else if (month === 2) return '17:30';
        else if (month === 3) return day <= 15 ? '17:45' : '18:00';
        else if (month === 4) return '18:15';
        else if (month === 5) return '18:30';
        else if (month === 6) return '18:45';
        else if (month === 7) return '18:40';
        else if (month === 8) return '18:20';
        else if (month === 9) return day <= 15 ? '18:00' : '17:45';
        else if (month === 10) return '17:30';
        else if (month === 11) return '17:15';
        else if (month === 12) return '17:10';
        
        return null;
    }

    useManualHijriDate() {
        this.log('Manual', 'Using manual Hijri date calculation', 'warning');
        const today = new Date();
        const manualHijriDate = this.calculateManualHijriDate(today);
        this.updateHijriDate(manualHijriDate, today, true);
    }

    useManualPrayerTimes() {
        this.log('Manual', 'Using manual prayer times', 'warning');
        const today = new Date();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        
        const manualTimes = {
            Fajr: '4:55 AM',
            Dhuhr: '12:45 PM',
            Asr: '4:00 PM',
            Maghrib: this.calculateLocalIftarTime(month, day) || '5:56 PM',
            Isha: '7:45 PM'
        };
        
        this.updatePrayerTimes(manualTimes);
        this.startIftarCountdown(manualTimes.Maghrib);
    }

    useManualTimings() {
        this.log('Manual', 'Using completely manual timings', 'warning');
        this.useManualHijriDate();
        this.useManualPrayerTimes();
    }

    updateHijriDate(hijriDate, gregorianDate, isFallback = false) {
        const hijriElement = document.getElementById('hijri-date');
        const gregorianElement = document.getElementById('gregorian-date');
        
        if (hijriElement) hijriElement.textContent = hijriDate;
        if (gregorianElement) gregorianElement.textContent = gregorianDate.toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
            
        if (isFallback && hijriElement) {
            hijriElement.style.opacity = '0.8';
            hijriElement.title = 'Approximate date - may vary';
        }
    }

    updateIftarTime(iftarTime, isFallback = false) {
        const iftarElement = document.getElementById('iftar-time');
        if (!iftarElement) return;
        
        const timeParts = iftarTime.split(':');
        let hours = parseInt(timeParts[0]);
        const minutes = timeParts[1];
        
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const displayTime = `${hours}:${minutes} ${ampm}`;
        
        iftarElement.textContent = displayTime;
        
        if (isFallback) {
            iftarElement.style.opacity = '0.8';
            iftarElement.title = 'Seasonal estimate - check masjid notice';
        }
    }

    updatePrayerTimes(timings) {
        const prayerCards = document.querySelectorAll('.prayer-card');
        
        prayerCards.forEach(card => {
            const prayerName = card.querySelector('h3').textContent.toLowerCase();
            let prayerTime;
            
            switch(prayerName) {
                case 'fajr': prayerTime = timings.Fajr; break;
                case 'dhuhr': prayerTime = timings.Dhuhr; break;
                case 'asr': prayerTime = timings.Asr; break;
                case 'maghrib': prayerTime = timings.Maghrib; break;
                case 'isha': prayerTime = timings.Isha; break;
                default: return;
            }
            
            const timeParts = prayerTime.split(':');
            let hours = parseInt(timeParts[0]);
            const minutes = timeParts[1];
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            const displayTime = `${hours}:${minutes} ${ampm}`;
            
            const jamaatTime = this.calculateJamaatTime(prayerTime);
            
            card.querySelector('p:nth-child(2)').innerHTML = `<strong>Azaan:</strong> ${displayTime}`;
            card.querySelector('p:nth-child(3)').innerHTML = `<strong>Jama'at:</strong> ${jamaatTime}`;
        });
    }

    calculateJamaatTime(azaanTime) {
        const timeParts = azaanTime.split(':');
        let hours = parseInt(timeParts[0]);
        let minutes = parseInt(timeParts[1]);
        
        minutes += 20 + Math.floor(Math.random() * 10);
        
        if (minutes >= 60) {
            hours += 1;
            minutes -= 60;
        }
        
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        
        return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    }

    calculateManualHijriDate(gregorianDate) {
        const islamicMonths = [
            'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani',
            'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Shaban',
            'Ramadan', 'Shawwal', 'Dhu al-Qidah', 'Dhu al-Hijjah'
        ];
        
        const baseHijri = new Date(2024, 10, 20);
        const baseHijriDay = 15;
        const baseHijriMonth = 'Rabi al-Thani';
        const baseHijriYear = 1446;
        
        const diffDays = Math.floor((gregorianDate - baseHijri) / (1000 * 60 * 60 * 24));
        const estimatedHijriDays = baseHijriDay + diffDays;
        
        let remainingDays = estimatedHijriDays;
        let monthIndex = islamicMonths.indexOf(baseHijriMonth);
        let year = baseHijriYear;
        
        while (remainingDays > 29.5) {
            remainingDays -= 29.5;
            monthIndex++;
            if (monthIndex >= 12) {
                monthIndex = 0;
                year++;
            }
        }
        
        const day = Math.round(remainingDays);
        const month = islamicMonths[monthIndex];
        
        return `${day} ${month} ${year}`;
    }

    loadFromCache() {
        this.log('Cache', 'Loading cached data...', 'info');
        
        if (this.cache.hijriDate) {
            this.updateHijriDate(this.cache.hijriDate, new Date());
            this.log('Cache', 'Hijri date loaded from cache', 'success');
        }
        
        if (this.cache.prayerTimes) {
            this.updatePrayerTimes(this.cache.prayerTimes);
            this.startIftarCountdown(this.cache.prayerTimes.Maghrib);
            this.log('Cache', 'Prayer times loaded from cache', 'success');
        }
    }

    startLiveUpdates() {
        setInterval(() => {
            this.log('Update', 'Refreshing prayer times...', 'info');
            this.fetchAccurateHijriDate();
            this.fetchAccuratePrayerTimes();
        }, 6 * 60 * 60 * 1000);
        
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0);
        const timeToMidnight = midnight - now;
        
        setTimeout(() => {
            this.fetchAccurateHijriDate();
            this.fetchAccuratePrayerTimes();
            this.startLiveUpdates();
        }, timeToMidnight);
    }

    debug() {
        console.group('🔍 Islamic Calendar Debug Info');
        console.log('📊 Cache:', this.cache);
        console.log('📝 Log History:', this.debugLog);
        console.log('🕒 Last Updated:', this.cache.lastUpdated);
        console.groupEnd();
    }
}

function initializeIslamicCalendar() {
    logger.info('Initializing Fixed Islamic Calendar System');
    console.log('🕌 Initializing Fixed Islamic Calendar System...');
    
    try {
        const islamicCalendar = new IslamicCalendar();
        islamicCalendar.initialize();
        
        window.islamicCalendar = islamicCalendar;
        
        logger.info('Islamic Calendar system ready');
        console.log('🎯 Fixed Islamic Calendar system ready!');
        
    } catch (error) {
        logger.error('Failed to initialize Islamic Calendar', error);
        console.error('❌ Failed to initialize Islamic Calendar:', error);
    }
}

// ==================== HERO CAROUSEL ====================

class HeroCarousel {
    constructor() {
        this.slides = document.querySelectorAll('.carousel-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.querySelector('.carousel-prev');
        this.nextBtn = document.querySelector('.carousel-next');
        this.currentSlide = 0;
        this.autoPlayInterval = null;
        
        this.init();
    }
    
    init() {
        if (!this.prevBtn || !this.nextBtn || this.slides.length === 0) {
            logger.warn('Carousel elements not found');
            console.warn('⚠️ Carousel elements not found');
            return;
        }

        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        this.startAutoPlay();
        
        const carousel = document.querySelector('.carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
            carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        }
        
        logger.info('Hero carousel initialized');
        console.log('🎠 Hero carousel initialized');
    }
    
    showSlide(index) {
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.indicators.forEach(indicator => indicator.classList.remove('active'));
        
        this.slides[index].classList.add('active');
        this.indicators[index].classList.add('active');
        
        this.currentSlide = index;
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prevIndex);
    }
    
    goToSlide(index) {
        this.showSlide(index);
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

function initHeroCarousel() {
    new HeroCarousel();
}

// ============================================
// GLOBAL ERROR HANDLERS
// ============================================

window.addEventListener('error', (event) => {
    logger.error('Uncaught error', {
        message: event.message,
        source: event.filename,
        line: event.lineno,
        column: event.colno
    });
});

window.addEventListener('unhandledrejection', (event) => {
    logger.error('Unhandled promise rejection', event.reason);
});

// ============================================
// DEBUG TOOLS
// ============================================

window.masjidDebug = {
    testEmailJS: function() {
        console.group('📧 EmailJS Connection Test');
        console.log('EmailJS loaded:', typeof emailjs !== 'undefined');
        console.log('Public Key: pi8Au8y-sgqaRjOEo');
        console.log('Service ID: service_sunf15q');
        console.log('Template ID: template_iirfx9j');
        console.groupEnd();
    },
    
    testIslamicCalendar: function() {
        if (window.islamicCalendar) {
            window.islamicCalendar.debug();
        } else {
            console.error('❌ Islamic Calendar not initialized');
        }
    },
    
    refreshAll: function() {
        console.log('🔄 Forcing refresh of all data...');
        if (window.islamicCalendar) {
            window.islamicCalendar.fetchAccurateHijriDate();
            window.islamicCalendar.fetchAccuratePrayerTimes();
        }
    },

    showLogs: function() {
        logger.info('=== Debug Logs ===');
        console.log('Check browser console for all logs with timestamps');
    }
};

console.log('💡 Tip: Use masjidDebug.testEmailJS(), masjidDebug.testIslamicCalendar(), or masjidDebug.refreshAll() for debugging');

logger.info('Main script loaded successfully');
