// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$(document).on('deviceready', function(e) {

$('#bookForm').on('submit', function(e){
    var searchBook = $('#bookName').val();
    console.log(searchBook); 
    fetchBooks(searchBook);

        e.preventDefault();
     $('#spin').css('display', 'block');
    
  });
  
    
    
    
    
    
    
    
    
/*---------------fetch movies------------------*/
    
function fetchBooks(searchBook){
  $.ajax({
    method:'GET',
    url:'https://www.googleapis.com/books/v1/volumes?q=search' + searchBook
  }).done(function(response){
    console.log(response);
      
$('#spin').css('display', 'none');
      
     if(response.totalItems == 0){
        myApp.alert('please enter a valid movie name', 'Reminder');
    } 
       
             let bookArray = response.items; // where Serach is the name of the array holding the movies
        
        //console.log(moviesArray[0].Year);
        
        
        var placeholder = ' ';
        $.each(bookArray, function(index, book){
      

   var singleBook = book.selfLink;
            var id = book.id;
            var BOOK = book.volumeInfo
            
            
      placeholder += `
        <li>

 <a  onclick="clickcedBook('${singleBook}', '${id}')" href="book.html" class="item-link item-content">
        <div class="item-media"><img src="${BOOK.imageLinks.thumbnail}">
        </div>
        <div class="item-inner">
          <div class="item-title-row">
            <div class="item-title">${BOOK.title}</div>
          </div>
        </div>
      </a>

    </li>
      `;
    });
    $('#bookslist').html(placeholder);
  });
}
   
    

 }); /*---------end of onDeviceready function ------------*/
    










function clickcedBook(singleBook, id){
  sessionStorage.setItem('bookId', id);
sessionStorage.setItem('bookHref', singleBook);
}






myApp.onPageInit('book', function (page) {
    var bId = sessionStorage.getItem('bookId');
     var bookLink = sessionStorage.getItem('bookHref');
    getBook(bId, bookLink);
    
    
    
    
   //  $$('.page').css('background', 'url("img/nataliewood") no-repeat center center fixed');
   // $$('.page').css('background-size', 'cover');       
   

}) /*------- end of movie page scripting -----*/ 









    // Get Single Movie
function getBook(bId, bookLink){
  $.ajax({
    method:'GET',
     url:'https://www.googleapis.com/books/v1/volumes/' + bId
  }).done(function(bookD){
   console.log(bookD);
  
      
         let x = bookD.accessInfo.pdf.webReaderLink;
       let bookInf = bookD.volumeInfo;
              
          var imgSrc;
           
        if(bookInf.imageLinks.large != null){ 
            imgSrc = bookInf.imageLinks.large;
    
        }else {
        imgSrc = bookInf.imageLinks.thumbnail;
    
        }
        
           var readingLink;
           
        if(bookD.accessInfo.pdf.isAvailable == true){ 
            readingLink = bookD.accessInfo.webReaderLink;
            inAppbrowser();
        }
     
           
         var bookDetails = ' ';
      
      
    var bookDetails = `
     <div class="card">
          <img src="${imgSrc}">    
            <ul>
      <li> <strong> Subtitle:</strong>${bookInf.subtitle}</li><hr>
      <li><strong>Online Reading:</strong> <p class="bg-new" id="link">Online Reading Is Available Here!</p></li><hr>
      <li><strong> Description:</strong> ${bookInf.description}</li><hr>
      <li> <strong> Category:</strong> ${bookInf.categories}</li><hr>
      <li> <strong>Author:</strong> ${bookInf.authors}</li><hr>
      <li> <strong> Publisher:</strong>${bookInf.publisher}</li><hr>
<li><strong> Published Date:</strong> ${bookInf.publishedDate}</li><hr>

            </ul>
         

    `;

    $('#bookDetails').html(bookDetails);
      
      
      
      
      
      

      
      document.addEventListener('deviceready', inAppbrowser, false);
    
function inAppbrowser(){
   
    if(bookD.accessInfo.pdf.isAvailable == false){
         console.log(bookD.accessInfo.pdf.isAvailable);
    $$('#link').css('background', 'gray');
    $$('#link').html('Online Reading is Not Available');
    let jbroswer = window.open("#", '_blank', options); 
        }
    
    $$('#link').on('touchend', function(){
    var optionsArray =[ 
                // For all OS's
				'location=no',
				
				// For Android, iOS & Windows Phone only
				'hidden=yes',
				
				// Android and iOS only
				'clearcache=yes',
				'clearsessioncache=yes',
				
				// iOS only
				// Transition style options are fliphorizontal, crossdissolve or coververtical (Default)
				'transitionstyle=fliphorizontal',
				'toolbar=yes',
				'closebuttoncaption=Exit',
				// Tool bar position options are top or bottom (Default)
				'toolbarposition=top',
				'disallowoverscroll=yes',
				'enableViewportScale=yes',
				'mediaPlaybackRequiresUserAction=yes',
				'allowInlineMediaPlayback=yes',
				'keyboardDisplayRequiresUserAction=no',
				'suppressesIncrementalRendering=yes',
				// Presentation style options are pagesheet, formsheet or fullscreen (Default)
				'presentationstyle=formsheet',

				// Android only
				'zoom=no',
				'hardwareback=no',
				
				// Windows only
				// If location is set to no there be no control presented to user to close IAB window.
				'fullscreen=yes' ];    
    
    let options = optionsArray.join();     
   let jbroswer = window.open(readingLink, '_blank', options);  
        jbroswer.show();  
    });
    
    
}   
      
      
      
      
  });
}
    
   




          

  