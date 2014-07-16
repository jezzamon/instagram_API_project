$(document).ready(function () {

  var min='',
  instagramAPI='';

//add the button click function 
//on click, it adds a removes on previous "selected" class, and adds "selected" on the clicked button.
  $('form').submit( function(evt) {
    evt.preventDefault();
    var $searchField = $('#search');
    var $submitButton = $('#submit');

    $searchField.prop("disabled", true);
    $submitButton.attr("disabled",true).val("searching...");
  //end form

 
//add the three variables needed for the getJSON function - .getJSON(url, data, callback)
  
    var instagramAPI = "api.instagram.com/v1/tags/" + tag + "/media/recent/?client_id=0c16edcd249a46468fb20afd4c31fd44" /* + "&count=20"*/;
  //the animal variable sets the tag which it wil"/v1/tags/" + tag + "/media/recent/?client_id=" + instagram.clientID + "&count=20",l search on  flickr from the clicked button which has the text, using the .text() command
    
    var tag = $searchField.val();
    
    var myID = "0c16edcd249a46468fb20afd4c31fd44";
    var instagramOptions = {
      client_id: myID,
      max_tag_id: min
      };

    //callback function, create variable photoHTML, that will add a ul tag.  
    function displayPhotos(data) {
      min = data.pagination.next_max_tag_id;
      url = data.pagination.next_url;
    var photoHTML = '<ul>';

   //Using .each, loop a list tag with photos from flickr, using the property of .items and in .items the property of .link (for the link of pic ) and .media for the thumbnail. 
    $.each (data.data, function (i, photo) {
      photoHTML += '<li class="grid-25 tablet-grid-50">';
      photoHTML += '<a href="' + photo.standard_resolution + '" class="image">';
      photoHTML += '<img src="' + photo.low_resolution + '"> </a> </li>';
    });//end each loop
      //close the <ul> tag on photoHTML
    photoHTML += '</ul>';

      //add all the data as html from flickr into HTML div with the #ID "photos" , using the command .html and the variable of photoHTML that has all the formatting that was set in the .each loop.
    $('#photos').html(photoHTML);
    $searchField.prop("disabled", false);
    $submitButton.attr("disabled",false).val("Search");
      }//end function displayPhotos

    //now that the url, data, and callback has been defined, call the .getJSON function
  $.getJSON(instagramAPI, instagramOptions, displayPhotos);
  
  });//end button ..so click of the button will set all the variables (url, data, callback function), then add the 

});  //end document ready

//alternate .getJSON

/*$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
          {
            tags:animal,
            format:"json"
          },
            function(data){
            }
         );
         */

