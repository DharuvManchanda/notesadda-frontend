export function getSafeRedirectPath(redirect: string | null | undefined): string {
  if (!redirect || !redirect.startsWith('/')) {
    return '/';
  }

  if (redirect.startsWith('//')) {
    return '/';
  }

  return redirect;
}

const AUTH_REDIRECT_KEY = 'auth_redirect_path';

export function persistAuthRedirectPath(redirect: string | null | undefined) {
  if (typeof window === 'undefined') {
    return;
  }

  const safeRedirect = getSafeRedirectPath(redirect);
  window.localStorage.setItem(AUTH_REDIRECT_KEY, safeRedirect);
}

export function readPersistedAuthRedirectPath() {
  if (typeof window === 'undefined') {
    return '/';
  }

  return getSafeRedirectPath(window.localStorage.getItem(AUTH_REDIRECT_KEY));
}

export function clearPersistedAuthRedirectPath() {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(AUTH_REDIRECT_KEY);
}
