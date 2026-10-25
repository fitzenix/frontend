"use client";

import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import {
  getAnalytics,
  isSupported,
  logEvent as fbLogEvent,
  setUserId as fbSetUserId,
  type Analytics as FirebaseAnalytics,
} from "firebase/analytics";
import type { AnalyticsEventName } from "@/lib/analytics/events";

type EventParams = Record<string, string | number | boolean | null | undefined>;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

function isConfigured(): boolean {
  return Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.projectId &&
      firebaseConfig.appId &&
      firebaseConfig.measurementId,
  );
}

let app: FirebaseApp | null = null;
let analytics: FirebaseAnalytics | null = null;
let initPromise: Promise<FirebaseAnalytics | null> | null = null;

function getFirebaseApp(): FirebaseApp | null {
  if (!isConfigured()) return null;
  if (app) return app;
  app = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig);
  return app;
}

async function getAnalyticsClient(): Promise<FirebaseAnalytics | null> {
  if (typeof window === "undefined") return null;
  if (!isConfigured()) return null;
  if (analytics) return analytics;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const supported = await isSupported().catch(() => false);
    if (!supported) return null;
    const firebaseApp = getFirebaseApp();
    if (!firebaseApp) return null;
    analytics = getAnalytics(firebaseApp);
    return analytics;
  })();

  return initPromise;
}

function sanitize(params?: EventParams): Record<string, string | number> {
  if (!params) return {};
  const out: Record<string, string | number> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    if (typeof value === "boolean") {
      out[key] = value ? 1 : 0;
      continue;
    }
    out[key] = value;
  }
  return out;
}

export const Analytics = {
  enabled: isConfigured,

  async logEvent(name: AnalyticsEventName | string, params?: EventParams): Promise<void> {
    try {
      const client = await getAnalyticsClient();
      if (!client) {
        if (process.env.NODE_ENV === "development" && !isConfigured()) {
          // eslint-disable-next-line no-console
          console.debug("[analytics:noop]", name, params ?? {});
        }
        return;
      }
      fbLogEvent(client, name, sanitize(params));
    } catch {
      // Never break UX for analytics.
    }
  },

  async setUserId(userId: string | null): Promise<void> {
    try {
      const client = await getAnalyticsClient();
      if (!client) return;
      fbSetUserId(client, userId);
    } catch {
      // ignore
    }
  },
};

export default Analytics;
