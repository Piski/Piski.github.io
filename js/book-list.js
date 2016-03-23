function init() {
  setDeleteListener();
  setEditListener();
  $(document).on("pagebeforeshow","#pagetwo", function() {
    $(".pageone").removeClass("color-active");
    $(".pagetwo").addClass("color-active");
    var books = retrieveBooks();
    populateBookList(books);
    $('#books-list').listview('refresh');
  });
}

(function() {
  init();
}());
