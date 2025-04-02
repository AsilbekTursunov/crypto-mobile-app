 
export const convertLocal = (price: string | number) => {
  return Number(price).toLocaleString();
}
export const convertFixed = (price: string | number) => {
  return Number(price).toFixed(2);
}

export const sliceText = (text: string, slice: number) => {
  return text?.length > slice ? `${text.slice(0, slice)}..` : text
}