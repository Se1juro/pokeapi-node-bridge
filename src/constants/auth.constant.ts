import { readFileSync } from "fs";
import { resolve } from "path";

export const PRIVATE_KEY = String(process.env.PRIVATE_KEY);
export const PUBLIC_KEY = String(process.env.PUBLIC_KEY);
