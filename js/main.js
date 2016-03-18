function init() {
  setSwipe();
  setInputListener();
  $("#suggestion-list").on("click", ".save-book", function() {
    console.log($("#suggestion-list li").index(this))
  })
}

(function() {
  init();
}());
