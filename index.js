let net;

async function app() {
    console.log('Loading mobilenet..');

    // Load the model.
    net = await mobilenet.load();
    console.log('Sucessfully loaded model');

    // Make a prediction through the model on our image.
    const imgEl = document.getElementById('img');
    const result = await net.classify(imgEl);
    console.log(result);

    $.each(result, function( index, value ) {
        console.log(value);
        $('ol').append(`<li>${value.className}</li>`);
    });
}

app();

$("#fileupload").change(function () {
    $("#dvPreview").html("");
    $("#prediction").html("");
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;
    if (regex.test($(this).val().toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                $("#dvPreview").show();
                $("#dvPreview").append("<img />");
                var reader = new FileReader();
                reader.onload = function (e) {
                    $("#dvPreview img").attr("id", "img");
                    $("#dvPreview img").attr("src", e.target.result);
                }
                reader.readAsDataURL($(this)[0].files[0]);
                app();
            } else {
                alert("This browser does not support FileReader.");
            }
    } else {
        alert("Please upload a valid image file.");
    }
});