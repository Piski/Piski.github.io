function init() {
  setSwipe();
  setInputListener();
  $("#suggestion-list").on("click", ".save-book", saveBook.bind(this))
}

(function() {
  init();
}());
