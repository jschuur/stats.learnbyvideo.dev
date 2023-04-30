export const truncateAt = (n: number, str: string) => {
  return str.length <= n ? str : `${str.slice(0, n)}...`;
};
