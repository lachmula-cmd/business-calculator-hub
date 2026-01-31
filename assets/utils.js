/**
 * Utility functions for Business Calculator Hub
 */

const Utils = {
    /**
     * Format a number as currency
     * @param {number} value - The number to format
     * @param {string} currency - 'USD', 'EUR', 'GBP', etc.
     * @returns {string} Formatted currency string
     */
    formatCurrency: (value, currency = 'USD') => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    },

    /**
     * Format a number with commas and defined decimals
     * @param {number} value 
     * @param {number} decimals 
     * @returns {string}
     */
    formatNumber: (value, decimals = 2) => {
        if (isNaN(value)) return '0';
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(value);
    },

    /**
     * Parse input value to float number, handling empty strings as 0
     * @param {string} value 
     * @returns {number}
     */
    parseInput: (value) => {
        if (!value) return 0;
        // Remove commas if user typed them
        const cleanValue = value.replace(/,/g, '');
        return parseFloat(cleanValue) || 0;
    },

    /**
     * Copy text to clipboard and show a temporary success message
     * @param {string} text 
     * @param {HTMLElement} buttonElement 
     */
    copyToClipboard: (text, buttonElement) => {
        navigator.clipboard.writeText(text).then(() => {
            const originalText = buttonElement.innerText;
            buttonElement.innerText = "Copied!";
            buttonElement.classList.add('btn-success');
            
            setTimeout(() => {
                buttonElement.innerText = originalText;
                buttonElement.classList.remove('btn-success');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            alert("Failed to copy result.");
        });
    },

    /**
     * Setup common event listeners for a calculator page
     */
    setupCommon: () => {
        // Update copyright year
        const yearEl = document.getElementById('current-year');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }

        // Last updated date
        const updatedEl = document.getElementById('last-updated');
        if (updatedEl) {
            const today = new Date();
            updatedEl.textContent = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        }

        // Shared Share Button Logic
        const shareBtn = document.getElementById('share-btn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                Utils.copyToClipboard(window.location.href, shareBtn);
            });
        }
    }
};

// Initialize common headers/footers specifics
document.addEventListener('DOMContentLoaded', () => {
    Utils.setupCommon();
});
