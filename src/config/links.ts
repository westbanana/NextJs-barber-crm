class PAGES_LINKS {
  private BASE = 'http://localhost:3000';

  public HOME = this.BASE;

  public EMPLOYEES = `${this.BASE}/employees`;

  public SETTINGS = `${this.BASE}/settings`;
}

export const PAGES_LINKS_INSTANCE = new PAGES_LINKS();
