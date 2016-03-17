function init() {
  $('#search-field').on("input", function() {
    var input = this.value;
    delay(function() {
      //$("#suggestion-list").text(input);
      var result = getBooks(input);
      console.log(result);
    }, 1000 );
  });
}

(function() {
  init();
}());
