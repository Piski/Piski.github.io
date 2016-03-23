function init() {
  setDeleteListener();
  setEditListener();
  $(document).on("pagebeforeshow","#pagetwo", function() {
    $(".pageone").addClass("ui-btn-active ui-state-persist");
    var books = retrieveBooks();
    populateBookList(books);
    $('#books-list').listview('refresh');
  });
}

(function() {
  init();
}());
