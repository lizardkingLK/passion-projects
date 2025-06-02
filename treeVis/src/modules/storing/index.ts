export function setLocalStorageItem(key: string, value: string) {
  window.localStorage.setItem(key, value);
}

export function getLocalStorageItem(key: string) {
  return window.localStorage.getItem(key);
}

export function clearLocalStorageItem(key: string) {
  return window.localStorage.removeItem(key);
}
