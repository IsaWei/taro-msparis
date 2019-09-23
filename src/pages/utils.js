import {clearCurrentUser} from '../utils/user'
import {clearAuthority} from '../utils/authority'
import Cookies from "js-cookie";

export function clearStorageAndCookies() {
  clearCurrentUser()
  clearAuthority()
  Cookies.remove('authorization')
}
