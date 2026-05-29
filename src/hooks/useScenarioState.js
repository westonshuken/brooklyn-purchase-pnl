import { useCallback, useEffect, useRef, useState } from "react";
import { defaults, SCENARIO_KEYS, STRING_KEYS, STORAGE_KEY } from "../lib/constants.js";

function parseScenarioFromSearchParams(searchParams) {
  const parsed = { ...defaults };
  let hasAny = false;

  for (const key of SCENARIO_KEYS) {
    const raw = searchParams.get(key);
    if (raw === null) continue;
    const num = Number(raw);
    if (!Number.isFinite(num)) continue;
    parsed[key] = num;
    hasAny = true;
  }

  for (const key of STRING_KEYS) {
    const raw = searchParams.get(key);
    if (raw === null) continue;
    parsed[key] = raw;
    hasAny = true;
  }

  return hasAny ? parsed : null;
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const stored = JSON.parse(raw);
    const parsed = { ...defaults };
    let hasAny = false;

    for (const key of SCENARIO_KEYS) {
      if (typeof stored[key] === "number" && Number.isFinite(stored[key])) {
        parsed[key] = stored[key];
        hasAny = true;
      }
    }

    for (const key of STRING_KEYS) {
      if (typeof stored[key] === "string") {
        parsed[key] = stored[key];
        if (stored[key]) hasAny = true;
      }
    }

    return hasAny ? parsed : null;
  } catch {
    return null;
  }
}

function getInitialState() {
  const fromUrl = parseScenarioFromSearchParams(new URLSearchParams(window.location.search));
  if (fromUrl) return fromUrl;
  const fromStorage = loadFromStorage();
  if (fromStorage) return fromStorage;
  return { ...defaults };
}

function syncToUrlAndStorage(vals) {
  const params = new URLSearchParams();
  for (const key of SCENARIO_KEYS) {
    params.set(key, String(vals[key]));
  }
  for (const key of STRING_KEYS) {
    if (vals[key]) params.set(key, vals[key]);
  }
  const search = params.toString();
  const newUrl = `${window.location.pathname}${search ? `?${search}` : ""}`;
  window.history.replaceState(null, "", newUrl);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vals));
  } catch {
    // ignore quota errors
  }
}

export function useScenarioState() {
  const [vals, setValsState] = useState(getInitialState);
  const [copied, setCopied] = useState(false);
  const initialSyncDone = useRef(false);

  useEffect(() => {
    if (initialSyncDone.current) return;
    initialSyncDone.current = true;
    syncToUrlAndStorage(vals);
  }, [vals]);

  const setVals = useCallback((updater) => {
    setValsState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      syncToUrlAndStorage(next);
      return next;
    });
  }, []);

  const updateField = useCallback(
    (key, value) => {
      setVals((prev) => ({ ...prev, [key]: value }));
    },
    [setVals]
  );

  const reset = useCallback(() => {
    setVals({ ...defaults });
  }, [setVals]);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = window.location.href;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  const exportPdf = useCallback(() => {
    window.print();
  }, []);

  return { vals, setVals, updateField, reset, copyLink, copied, exportPdf };
}
