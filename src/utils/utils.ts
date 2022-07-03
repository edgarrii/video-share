export const toWei = (value: number) => {
  return value * 10 ** 18;
};

export const generateBody = (
  file: any,
  object?: { name: string; key: string }
) => {
  const formData = new FormData();

  if (object) {
    formData.append('video', JSON.stringify(object));
    formData.append('image', file);
  } else {
    formData.append('video', file);
  }

  return formData;
};
