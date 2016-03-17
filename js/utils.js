var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

var getBooks = function(name) {
  var query = "https://www.googleapis.com/books/v1/volumes?q=" + name;
  console.log(query);
  $.ajax({
    type: "GET",
    url: query,
    success: function(data) {
      return data;
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.log("Status: " + textStatus); alert("Error: " + errorThrown);
        return undefined;
    }
  });
}
