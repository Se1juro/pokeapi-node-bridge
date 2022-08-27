import { readFileSync } from "fs";
import { resolve } from "path";

export const PRIVATE_KEY = readFileSync(resolve("./secrets/private.key"));
export const PUBLIC_KEY = readFileSync(resolve("./secrets/public.pem"));
