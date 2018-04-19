var topics = [
  "Godzilla",
  "Fight Club",
  "Ghostbusters",
  "The Big Lebowski",
  "Videodrome",
  "Dr. Strangelove",
  "Jaws",
  "Wayne's World",
  "The Princess Bride",
  "Guardians of the Galaxy",
  "Young Frankenstein"
];

function renderButtons() {
  $("#buttonsArea").empty(); // empties the buttonsArea div

  // creates a button with attributes for items in the array
  for (var i = 0; i < topics.length; i++) {
    var button = $("<button>");
    button.html(topics[i]);
    button.addClass("btn btn-outline-secondary");
    button.attr("id", "movie-btn");
    button.attr("movie-title", topics[i]);
    $("#buttonsArea").append(button);
  }
}

function displayGifs() {
  var thisMovie = $(this).attr("movie-title");
  console.log(thisMovie);
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    thisMovie +
    "&api_key=xQhHrwBhdTjcOS01rgpsZI3pKELbOY37&limit=8&rating=pg";

  // ajax call
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    console.log(response);
    var response = response.data;

    // creates a div that contains a still image gif and rating info for gif
    for (var i = 0; i < response.length; i++) {
      var gifDiv = $("<div>");
      gifDiv.addClass("gifDiv");

      var rating = response[i].rating;
      var p = $("<p>").html("Rating: " + rating);
      p.addClass("text-center");

      var gifImage = $("<img>");
      gifImage.addClass("gif");
      gifImage.attr("src", response[i].images.fixed_height_still.url);
      gifImage.attr("data-still", response[i].images.fixed_height_still.url);
      gifImage.attr("data-animate", response[i].images.fixed_height.url);
      gifImage.attr("data-state", "still");

      // puts the gif and the rating in gifDiv
      gifDiv.append(p);
      gifDiv.prepend(gifImage);

      // putting the gifDiv at the top of the mainArea div
      $("#mainArea").prepend(gifDiv);
    }
  });
}

// when the submit button is clicked, the input value is pushed to the topics array and rendered into a new button
$("#submit-btn").on("click", function(event) {
  event.preventDefault();

  var newShow = $("#userInput")
    .val()
    .trim();
  topics.push(newShow);
  renderButtons();
});

// listens for a click on #movie-btn, then displayGifs function happens
$(document).on("click", "#movie-btn", displayGifs);

//on click function to start and stop the animation
$(document).on("click", ".gif", function() {
  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

renderButtons();
