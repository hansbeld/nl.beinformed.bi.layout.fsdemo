// @flow
import { BASE, HTTP_METHODS } from "beinformed/constants/Constants";

import universalFetch from "beinformed/utils/fetch/universalFetch";
import Cache from "beinformed/utils/browser/Cache";

const LOGIN_PATH = `${BASE}/j_security_check`;
const LOGOUT_PATH = `${BASE}/Logoff`;

const usernameField = "j_username";
const passwordField = "j_password";

class Authenticate {
  _isBasic: boolean;

  constructor() {
    this._isBasic = false;
  }

  get isBasicAuthentication(): boolean {
    return this._isBasic;
  }

  initLogin(initLogin: boolean): Promise<any> {
    if (Authenticate.isBasicAuthentication || !initLogin) {
      return Promise.resolve(true);
    }

    return universalFetch({
      url: `${BASE}/login`,
      method: HTTP_METHODS.GET,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).catch(() => Promise.resolve());
  }

  createLoginArguments(username: string, password: string) {
    if (this.isBasicAuthentication) {
      // TODO SBO: fix basic
      // if (this.redirectHref) {
      //   return {
      //     url: this.redirectHref.absolutehref
      //   };
      // }

      throw new Error("redirect Href is missing for basic authentication");
    }

    const encodedUsername = encodeURIComponent(username);
    const encodedPassword = encodeURIComponent(password);

    return {
      url: LOGIN_PATH,
      method: HTTP_METHODS.POST,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: `${usernameField}=${encodedUsername}&${passwordField}=${encodedPassword}`
    };
  }

  login(username: string, password: string): Promise<any> {
    if (this.isBasicAuthentication) {
      Cache.addItem("basic", btoa(`${username}:${password}`));
    }

    return this.initLogin(true).then(() =>
      universalFetch(this.createLoginArguments(username, password))
    );
  }

  logout() {
    return universalFetch({
      url: LOGOUT_PATH
    }).then(() => {
      Cache.removeItem("basic");
    });
  }
}

export default Authenticate;
