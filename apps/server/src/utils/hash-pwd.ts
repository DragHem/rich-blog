import * as bcrypt from 'bcrypt';

export const hash = async (password: string) => {
  return await bcrypt.hash(password, 12);
};

export const isMatch = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
