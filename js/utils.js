var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

var getBooks = function(name) {
  $.ajax({
    type: "GET",
    url: "https://www.googleapis.com/books/v1/volumes?q=" + name + "&callback=handleResponse",
    success: function(data) {
        $("#suggestion-list").text(JSON.stringify(data))
        console.log(data)
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.log("Status: " + textStatus); alert("Error: " + errorThrown);
    }
  });
}
