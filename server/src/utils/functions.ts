export const randomStr = (len: number) =>
  [...Array(len)].map(() => (~~(Math.random() * 36)).toString(36)).join("");
