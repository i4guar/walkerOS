import { StorageType, storageRead, storageWrite, tryCatch } from '../../';
import { sessionWindow } from './';
import type { SessionData, SessionWindowConfig } from './';

export interface SessionStorageConfig extends SessionWindowConfig {
  sessionKey?: string;
  sessionStorage?: StorageType;
  sessionAge?: number;
  length?: number; // Minutes after last update to consider session as expired (default: 30)
}

export function sessionStorage(config: SessionStorageConfig = {}): SessionData {
  const now = Date.now();
  const length = config.length || 30; // Session length in minutes
  const sessionKey = config.sessionKey || 'elbSessionId';
  const sessionStorage = config.sessionStorage || 'local';
  const sessionAge = config.sessionAge || 30; // Session age in minutes
  let isNew = !!config.isNew;

  // Check for an existing session
  const existingSession: SessionData | undefined = tryCatch(
    (key: string, storage?: StorageType) => {
      const existingSession = JSON.parse(String(storageRead(key, storage)));

      // By default it's not a new session anymore
      existingSession.isFirst = false;

      // Check if session is still active
      if (isNew || existingSession.updated + length * 60 * 1000 < now) {
        // Session has expired
        delete existingSession.id; // Unset session ID
        delete existingSession.referrer; // Unset referrer
        existingSession.start = now; // Set new session start
        existingSession.count++; // Increase session count
        existingSession.runs = 1; // Reset runs
        isNew = true; // Mark expired session a as new one
      } else {
        // Session is still active
        existingSession.runs++;
        isNew = false;
      }

      existingSession.isNew = isNew; // Update session status
      existingSession.updated = now; // Update session timestamp

      return existingSession;
    },
    () => {
      // Something went wrong, start a new session
      config.isNew = true;
    },
  )(sessionKey, sessionStorage);

  // Default session data
  let session: SessionData = {
    isNew,
    storage: true,
    id: '', // Will be generated by sessionStart
    start: now,
    updated: now,
    isFirst: true,
    count: 1,
    runs: 1,
  };

  config.isNew = config.isNew || isNew;

  // Eventually update session with id, referrer and marketing parameters
  session = Object.assign(
    session, // Default session values
    sessionWindow(config), // Basic session data
    existingSession, // (Updated) existing session
    { isNew: config.isNew, storage: true }, // Status of the session
    config.data, // Given data has the highest priority
  );

  // Write (updated) session to storage
  storageWrite(sessionKey, JSON.stringify(session), sessionAge, sessionStorage);

  return session;
}
