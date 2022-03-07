$(document).on('submit', '#uploadFile', function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    $.ajax({
        method: "POST",
        url: "http://127.0.0.1:5000/api/fileupload",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function () {
            console.log('b')
            $('button[type="submit"]').attr('disabled', 'disabled');
        },
        success: function (data) {
            
            console.log('s')
            $('button[type="submit"]').removeAttr('disabled');

            $('#alertBox').html(data).fadeIn();
            e.preventDefault();
        }

    });
    return false;
});