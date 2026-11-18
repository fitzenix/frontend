import type { AuthUser } from "@/types/auth";

export const MEMBER_CHECK_IN_PATH = "/member/check-in";
export const DEFAULT_OWNER_PATH = "/#pricing";

/** Resolve where to send a user after login when no explicit `?next=` was given. */
export function defaultPostLoginPath(user: Pick<AuthUser, "role"> | null | undefined): string {
  if (user?.role === "member") return MEMBER_CHECK_IN_PATH;
  return DEFAULT_OWNER_PATH;
}

/**
 * Prefer an explicit next path, but send members to check-in when the default
 * owner marketing destination was left unchanged.
 */
export function resolvePostLoginPath(
  user: Pick<AuthUser, "role"> | null | undefined,
  nextPath?: string | null,
): string {
  const next = nextPath && nextPath.startsWith("/") ? nextPath : null;
  if (next && next !== DEFAULT_OWNER_PATH) return next;
  return defaultPostLoginPath(user);
}
