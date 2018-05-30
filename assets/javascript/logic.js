$(document).ready(function () {


    var gifs = ["random", "animals", "food", "memes"];

    function displayGIF() {

        var gifTag = $(this).attr("data-name");

        var queryURL = `https://api.giphy.com/v1/gifs/search?q=${gifTag}&limit=10&api_key=2T6QzgRMvti65xwVaxAoLtEGOOSEfwpp`;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            $("#gifs-here").empty();

            var results = response.data;

            for (var i = 0; i < results.length; i++) {
            
                var gifDiv = $("<div>");
                var gifClip = $("<img>");
                var rTag = $("<p>").text(`Rated: ${results[i].rating}`);

                gifClip.attr("src", results[i].images.fixed_height_still.url);
                gifClip.attr("data-still", results[i].images.fixed_height_still.url);
                gifClip.attr("data-animate", results[i].images.fixed_height.url);
                gifClip.attr("data-state", "still");
                gifClip.attr("class", "gif");
                gifDiv.append(gifClip);
                gifDiv.append(rTag);

                $("#gifs-here").append(gifDiv);

            }


            $(".gif").click(function () {

                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }

            })
                
        });

    }


    function renderButtons() {

        $("#gif-tags").empty();

        for (var i = 0; i < gifs.length; i++) {
            var a = $("<button>");
            a.addClass("gifs");
            a.attr("data-name", gifs[i]);
            a.text(gifs[i]);
            $("#gif-tags").append(a);
        }

    }


    $("#add-gif").click(function (event) {

        event.preventDefault();

        var gif = $("#gif-input").val().trim();

        if (gifs.indexOf(gif) === -1) {
            gifs.push(gif);
        } else {
            alert("That tag already exists! Please add a new tag.");
        }

        renderButtons();

    })


    $(document).on("click", ".gifs", displayGIF);

    renderButtons();


})