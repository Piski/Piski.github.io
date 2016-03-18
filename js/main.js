function init() {
  setSwipe();
  setInputListener();
  $("#suggestion-list").on("click", ".save-book", function() {
    alert(this)
  })
}

(function() {
  init();
}());
