/**
 * Configuration file for Town Jama Masjid Website
 * Handles EmailJS setup and logging configuration
 */

// ============================================
// EmailJS Configuration
// ============================================

// TODO: Replace with your actual EmailJS credentials
// Get these from: https://dashboard.emailjs.com/

const EMAIL_CONFIG = {
    // Your EmailJS Service ID
    SERVICE_ID: 'YOUR_SERVICE_ID_HERE',
    
    // Your EmailJS Template ID
    TEMPLATE_ID: 'YOUR_TEMPLATE_ID_HERE',
    
    // Your EmailJS Public Key
    PUBLIC_KEY: 'YOUR_PUBLIC_KEY_HERE',
    
    // Receiver email (where contact form messages will be sent)
    RECEIVER_EMAIL: 'townjamamasjid@gmail.com'
};

// ============================================
// Logging Configuration
// ============================================

const LOG_CONFIG = {
    // Enable/disable console logging
    DEBUG: true,
    
    // Log levels: 'info', 'warn', 'error'
    LEVEL: 'info'
};

// ============================================
// Utility Logger
// ============================================

/**
 * Custom logger for better debugging and error tracking
 */
const logger = {
    /**
     * Log info messages
     * @param {string} message - The message to log
     * @param {any} data - Optional data to log
     */
    info: (message, data = null) => {
        if (LOG_CONFIG.DEBUG) {
            console.log(`%c[INFO] ${message}`, 'color: #2c5f2d; font-weight: bold;', data || '');
        }
    },

    /**
     * Log warning messages
     * @param {string} message - The message to log
     * @param {any} data - Optional data to log
     */
    warn: (message, data = null) => {
        if (LOG_CONFIG.DEBUG) {
            console.warn(`%c[WARN] ${message}`, 'color: #f9a825; font-weight: bold;', data || '');
        }
    },

    /**
     * Log error messages
     * @param {string} message - The message to log
     * @param {Error} error - The error object
     */
    error: (message, error = null) => {
        console.error(`%c[ERROR] ${message}`, 'color: #d32f2f; font-weight: bold;', error || '');
    }
};

// ============================================
// Initial Setup Check
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    logger.info('Configuration loaded');
    
    // Warn if EmailJS credentials are not set
    if (EMAIL_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY_HERE') {
        logger.warn('EmailJS credentials not configured. Contact form will not work.');
        console.warn('⚠️ Please configure your EmailJS credentials in js/config.js');
    }
});
