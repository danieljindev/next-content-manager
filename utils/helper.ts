export const makeExcerpt = (text: string, maxlength: number) => {
  let str = text;

  if (text.length > maxlength) {
    str = text.substring(0, maxlength) + '...';
  }

  return str;
};
