export const phoneFormatter = (phone: string) => {
  return `(${phone.slice(0, 2)}) ${phone.slice(2, 6)}-${phone.slice(6)}`;
};
