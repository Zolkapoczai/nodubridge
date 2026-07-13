// NODU Bridge Authentication Check - Strong Protection
(function() {
    const SESSION_KEY = 'nodu_bridge_auth';
    const LOGIN_PAGE = 'index.html';
    const CURRENT_PAGE = window.location.pathname.split('/').pop() || 'index.html';

    // Don't block login page or root
    if (CURRENT_PAGE === LOGIN_PAGE || CURRENT_PAGE === '') {
        return;
    }

    // Immediate check - block page load if not authenticated
    if (!isAuthenticated()) {
        // Block content immediately
        document.documentElement.innerHTML = '';
        // Redirect to login
        window.location.href = LOGIN_PAGE;
        return;
    }

    // Also check on page visibility change (tab focus)
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            if (!isAuthenticated()) {
                window.location.href = LOGIN_PAGE;
            }
        }
    });

    function isAuthenticated() {
        return sessionStorage.getItem(SESSION_KEY) === 'authenticated';
    }

    // Expose logout function globally
    window.bridgeLogout = function() {
        sessionStorage.removeItem(SESSION_KEY);
        window.location.href = LOGIN_PAGE;
    };
})();
