function init() {
  $('#search-field').on("input", function() {
    delay(function(){
      $("#suggestion-list").text(this.value);
    }, 1000 );
  });
}

(function() {
  init();
}());
