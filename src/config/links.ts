import { UrlObject } from 'url'; // Импортируйте UrlObject из 'url'

class PAGES_LINKS {
  private BASE: UrlObject = {
    protocol: 'http',
    hostname: 'localhost',
    port: 3000,
    pathname: '',
  };

  public get HOME(): UrlObject {
    return { ...this.BASE, pathname: '/' };
  }

  public get EMPLOYEES(): UrlObject {
    return { ...this.BASE, pathname: '/employees' };
  }

  public get SETTINGS(): UrlObject {
    return { ...this.BASE, pathname: '/settings' };
  }
}

export const PAGES_LINKS_INSTANCE = new PAGES_LINKS();
