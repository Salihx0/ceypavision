// ===================================
// CEYPA VISION - Cookie Consent System
// GDPR & KVKK Compliant
// ===================================

class CookieConsent {
    constructor() {
        this.cookieName = 'ceypa_cookie_consent';
        this.consentData = this.getConsent();
        this.init();
    }

    init() {
        // Check if user has already given consent
        if (!this.consentData) {
            this.showBanner();
        }
    }

    getConsent() {
        const consent = localStorage.getItem(this.cookieName);
        return consent ? JSON.parse(consent) : null;
    }

    setConsent(data) {
        localStorage.setItem(this.cookieName, JSON.stringify({
            ...data,
            timestamp: new Date().toISOString()
        }));
        this.consentData = data;
    }

    showBanner() {
        // Create banner HTML
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.className = 'cookie-consent-banner';
        banner.innerHTML = `
            <div class="cookie-consent-content">
                <div class="cookie-consent-header">
                    <i class="fas fa-cookie-bite cookie-icon"></i>
                    <h3 data-i18n="cookie_title">Çerez Kullanımı</h3>
                </div>
                <p data-i18n="cookie_message">Web sitemizde deneyiminizi geliştirmek için çerezler kullanıyoruz. Siteyi kullanmaya devam ederek çerez politikamızı kabul etmiş olursunuz.</p>
                <div class="cookie-consent-buttons">
                    <button class="cookie-btn cookie-btn-accept" id="cookieAccept">
                        <i class="fas fa-check"></i>
                        <span data-i18n="cookie_accept">Kabul Et</span>
                    </button>
                    <button class="cookie-btn cookie-btn-settings" id="cookieSettings">
                        <i class="fas fa-cog"></i>
                        <span data-i18n="cookie_settings">Ayarlar</span>
                    </button>
                    <button class="cookie-btn cookie-btn-decline" id="cookieDecline">
                        <i class="fas fa-times"></i>
                        <span data-i18n="cookie_decline">Reddet</span>
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);

        // Add event listeners
        document.getElementById('cookieAccept').addEventListener('click', () => this.acceptAll());
        document.getElementById('cookieDecline').addEventListener('click', () => this.declineAll());
        document.getElementById('cookieSettings').addEventListener('click', () => this.showSettings());

        // Animate in
        setTimeout(() => {
            banner.classList.add('show');
        }, 500);

        // Update translations if i18n is available
        if (typeof updateLanguage === 'function') {
            const currentLang = localStorage.getItem('language') || 'tr';
            updateLanguage(currentLang);
        }
    }

    showSettings() {
        // Create settings modal
        const modal = document.createElement('div');
        modal.id = 'cookie-settings-modal';
        modal.className = 'cookie-settings-modal';
        modal.innerHTML = `
            <div class="cookie-settings-overlay"></div>
            <div class="cookie-settings-content">
                <div class="cookie-settings-header">
                    <h3 data-i18n="cookie_settings">Çerez Ayarları</h3>
                    <button class="cookie-settings-close" id="cookieSettingsClose">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="cookie-settings-body">
                    <div class="cookie-option">
                        <div class="cookie-option-header">
                            <label class="cookie-switch">
                                <input type="checkbox" id="cookieNecessary" checked disabled>
                                <span class="cookie-slider"></span>
                            </label>
                            <div class="cookie-option-info">
                                <h4 data-i18n="cookie_necessary">Zorunlu Çerezler</h4>
                                <p data-i18n="cookie_necessary_desc">Bu çerezler web sitesinin düzgün çalışması için gereklidir.</p>
                            </div>
                        </div>
                    </div>
                    <div class="cookie-option">
                        <div class="cookie-option-header">
                            <label class="cookie-switch">
                                <input type="checkbox" id="cookieAnalytics">
                                <span class="cookie-slider"></span>
                            </label>
                            <div class="cookie-option-info">
                                <h4 data-i18n="cookie_analytics">Analitik Çerezler</h4>
                                <p data-i18n="cookie_analytics_desc">Ziyaretçilerin web sitesini nasıl kullandığını anlamamıza yardımcı olur.</p>
                            </div>
                        </div>
                    </div>
                    <div class="cookie-option">
                        <div class="cookie-option-header">
                            <label class="cookie-switch">
                                <input type="checkbox" id="cookieMarketing">
                                <span class="cookie-slider"></span>
                            </label>
                            <div class="cookie-option-info">
                                <h4 data-i18n="cookie_marketing">Pazarlama Çerezleri</h4>
                                <p data-i18n="cookie_marketing_desc">Kişiselleştirilmiş reklamlar göstermek için kullanılır.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cookie-settings-footer">
                    <button class="cookie-btn cookie-btn-save" id="cookieSaveSettings">
                        <i class="fas fa-save"></i>
                        <span data-i18n="cookie_save">Tercihleri Kaydet</span>
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Animate in
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);

        // Add event listeners
        document.getElementById('cookieSettingsClose').addEventListener('click', () => this.closeSettings());
        document.querySelector('.cookie-settings-overlay').addEventListener('click', () => this.closeSettings());
        document.getElementById('cookieSaveSettings').addEventListener('click', () => this.saveSettings());

        // Update translations if i18n is available
        if (typeof updateLanguage === 'function') {
            const currentLang = localStorage.getItem('language') || 'tr';
            updateLanguage(currentLang);
        }
    }

    closeSettings() {
        const modal = document.getElementById('cookie-settings-modal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }

    saveSettings() {
        const analytics = document.getElementById('cookieAnalytics').checked;
        const marketing = document.getElementById('cookieMarketing').checked;

        this.setConsent({
            necessary: true,
            analytics: analytics,
            marketing: marketing
        });

        this.closeSettings();
        this.hideBanner();
    }

    acceptAll() {
        this.setConsent({
            necessary: true,
            analytics: true,
            marketing: true
        });
        this.hideBanner();
    }

    declineAll() {
        this.setConsent({
            necessary: true,
            analytics: false,
            marketing: false
        });
        this.hideBanner();
    }

    hideBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(() => {
                banner.remove();
            }, 500);
        }
    }

    // Check if specific cookie type is allowed
    isAllowed(type) {
        if (!this.consentData) return false;
        return this.consentData[type] === true;
    }
}

// Initialize cookie consent when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.cookieConsent = new CookieConsent();
});
