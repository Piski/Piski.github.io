function init() {
  $('#search-field').on("input", function() {
    var input = this.value;
    delay(function() {
      $("#suggestion-list").text(input);
    }, 1000 );
  });
}

(function() {
  init();
}());
