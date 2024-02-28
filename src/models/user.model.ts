interface Avater {
  public_id: string;
  url: string;
}

export interface User {
  _id: string;
  name: string;
  mobile: string;
  email: string;
  avater?: Avater;
  role: string;
  password: string;
}
