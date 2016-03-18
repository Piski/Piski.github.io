function init() {
  setSwipe();
  setInputListener();
  $(".save-book").on("click", function() {
    console.log(this)
  })
}

(function() {
  init();
}());
