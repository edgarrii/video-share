export const toWei = (value: number) => {
  return value * 10 ** 18;
};

export const generateBody = (file: any) => {
  console.log(file);

  const formData = new FormData();
  formData.append("video", file);

  return formData;
};
