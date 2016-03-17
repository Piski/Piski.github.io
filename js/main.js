function init() {
  $('#search-field').on("input", function() {
    var input = this.value;
    delay(function() {
      //$("#suggestion-list").text(input);
      getBooks(input, populateListView);
    }, 1000 );
  });
}

(function() {
  init();
}());
