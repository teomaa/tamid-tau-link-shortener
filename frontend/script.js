$(function () {

    // Using regex, function for detecting if something entered is indeed a URL
    const isValidUrl = urlString=> {
        //Regex via https://stackoverflow.com/questions/4275525/regex-for-urls-without-http-https-ftp
	  	var urlPattern = new RegExp('^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$','i');
	  return !!urlPattern.test(urlString);
	}

    // Redirect
    // extract the last part of the URL and assign it to short_url
    var visited_url = location.href
    var short_url = visited_url.split('/')
    short_url = short_url[short_url.length - 1]

    // send a request to the backend API to get the long URL
    // corresponding to the short URL entered into the address bar
    if (short_url != null && short_url.length === 6) { // Make sure short URL is in the correct format
        $.ajax({
            url: "https://tamid-tau-link-shortener-backend-lz7muikcfa-zf.a.run.app/read?short_url=" + short_url,
            contentType: "application/json",
            data: "",
            type: 'GET',
            success: function (response) {
                console.log(response)
                // redirect to the long url if
                location.href = "https://" + response;

            }
        });
    }

    // Hide the alert on the page initially, since it should only be shown later
    $('.alert').hide()

    // Run if 'Shorten URL' button clicked
    $('#main_button').click(function () {

        // Get URL entered by user
        var url = $('#url_text_field').val()

        if (isValidUrl(url)) {
            $.ajax({
            url: "https://tamid-tau-link-shortener-backend-lz7muikcfa-zf.a.run.app/save-anon",
            contentType: "application/json",
            data: "{ \"long_url\":\"" + url + "\" }",
            type: 'POST',
            success: function (response) {

                console.log(response)

                // Set alert text
                $('#short_url_clickable').text("tamid-tau-link-shortener.web.app/" + response)
                $('#short_url_clickable').attr("href", "https://tamid-tau-link-shortener.web.app/" + response)
                $('.alert').show()
            }
        });
        } else {
            $('.alert').text("Invalid URL")
            $('.alert').show()
        }
        // POST a new URL to the backend

    });
});
