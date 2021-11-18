const convertDate = (inputFormat: string): string => {
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('.');
};

export function pad(s: number | string): string | number {
  return s < 10 ? '0' + s : s;
}

export default convertDate;
