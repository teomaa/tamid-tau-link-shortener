$(function () {
    $('.alert').hide()
    $('#main_button').click(function () {
        var url = $('#url_text_field').val()
        // $('#in_form').val()
        // var data = {}  // object to hold the user input data
        // store user data in a data["pycatj_data"]

        // todo: add root input element
        // data["root"] = "POST"
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
                $('.alert').show()
            }
        });
    });

    $('#redirect_button').click(function () {
        var url = $('#shorturl_text_field').val()
        // $('#in_form').val()
        // var data = {}  // object to hold the user input data
        // store user data in a data["pycatj_data"]

        // todo: add root input element
        // data["root"] = "POST"
        console.log(url)

        $.ajax({
            url: "https://tamid-tau-link-shortener-backend-lz7muikcfa-zf.a.run.app/read?short_url=" + url,
            contentType: "application/json",
            data: "",
            type: 'GET',
            success: function (response) {
                // $('#out_form').val(response.data)
                console.log("Test")
                console.log(response)
                location.href = "https://" + response;

            }
        });
    });
});

$(function () {

});