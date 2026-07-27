/**
 * FE-13.4 — Crash Simulation & Verification
 *
 * A dev-only "chaos monkey" that lets you deliberately force API calls to
 * fail in specific ways — a dropped connection, a 401, a 403, a 500 — so
 * you can watch the existing fallback handling (toast broadcasts, login
 * redirect, error states) prove it survives without corrupting the app.
 *
 * This never runs in production: every entry point is gated behind
 * import.meta.env.DEV.
 */

export type ChaosMode = "off" | "network" | "401" | "403" | "500" | "random";

const STORAGE_KEY = "chaos-monkey-config";

interface ChaosConfig {
  mode: ChaosMode;
  /** 0-1 chance a given request is disrupted when a mode is active */
  rate: number;
}

const defaultConfig: ChaosConfig = {
  mode: "off",
  rate: 1,
};

const isDev = () => Boolean(import.meta.env?.DEV);

const listeners = new Set<(config: ChaosConfig) => void>();

const readConfig = (): ChaosConfig => {
  if (!isDev()) return defaultConfig;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultConfig, ...JSON.parse(raw) } : defaultConfig;
  } catch {
    return defaultConfig;
  }
};

let currentConfig = readConfig();

const persist = (config: ChaosConfig) => {
  currentConfig = config;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
    // ignore storage failures (private mode, quota, etc.)
  }

  listeners.forEach((listener) => listener(config));
};

export const getChaosConfig = (): ChaosConfig => currentConfig;

export const setChaosMode = (mode: ChaosMode) => {
  if (!isDev()) return;
  persist({ ...currentConfig, mode });
};

export const setChaosRate = (rate: number) => {
  if (!isDev()) return;
  persist({ ...currentConfig, rate: Math.min(1, Math.max(0, rate)) });
};

export const subscribeToChaos = (listener: (config: ChaosConfig) => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

/** Simple event log so the panel can show what was actually injected. */
export interface ChaosEvent {
  id: string;
  time: string;
  url: string;
  injected: Exclude<ChaosMode, "off" | "random">;
}

const eventLog: ChaosEvent[] = [];
const MAX_LOG = 20;

export const getChaosLog = (): ChaosEvent[] => eventLog;

const logEvent = (url: string, injected: ChaosEvent["injected"]) => {
  eventLog.unshift({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    time: new Date().toLocaleTimeString(),
    url,
    injected,
  });
  eventLog.length = Math.min(eventLog.length, MAX_LOG);
};

/**
 * A fake AxiosError-shaped object. We only fabricate the fields the
 * existing response interceptor actually reads (response.status,
 * response.data, request/message for the network-error branch), so it
 * flows through the real error-handling path untouched.
 */
const buildFakeError = (url: string, mode: Exclude<ChaosMode, "off" | "random">) => {
  if (mode === "network") {
    return {
      message: `Network Error (simulated for ${url})`,
      request: {},
      response: undefined,
      isChaosSimulated: true,
    };
  }

  const statusMessages: Record<"401" | "403" | "500", string> = {
    "401": "Simulated: session dropped by chaos monkey.",
    "403": "Simulated: access revoked by chaos monkey.",
    "500": "Simulated: server crashed (chaos monkey).",
  };

  return {
    message: `Request failed with status code ${mode}`,
    response: {
      status: Number(mode),
      data: { message: statusMessages[mode] },
    },
    isChaosSimulated: true,
  };
};

/**
 * Call from the axios request interceptor. Returns a fake error to throw
 * if chaos should strike this request, otherwise null (let it through).
 */
export const maybeInjectFailure = (url: string) => {
  if (!isDev()) return null;

  const { mode, rate } = currentConfig;

  if (mode === "off") return null;
  if (Math.random() > rate) return null;

  const resolvedMode: Exclude<ChaosMode, "off" | "random"> =
    mode === "random"
      ? (["network", "401", "403", "500"][Math.floor(Math.random() * 4)] as
          | "network"
          | "401"
          | "403"
          | "500")
      : mode;

  logEvent(url, resolvedMode);

  return buildFakeError(url, resolvedMode);
};