import { compareSync } from "bcryptjs";

export const comparePassword = (
  passwordBody: string,
  passwordSaved: string
) => {
  return compareSync(passwordBody, passwordSaved);
};
