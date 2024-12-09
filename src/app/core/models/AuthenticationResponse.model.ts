import {User} from "./user.model";

export interface AuthenticationResponse {
  user: User;
  token: string;
}
