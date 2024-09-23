export const getConfig = (key: string) => {
  const value = process.env[key];

  if (value === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};
