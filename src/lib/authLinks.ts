/** Guest CTAs that start a free trial should open signup immediately. */
export function signupUrl(nextPath = "/#pricing"): string {
  const next = nextPath.startsWith("/") ? nextPath : `/${nextPath}`;
  return `/login?mode=signup&next=${encodeURIComponent(next)}`;
}

export function loginUrl(nextPath = "/#pricing"): string {
  const next = nextPath.startsWith("/") ? nextPath : `/${nextPath}`;
  return `/login?mode=login&next=${encodeURIComponent(next)}`;
}
