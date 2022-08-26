import { compareSync } from "bcrypt";

export const comparePassword = (
  passwordBody: string,
  passwordSaved: string
) => {
  return compareSync(passwordBody, passwordSaved);
};
