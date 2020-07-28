export default function (array, pageNumber, pageSize) {
  //Страницы начинаются с 1, а не с 0, поэтому pageNumber -1
  return array?.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}
