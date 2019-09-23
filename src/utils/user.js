const CURRENT_USER_KEY = 'HUATUO-CURRENT-USER'
export function saveCurrentUser(userString) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userString));
}

export function currentUser() {
  return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
}

export function currentUserId() {
  return JSON.parse(localStorage.getItem(CURRENT_USER_KEY)).userId;
}

export function clearCurrentUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}
