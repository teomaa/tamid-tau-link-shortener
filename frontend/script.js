$(function () {
    // Redirect
    console.log(location.href)
    var visited_url = location.href
    var short_url = visited_url.split('/')
    short_url = short_url[short_url.length - 1]

    console.log(short_url)
    if (short_url != null && short_url.length === 6) { // Make sure short URL is in the correct format
        $.ajax({
            url: "https://tamid-tau-link-shortener-backend-lz7muikcfa-zf.a.run.app/read?short_url=" + short_url,
            contentType: "application/json",
            data: "",
            type: 'GET',
            success: function (response) {
                console.log("Test")
                console.log(response)
                location.href = "https://" + response;

            }
        });
    }

    $('.alert').hide()
    $('#main_button').click(function () {
        var url = $('#url_text_field').val()

        console.log(url)

        $.ajax({
            url: "https://tamid-tau-link-shortener-backend-lz7muikcfa-zf.a.run.app/save-anon",
            contentType: "application/json",
            data: "{ \"long_url\":\"" + url + "\" }",
            type: 'POST',
            success: function (response) {
                // $('#out_form').val(response.data)
                console.log("Test")
                console.log(response)
                $('#short_url_clickable').text("tamid.org.il/" + response)
                $('#short_url_clickable').attr("href", "https://tamid.org.il/" + response)
                $('.alert').show()
            }
        });
    });
});
