function init() {
  setSwipe();
  setInputListener();
  $("#suggestion-list").on("click li a", function() {
    alert(this)
  })
}

(function() {
  init();
}());
