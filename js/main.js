function init() {
  $('#search-field').on("input", function() {
    var input = this.value;
    delay(function() {
      $.mobile.loading( 'show' );
      getBooks(input, populateListView);
    }, 1000 );
  });
}

(function() {
  init();
}());
