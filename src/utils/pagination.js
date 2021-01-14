function paginate(numberOfItems, itemsPerPage, currentPage) {
  let numberOfPages;

  if (numberOfItems === 0) {
    numberOfPages = 1;
  } else {
    numberOfPages = Math.ceil(numberOfItems / itemsPerPage);
  }
}

export default paginate;
