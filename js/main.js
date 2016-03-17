function init() {
  $('#search-field').on("input", function() {
    delay(function() {
      console.log(this.value)
      $("#suggestion-list").text(this.value);
    }, 1000 );
  });
}

(function() {
  init();
}());
