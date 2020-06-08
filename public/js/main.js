$(document).ready(function () {
    // -------Change navbar color when page scrolled-------

    var htmlTag = document.getElementsByTagName('html')[0];

    function changeClass() {
        if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
            htmlTag.className = "scroll";
        } else {
            htmlTag.className = "";
        }
    }

    window.onscroll = function () {
        changeClass();
    }

    // -------Accordion-------

    $('.collapse').on('shown.bs.collapse', function () {
        $(this).prev().addClass('active');
    });

    $('.collapse').on('hidden.bs.collapse', function () {
        $(this).prev().removeClass('active');
    });

    // -------owl carousel start-------

    $('.product-carousel').owlCarousel({ // featured cars section
        stagePadding: 50,
        margin: 15,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: false,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 3
            }
        }
    });

    $('.testi-carousel').owlCarousel({ // costumer feedback section
        stagePadding: 50,
        margin: 15,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 450,
        margin: 20,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            991: {
                items: 3
            },
            1200: {
                items: 3
            },
            1920: {
                items: 3
            }
        }
    });

    // -------owl carousel end-------

    // -------contact form validation start-------

    $("#ajax-contact").validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            subject: {
                required: true,
                minlength: 3
            },
            message: {
                required: true,
                minlength: 10
            }
        },
        messages: {
            name: {
                name: "Name is required",
                minlength: "Name must be long than 2 characters"
            },

            email: {
                required: "We need your email address to contact you",
                email: "Your email address must be in the format of name@domain.com"
            },

            subject: {
                required: "Subject is required",
                minlength: "Your subject must be long than 3 characters"
            },
            message: {
                required: "Please, leave us a message",
                minlength: "Message must be long than 10 characters"
            }
        }
    })

    // -------contact form validation end-------

    // -------Scroll to top start-------

    // show and hide scroll-top icon when page scrolled
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 600) {
            $('.scroll-top').removeClass('not-visible');
        } else {
            $('.scroll-top').addClass('not-visible');
        }
    });

    $('.scroll-top').on('click', function (event) {
        $('html,body').animate({
            scrollTop: 0
        }, 1000);
    });

    // -------Scroll to top end-------

    // remove focus effect from buttons when hover on them
    $('.btn').mouseup(function () {
        this.blur();
    });


    // ---------------------checkbox settings---------------------
    var carImage = $(".car-item");
    carImage.click(
        function () {
            var checkboxControl = $(this).find('input:checkbox[name=car-select-input]');
            // set "checked" the checkbox by clicking any side of car item
            checkboxControl.prop('checked', !checkboxControl.is(':checked'));

            var inputCheck = $(".car-item").find('input:checkbox[name=car-select-input]');
            // if a checkbox is checked
            if (inputCheck.filter(':checked').length >= 1) {
                // disable multiple check
                inputCheck.not(checkboxControl).prop('checked', false);

                // and then get checkbox value
                var cbxVal = checkboxControl.val();
                $(".choice-result").addClass("active");
                $(".choice-result").removeClass("hidden");
                // write the brand name in to the choice result area
                $(".choice-result h2").text(cbxVal);
                $(".active h5").text("Your Choice");

                // when a checkbox is unchecked
            } else if (inputCheck.not(':checked').length) {
                $(".choice-result").removeClass("active");
                $(".choice-result").addClass("hidden");
                $(".hidden h5").text("You have not selected anything yet");
            }
        });

    //------------------Bootstrap Modal-----------

    //disable background scroll while modal is active
    $('.modal').on('shown.bs.modal', function (e) {
        $('html').addClass('freezePage');
        $('body').addClass('freezePage');
    });
    $('.modal').on('hidden.bs.modal', function (e) {
        $('html').removeClass('freezePage');
        $('body').removeClass('freezePage');
    });

    //--------------------- credit card cvv information bubble activator---------------------
    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });







});