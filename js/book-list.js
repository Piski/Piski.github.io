function init() {
  var books = retrieveBooks();
  console.log(books);
  populateBookList(books);
}

(function() {
  init();
}());
