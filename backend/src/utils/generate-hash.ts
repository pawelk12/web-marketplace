import { createHash } from 'crypto';

export const GenerateHash = (data: string): string => {
  const hash = createHash('sha256');
  hash.update(data);
  return hash.digest('hex');
};
