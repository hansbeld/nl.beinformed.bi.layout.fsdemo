declare class dataFetcher {
  static fetch(url: string, options?: Object): any;
  status: number;
}

declare type HttpServletRequestJava = {
  getRequestURL(): {
    toString: () => string
  },
  getContextPath(): string,
  getQueryString(): string | null,
  getPathInfo(): string,
  getHeader(name: string): string | null,
  getCookies(): {
    [idx: string]: {
      getName: () => string,
      getValue: () => string
    }
  }
};
