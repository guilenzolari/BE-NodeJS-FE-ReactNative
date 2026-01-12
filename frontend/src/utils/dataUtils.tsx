export const phoneFormatter = (phone?: string) => {
  if (!phone || phone.length !== 10) return phone;
  return `(${phone.slice(0, 2)}) ${phone.slice(2, 6)}-${phone.slice(6)}`;
};
