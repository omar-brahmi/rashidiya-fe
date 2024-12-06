export interface User {
  id?: number;
  firstname: string;
  lastname: string;
  role: Role;
  username: string;
  email: string;
  password: string;
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}
