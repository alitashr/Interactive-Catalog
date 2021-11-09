window.getImagesNameArray = (totalPagesNum) => {
  let arr = [];
  for (var i = 1; i <=totalPagesNum; i++) {
    let num = i < 10 ? "0" + i : i;
    const L = num + " - L.jpg";
    const R = num + " - R.jpg";
    arr.push(L);
    arr.push(R);
  }
  return arr;
};
