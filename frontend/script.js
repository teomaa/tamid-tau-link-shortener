$(function () {
    $('#main_button').click(function () {
        var url = "123"
        // $('#in_form').val()
        // var data = {}  // object to hold the user input data
        // store user data in a data["pycatj_data"]

        // todo: add root input element
        // data["root"] = "POST"
        console.log(url)

        $.ajax({
            url: "https://tamid-tau-link-shortener-backend-lz7muikcfa-zf.a.run.app/read?short-url=" + "url",
            contentType: "application/json",
            data: "",
            dataType: "json",
            type: 'GET',
            success: function (response) {
                // $('#out_form').val(response.data)
                console.log(response)
            }
        });
    });
});