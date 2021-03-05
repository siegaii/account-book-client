const addzero = (num) => (num < 10 ? '0' + num : num);

export function timestampToString(timestamp) {
  const D = new Date(Number(timestamp));
  const year = D.getFullYear();
  const month = D.getMonth() + 1;
  const day = D.getDate();
  const minute = D.getMinutes();
  const seconds = D.getSeconds();

  return `${year}-${addzero(month)}-${addzero(day)} ${addzero(minute)}:${addzero(seconds)}`;
}
