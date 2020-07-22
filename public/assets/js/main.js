//Animations
AOS.init({
    once: true,
});

//jQuery
$('#contactForm').submit(function (e) {
    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this);
    var url = form.attr('action');

    //Google reCAPTCHA v3
    grecaptcha.ready(function () {
        // do request for recaptcha token
        // response is promise with passed token
        grecaptcha
            .execute(process.env.SECRET_GOOGLE_KEY, {
                action: 'submit',
            })
            .then(function (token) {
                $.ajax({
                    type: 'POST',
                    url: url,
                    data: form.serialize() + '&token=' + token, // serializes the form's elements.
                    success: function (data) {
                        alert('success = ' + data.success); // show response from the php script.
                    },
                });
            });
    });
});

//Vanilla JS
