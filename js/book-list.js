function init() {
  var books = retrieveBooks();
  console.log(books);
  populateListView(books, "#books-list");
}

(function() {
  init();
}());
