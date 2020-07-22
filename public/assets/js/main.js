//Animations
AOS.init({
    once: true,
});

//jQuery
$('#contact-form').submit(function (e) {
    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this);
    var url = form.attr('action');

    $.ajax({
        type: 'POST',
        url: '/contact',
        data: form.serialize(), // serializes the form's elements.
        success: function (data) {
            alert('success = ' + data.success); // show response from the php script.
        },
    });
});
