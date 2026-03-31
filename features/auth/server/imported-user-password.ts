const LEGACY_IMPORTED_USER_PASSWORD = 'benedito';

export function getImportedUserPassword() {
  return process.env.DEFAULT_IMPORTED_USER_PASSWORD || LEGACY_IMPORTED_USER_PASSWORD;
}

export function isUsingLegacyImportedPassword() {
  return !process.env.DEFAULT_IMPORTED_USER_PASSWORD;
}
