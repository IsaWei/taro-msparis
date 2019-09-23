// use localStorage to store the authority info, which might be sent from server in actual project.
import Cookies from 'js-cookie';

const CURRENT_AUTHORITY = 'taro-authority';

export function getAuthority(str) {
  const authorityString =
    typeof str === 'undefined' ? localStorage.getItem(CURRENT_AUTHORITY) : str;
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority;
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem(CURRENT_AUTHORITY, JSON.stringify(proAuthority));
}

export function clearAuthority() {
  localStorage.removeItem(CURRENT_AUTHORITY);
}
