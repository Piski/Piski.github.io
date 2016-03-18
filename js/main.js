function init() {
  $('#search-field').on("input", function() {
    var input = this.value;
    if(input > 0 ) {
      $.mobile.loading( 'show' );
      delay(function() {
        getBooks(input, populateListView);
      }, 1000 );
    } else {
      clearListView();
    }
  });
}

(function() {
  init();
}());
