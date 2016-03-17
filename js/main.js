function init() {
  $('#search-field').on("input", function() {
    var input = this.value;
    delay(function() {
      //$("#suggestion-list").text(input);
      getBooks(input, function(data) {
        $("#suggestion-list").text(JSON.stringify(data));
        console.log(parseResult(data));
      });
    }, 1000 );
  });
}

(function() {
  init();
}());
