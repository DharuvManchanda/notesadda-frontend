export function getSafeRedirectPath(redirect: string | null | undefined): string {
  if (!redirect || !redirect.startsWith('/')) {
    return '/';
  }

  if (redirect.startsWith('//')) {
    return '/';
  }

  return redirect;
}
