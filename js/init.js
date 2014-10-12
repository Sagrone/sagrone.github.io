$(window).load(function () {
  "use strict";
  $('#status').fadeOut();
  $('#preloader').delay(350).fadeOut('slow');
  $('body').delay(350).css({
    'overflow': 'visible'
  });
});
$(function () {
  "use strict";

  /* ---------------------------------------------------------
   * Background (Backstretch)
   */

  $.backstretch([
    "img/background/1.jpg",
    "img/background/2.jpg",
    "img/background/3.jpg"
  ], {duration: 3800, fade: 1500});

  /* ---------------------------------------------------------
   * WOW
   */

  new WOW().init();

  /* ---------------------------------------------------------
   * Scroll arrow
   */

  $("#scroll").click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1200);
        return false;
      }
    }
   });

  /* ---------------------------------------------------------
   * Countdown
   */

  var description = {
    weeks: "weeks",
    days: "days",
    hours: "hours",
    minutes: "minutes",
    seconds: "seconds"
  };

  // year/month/day
  $('#countdown').countdown('2015/2/1', function (event) {
    $(this).html(event.strftime(
      '<div class="countdown-section"><b>%w</b> <span>' + description.weeks + '</span> </div>' +
      '<div class="countdown-section"><b>%d</b> <span>' + description.days + '</span> </div>' +
      '<div class="countdown-section"><b>%H</b> <span>' + description.hours + '</span> </div>' +
      '<div class="countdown-section"><b>%M</b> <span>' + description.minutes + '</span> </div>' +
      '<div class="countdown-section"><b>%S</b> <span>' + description.seconds + '</span> </div>'
    ));
  });


  /* ---------------------------------------------------------
   * Form validation
   */

  /* Signup form */

  $('#mc-embedded-subscribe-form').bootstrapValidator({
    message: 'This value is not valid',
    feedbackIcons: {
      valid: 'fa fa-check',
      invalid: 'fa fa-times',
      validating: 'fa fa-refresh'
    },
    fields: {
      email: {
        validators: {
          notEmpty: {
            message: 'Email cannot be empty'
          },
          emailAddress: {
            message: 'The input is not a valid email address'
          }
        }
      }
    }
  });

  /* Contact form */

  $('#contactForm').bootstrapValidator({
    fields: {
      name: {
        validators: {
          notEmpty: {
            message: 'Name cannot be empty'
          },
          stringLength: {
            min: 6,
            max: 30,
            message: 'Name must be more than 6 and less than 30 characters long'
          },
          regexp: {
            regexp: /^[a-zA-Z\s]+$/,
            message: 'Name can only consist alphabetical characters'
          }
        }
      },
      email: {
        validators: {
          notEmpty: {
            message: 'Email cannot be empty'
          },
          emailAddress: {
            message: 'The input is not a valid email address'
          }
        }
      },
      message: {
        validators: {
          notEmpty: {
            message: 'Message cannot be empty'
          }
        }
      }
    },
    feedbackIcons: {
      valid: 'fa fa-check',
      invalid: 'fa fa-times',
      validating: 'fa fa-refresh'
    },
    submitHandler: function (validator, form, submitButton) {
      var l = Ladda.create(submitButton[0]);
      var btnText = submitButton.children(".ladda-label");

      function resetForm() {
        // Reset form after 5s
        setTimeout(function() {
          btnText.html("Submit");
          $(form[0])[0].reset();
          validator.resetForm();
        }, 5000);
      }

      l.start();
      btnText.html("Sending...");

      $.post(form.attr('action'), form.serialize(), function(result) {
      }, 'json')
      .always(function() {
        l.stop();
        validator.disableSubmitButtons(true);
        btnText.html("Sent!");
        resetForm();
      });
    },
  });
});