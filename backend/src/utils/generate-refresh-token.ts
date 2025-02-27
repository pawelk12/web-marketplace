import { randomBytes } from 'crypto';

export const GenerateRefreshToken = () => {
  return randomBytes(64).toString('hex');
};
