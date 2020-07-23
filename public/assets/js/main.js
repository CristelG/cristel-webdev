//Animations
AOS.init({
    once: true,
});

//jQuery

//Flag to check if form was submitted
var hasAlreadySubmitted = false;

$('#contactForm').submit(function (e) {
    e.preventDefault(); // avoid to execute the actual submit of the form.
    document.getElementById('submitBtn').blur();

    if (!hasAlreadySubmitted) {
        hasAlreadySubmitted = true;
        var form = $(this);
        var url = form.attr('action');

        //Google reCAPTCHA v3
        try {
            $('#sendButtonText').hide();
            $('#spinner').show();
            grecaptcha.ready(() => {
                // do request for recaptcha token
                // response is promise with passed token
                grecaptcha
                    .execute('6LdZh7QZAAAAAOk1odjGNhBIpewmZfFKKf0Xh8IP', {
                        action: 'submit',
                    })
                    .then(function (token) {
                        $.ajax({
                            type: 'POST',
                            url: url,
                            data: form.serialize() + '&token=' + token, // serializes the form's elements.
                            success: () => {
                                $('#submitBtn').addClass('bg-success');
                                $('#sendButtonText').text(
                                    'Message sent successfully!'
                                );
                                $('#sendButtonText').show();
                                $('#spinner').hide();
                            },
                            error: () => {
                                $('#submitBtn').addClass('bg-danger');
                                $('#sendButtonText').text(
                                    'There was an error, try again later.'
                                );
                                $('#sendButtonText').show();
                                $('#spinner').hide();
                            },
                        });
                    });
            });
        } catch (e) {
            $('#submitBtn').addClass('bg-danger');
            $('#sendButtonText').text('There was an error, try again later.');
            $('#sendButtonText').show();
            $('#spinner').hide();
        }
    }
});

//Vanilla JS
