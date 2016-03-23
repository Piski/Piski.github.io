function init() {
  setDeleteListener();
  setEditListener();
  $(document).on("pagebeforeshow","#pagetwo", function() {
    //$(".pageone").removeClass("ui-state-persist");
    //$(".pagetwo").addClass("ui-state-persist");
    var books = retrieveBooks();
    populateBookList(books);
    $('#books-list').listview('refresh');
  });
}

(function() {
  init();
}());
