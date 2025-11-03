// Add this as a backup authentication check in AuthContext

// After successful login, also store a flag in localStorage
localStorage.setItem('auth_check', 'true');

// On mount, check localStorage first before API call
const hasAuthFlag = localStorage.getItem('auth_check');
if (hasAuthFlag) {
  // User might be authenticated, verify with API
  checkInitialAuth();
}

// On logout, clear localStorage
localStorage.removeItem('auth_check');
