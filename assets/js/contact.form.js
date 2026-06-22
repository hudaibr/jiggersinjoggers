(function ($) {
    'use strict';

    var form = $('#contactForm');
    var formMessages = $('#form-status');

    $(form).submit(async function (e) {

        e.preventDefault();

        const payload = {
            name: $('[name="name"]').val(),
            email: $('[name="email"]').val(),
            company: $('[name="company"]').val(),
            website: $('[name="website"]').val(),
            service: $('[name="service"]').val(),
            budget: $('[name="budget"]').val(),
            message: $('[name="message"]').val(),
            website_check: $('[name="website_check"]').val()
        };

        try {

            const response = await fetch(
                'https://jiggers-contact-form.hudaib-riaz2627.workers.dev/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                }
            );

            const result = await response.json();

            if (result.success) {

                $(formMessages)
                    .removeClass('text-warning')
                    .addClass('text-success fw-bold mt-3')
                    .html('Thank you! Your message has been sent successfully.');

                form[0].reset();

            } else {

                $(formMessages)
                    .removeClass('text-success')
                    .addClass('text-warning fw-bold mt-3')
                    .html(result.error || 'Something went wrong.');

            }

        } catch (error) {

            $(formMessages)
                .removeClass('text-success')
                .addClass('text-warning fw-bold mt-3')
                .html('Unable to send message. Please try again.');

            console.error(error);
        }

    });

})(jQuery);