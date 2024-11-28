import Cookies from "js-cookie";
export function setAuthToken(token: string) {
  Cookies.set("token", token, { expires: 7 });
}
export function getAuthToken() {
  return Cookies.get("token");
}
