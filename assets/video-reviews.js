document.addEventListener('DOMContentLoaded', createTextReviewsSlide)
document.addEventListener('shopify:section:load', createTextReviewsSlide)

document.addEventListener('DOMContentLoaded', createVideoReviewSlide)
document.addEventListener('shopify:section:load', createVideoReviewSlide)

document.addEventListener('DOMContentLoaded', createFancyboxVideoReviews);
document.addEventListener('shopify:section:load', createFancyboxVideoReviews)


function createTextReviewsSlide() {
    const textReviewsCardTemplate = document.querySelector('.text-reviews-slider__slide-template')
    const textReviewsSlider = document.querySelector('.text-reviews-slider.swiper-wrapper')
    const dataElement = document.querySelector('.video-reviews-wrapper')

    let dataReviews = dataElement.getAttribute('data-video-reviews')

    try {
        dataReviews = JSON.parse(dataReviews)
    } catch (error) {
        console.log(`We have a trouble with download text-review data: ${error}`)
    }

    if (!Array.isArray(dataReviews) || dataReviews.length === 0) {
        textReviewsSlider.innerHTML = `<p>Reviews not found</p>`
    }

    dataReviews.forEach((review) => {
        const textReviewSlide = textReviewsCardTemplate.content.cloneNode(true)

        textReviewSlide.querySelector('.text-review').textContent = `"${review.text}"`
        textReviewSlide.querySelector('.text-review-author').textContent = review.author

        textReviewsSlider.appendChild(textReviewSlide)
    })


}

function createVideoReviewSlide() {
    const videoReviewCardTemplate = document.querySelector('.video-review-card-template')
    const videoReviewsSlider = document.querySelector('.video-reviews-slider-wrapper.swiper-wrapper')
    const dataElement = document.querySelector('.video-reviews-wrapper')

    let dataReviews = dataElement.getAttribute('data-video-reviews')

    try {
        dataReviews = JSON.parse(dataReviews)
    } catch (error) {
        console.log(`We have a trouble with download video-review data: ${error}`)
    }

    if (!Array.isArray(dataReviews) || dataReviews.length === 0) {
        videoReviewsSlider.innerHTML = `<p>Reviews not found</p>`
    }

    dataReviews.forEach((review) => {
        const videoReviewSlide = videoReviewCardTemplate.content.cloneNode(true)

        videoReviewSlide.querySelector('.video-review-text').textContent = `"${review.text}"`
        videoReviewSlide.querySelector('.video-review-author').textContent = review.author
        videoReviewSlide.querySelector('.video-review-link').href = review.video
        videoReviewSlide.querySelector('.video-review-preview').src = review.poster
        videoReviewSlide.querySelector('.custom-play-btn').href = review.video

        videoReviewsSlider.appendChild(videoReviewSlide)
    })
}


const textReviewSlider = new Swiper('.video_reviews__text-reviews-slider', {
    slidesPerView: 1,
    spaceBetween: 10,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    centeredSlides: true,
    freeMode: false,
    draggable: true,
    observeParents: true,
    mousewheel: {
        invert: false,
        forceToAxis: true,
        releaseOnEdges: true,
        sensitivity: 1,
    }
});


const videoSlider = new Swiper('.video-reviews-slider', {
    slidesPerView: 1.2,
    initialSlide: 1,
    centeredSlides: true,
    loop: true,
    freeMode: false,
    draggable: true,
    spaceBetween: 10,
    slidesPerGroup: 1,
    // observeParents: true,
    mousewheel: {
        invert: false,
        forceToAxis: true,
        releaseOnEdges: true,
        sensitivity: 1,
    },
    pagination: {
        el: '.video-reviews-slider-pagination',
        clickable: true,
        dynamicBullets: false
    },
    on: {
        init: function () {
            setTimeout(() => {
                this.update();
                this.slideToLoop(0, 0, false); // Принудительно ставим на 1-й слайд (по loop-индексу)
            }, 50);
        }
    },
    breakpoints: {
        1024: {
            slidesPerView: 1.9,
            initialSlide: 0,
            centeredSlides: false,
            loop: false,
            freeMode: false,
            draggable: true,
            spaceBetween: 48,
            slidesPerGroup: 1,
            observeParents: true,
            mousewheel: {
                invert: false,
                forceToAxis: true,
                releaseOnEdges: true,
                sensitivity: 1,
            },
            navigation: {
                prevEl: '.video-reviews-slider-button-prev',
                nextEl: '.video-reviews-slider-button-next'
            },
            thumbs: {
                swiper: textReviewSlider,
                autoScrollOffset: 1
            },
        }
    }
})


function createFancyboxVideoReviews() {
    Fancybox.bind("[data-fancybox='video-reviews']", {
        Thumbs: false, // Отключаем мини-превью
        Toolbar: {
            display: ['close'], // Показываем только кнопку "Закрыть"
        },
        youtube: {
            controls: 1, // Включаем управление
            autoplay: 1 // Видео запускается сразу
        },
    })

    console.log('Fancybox инициализирован!')
}



