$('.menu-shop-slider').slick({
    dots: false,
    infinite: false,
    arrow:true,

    speed: 300,

    slidesToShow: 2,

    slidesToScroll: 1,

    responsive: [

        {

            breakpoint: 1024,

            settings: {

                slidesToShow: 4,

                slidesToScroll: 1,

                infinite: true,

                dots: false

            }

        },

        {

            breakpoint: 600,

            settings: {

                slidesToShow: 2,

                slidesToScroll: 2

            }

        },

        {

            breakpoint: 480,

            settings: {

                slidesToShow: 1,

                slidesToScroll: 1

            }

        }

    ]

});