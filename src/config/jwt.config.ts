import 'dotenv/config';
import * as process from 'node:process';

export const jwtConfig = {
  secret: process.env.JWT_SECRET ?? "twdsd",
  expiresIn: process.env.JWT_EXPIRES_IN ?? "1d"
}
