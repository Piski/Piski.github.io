function init() {
  setDeleteListener();
  $(document).on("pagebeforeshow","#pagetwo", function() {
    var books = retrieveBooks();
    populateBookList(books);
    $('#books-list').listview('refresh');
  });
}

(function() {
  init();
}());
