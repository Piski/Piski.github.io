var foundBooks = [];
var storedBooks = [];
var editableBook = {};

var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

var getBooks = function(name, callback) {
  const query = "https://www.googleapis.com/books/v1/volumes?q=" + name;
  $.ajax({
    type: "GET",
    url: query,
    success: function(data) {
      callback(data);
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.log("Status: " + textStatus); alert("Error: " + errorThrown);
        return undefined;
    }
  });
}

var parseResult = function(data, ratingExists) {
  data.items.forEach(function(volume) {
    var book = {};
    var item = volume.volumeInfo;
    if(item.language === "en" && !ratingExists && item.imageLinks) {
      book.rating = item.averageRating;
      book.authors = [];
      if(item.authors) {
        item.authors.forEach(function(author) {
          book.authors.push(author);
        });
      }
      book.published = item.publishedDate;
      book.thumbnail = item.imageLinks.thumbnail
        ? item.imageLinks.thumbnail : item.imageLinks.smallThumbnail;
      book.title = item.title;
      foundBooks.push(book);
    }
  });
  return foundBooks;
}

var populateBookList = function(data) {
  var $list = $("#books-list");
  clearBookList();
  data.forEach(function(book) {
    var book = '<li>' +
      '<a href="#" class="edit-book">' +
        '<img src="' + book.thumbnail + '">' +
        '<h2>' + book.title + '</h2>' +
        '<p>' + book.authors[0] + '</p>' +
        '<p class="rating">' + book.rating + '</p>' +
      '</a>' +
      '<a href="#" class="delete-book" data-icon="minus"></a>'
    '</li>';
    $list.append(book);
    $list.listview().listview('refresh');
    $(".inner-list").listview().listview("refresh");
  })
}

var populateListView = function(data) {
  $.mobile.loading( 'hide' );
  data = parseResult(data);
  var $list = $("#suggestion-list");
  clearListView();
  data.forEach(function(book) {
    var book = '<li>' +
      '<a href="#">' +
        '<img src="' + book.thumbnail + '">' +
        '<h2>' + book.title + '</h2>' +
        '<p>' + book.authors[0] + '</p>' +
        '<p class="rating">' + book.rating + '</p>' +
      '</a>' +
      '<a href="#" class="save-book" data-icon="plus"></a>' +
    '</li>';
    $list.append(book);
    $list.listview("refresh");
  })
}

var ObjectSerializer = function(o) {
  return JSON.stringify(o);
}

var ObjectDeserializer = function(o) {
  return JSON.parse(o)
}

var setSaveListener = function() {
  $("#suggestion-list").on("click", ".save-book", function() {
    saveBook($(this).parent().index());
    //toast("Book saved");
    newToast("Book saved");
  })
}

var saveBook = function(id) {
  var books = [];
  if(localStorage.getItem("books") === null) {
    books.push(foundBooks[id]);
    books = ObjectSerializer(books);
    localStorage.setItem("books", books);
  } else {
    var books = localStorage.getItem("books");
    books = ObjectDeserializer(books);
    books.push(foundBooks[id]);
    books = ObjectSerializer(books);
    localStorage.setItem("books", books);
  }
}

var retrieveBooks = function() {
  if(localStorage.getItem("books") === null) {
    return [];
  } else {
    return ObjectDeserializer(localStorage.getItem("books"));
  }
}

var clearListView = function() {
  $("#suggestion-list").html("");
  $.mobile.loading( 'hide' );
}

var clearBookList = function() {
  $("#books-list").html("");
}

var setSwipe = function() {
  $(document).on('swipeleft', '.ui-page', function(event) {
    if(event.handled !== true) {
        var nextpage = $.mobile.activePage.next('[data-role="page"]');
        if (nextpage.length > 0) {
            $.mobile.changePage(nextpage, {transition: "slide", reverse: false}, true, true);
        }
        event.handled = true;
    }
    return false;
  });
  $(document).on('swiperight', '.ui-page', function(event) {
      if(event.handled !== true) {
          var prevpage = $(this).prev('[data-role="page"]');
          if (prevpage.length > 0) {
              $.mobile.changePage(prevpage, {transition: "slide", reverse: true}, true, true);
          }
          event.handled = true;
      }
      return false;
  });
}

var setInputListener = function() {
  $('#search-field').on("input", function() {
    var input = this.value;
    if(input.length > 0 ) {
      $.mobile.loading( 'show' );
      delay(function() {
        getBooks(input, populateListView);
      }, 1000 );
    } else {
      clearListView();
    }
  });
}

var toast = function(msg) {
	$("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h3>" + msg + "</h3></div>")
	.css({ display: "block",
		opacity: 1,
		position: "fixed",
		padding: "7px",
		"text-align": "center",
		width: ($(window).width()),
    "background-color": "rgba(233, 233, 233, 1)",
		left: 0,
		top: 0 })
	  .appendTo( $.mobile.pageContainer ).delay( 1500 )
	  .fadeOut( 400, function(){
  		 $(this).remove();
  	});
}

var deleteBook = function(id) {
  var books = localStorage.getItem("books");
  books = ObjectDeserializer(books);
  books.splice(id, 1);
  books = ObjectSerializer(books);
  localStorage.setItem("books", books);
}

var areYouSure = function(options, callback) {
  $("#sure .sure-1").text(options.title);
  $("#sure .sure-2").text(options.description);
  $("#sure .sure-img").attr("src", options.image);
  $("#sure .sure-do").text(options.button).on("click.sure", function() {
    callback();
    $(this).off("click.sure");
  });
  $.mobile.changePage("#sure");
}

var setDeleteListener = function() {
  $("#books-list").on("click", ".delete-book", function() {
    var self = this;
    var options = {
      title: "Are you sure you want to delete?",
      description: "",
      image: $(this).parent().find("img").attr("src"),
      button: "Delete"
    };
    areYouSure(options, function() {
        $(self).parent().hide();
        deleteBook($(self).parent().index());
        //toast("Book deleted");
        newToast("Book deleted");
    });
  })
}

var setEditListener = function() {
  $("#books-list").on("click", ".edit-book", function() {
    editableBook = retrieveBook($(this).parent().index());
    $.mobile.changePage("#editpage");
  });
}

var retrieveBook = function(id) {
  var books = localStorage.getItem("books");
  books = ObjectDeserializer(books);
  return books[id];
}

var populateEditableView = function() {
  $("#title").val(editableBook.title);
  $("#writer").val(editableBook.authors);
  $("#rating").val(editableBook.rating);
  $("#image-src").val(editableBook.thumbnail);
  $("#image").attr("src", editableBook.thumbnail);
}

var imageInputListener = function() {
  var $image = $("#image");
  $('#image-src').on("input", function() {
    var self = this;
    if(self.value.length > 0 ) {
      delay(function() {
        $image.attr("src", $(self).val())
        $image.show();
      }, 1000 );
    } else {
      $image.hide();
    }
  });
}

var setUpdateListeners = function() {
  $("#editpage").on("click", ".update-book", function() {
    updateBook($(self).index());
    //toast("Book updated");
    newToast("Book updated");
  })
}

var updateBook = function(id) {
  editableBook = {
    authors: [$("#writer").val()],
    title: $("#title").val(),
    thumbnail: $("#image-src").val(),
    rating: $("#rating").val()
  }
  var books = localStorage.getItem("books");
  books = ObjectDeserializer(books);
  books.splice(id, 1, editableBook);
  books = ObjectSerializer(books);
  localStorage.setItem("books", books);
}

var setHeader = function() {
  $("[data-role=header]").toolbar();
}

var newToast = function(msg) {
  new $.nd2Toast({
   message : msg,
   action : {
     title : "Revert",
     fn : function() {
        console.log("Reverted");
     },
     color : "red"
   },
   ttl : 8000
 });
}
