export default function paginate(array, pageNumber) {
  //Страницы начинаются с 1, а не с 0, поэтому pageNumber -1
  return array.slice((pageNumber - 1) * 50, pageNumber * 50);
}
