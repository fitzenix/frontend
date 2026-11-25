/** Structured API failure — preserves backend `error.code` for UI branching. */
export class ApiClientError extends Error {
  readonly code: string;
  readonly status: number;
  readonly details?: unknown;

  constructor(message: string, opts: { code?: string; status?: number; details?: unknown } = {}) {
    super(message);
    this.name = "ApiClientError";
    this.code = opts.code ?? "INTERNAL_ERROR";
    this.status = opts.status ?? 500;
    this.details = opts.details;
  }

  get isGymLocked(): boolean {
    return this.code === "GYM_ACCESS_LOCKED";
  }

  get isMembershipExpired(): boolean {
    return this.code === "MEMBERSHIP_EXPIRED";
  }
}

export function isApiClientError(err: unknown): err is ApiClientError {
  return err instanceof ApiClientError;
}
