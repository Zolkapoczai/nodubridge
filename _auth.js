// NODU Bridge Authentication Check
(function() {
    const SESSION_KEY = 'nodu_bridge_auth';
    const LOGIN_PAGE = 'index.html';
    const CURRENT_PAGE = window.location.pathname.split('/').pop() || 'index.html';

    // Don't redirect from login page
    if (CURRENT_PAGE === LOGIN_PAGE || CURRENT_PAGE === '') {
        return;
    }

    // Check authentication on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkAuth);
    } else {
        checkAuth();
    }

    function checkAuth() {
        if (!isAuthenticated()) {
            window.location.href = LOGIN_PAGE;
        }
    }

    function isAuthenticated() {
        return sessionStorage.getItem(SESSION_KEY) === 'authenticated';
    }

    // Expose logout function globally
    window.bridgeLogout = function() {
        sessionStorage.removeItem(SESSION_KEY);
        window.location.href = LOGIN_PAGE;
    };
})();
