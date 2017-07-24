$(function(){
  addTeam(nbaTeams, 'searchButton', '#buttons');
  console.log("hi");
})

  var nbaTeams = ['lakers','spurs','warriors'];

  function addTeam(nbaTeams,classToAdd,areaToAdd){
    $(areaToAdd).empty();
    for(var i=0;i<nbaTeams.length;i++){
      var a = $('<button>');
      a.addClass(classToAdd);
      a.attr('data-type', nbaTeams[i])
      a.text(nbaTeams[i]);
      $(areaToAdd).append(a);

    }
}


$(document).on('click','.searchButton',function(){
  $('#gifs').empty();
  var type = $(this).data('type');

  var queryURL= "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=5";

  $.ajax({
    url:queryURL,
    method:"GET"
  })
  .done(function(response){
    console.log(response);
      for(var i = 0; i<response.data.length;i++){
        var searchDiv = $('<div class= "search-item">');

        var animated = response.data[i].images.fixed_height.url;
        var still = response.data[i].images.fixed_height_still.url;
        var image = $('<img>');
        image.attr('src',still);
        image.attr('data-still',still);
        image.attr('data-animated',animated);
        image.attr('data-state','still');
        image.addClass('searchImage');
     
        searchDiv.append(image);
        $('#gifs').append(searchDiv);

      }
    })
  })

$(document).on('click', '.searchImage',function(){
  var state = $(this).attr('data-state');
  if(state=='still'){
    $(this).attr('src',$(this).data('animated'));
    $(this).attr('data-state', 'animated');
  } else{
    $(this).attr('src',$(this).data('still'));
    $(this).attr('data-state','still');
  }
})

      $('#addSearch').on('click', function(){
        var newSearch = $('input').val();
        nbateams.push(newSearch);
        addTeam(nbaTeams, 'searchButton', '#buttons');
        return false;
      })