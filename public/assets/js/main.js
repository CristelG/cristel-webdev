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

$('.navbar-nav>li>a').on('click', function () {
    $('.navbar-collapse').collapse('hide');
});

//Vanilla JS

//Get the button:
mybutton = document.getElementById('goToTopBtn');

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

