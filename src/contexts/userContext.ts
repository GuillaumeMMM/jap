import { createContext } from "@lit/context";
import { User } from "../types/user";

export const userContext = createContext<UserContext>("user");

export type UserContext = {
  user: User | null;
  setUser: (user: User) => void;
};
