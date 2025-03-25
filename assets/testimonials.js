document.addEventListener('DOMContentLoaded', createReviewCard)
document.addEventListener('shopify:section:load', createReviewCard)

function createReviewCard() {
    const reviewContainer = document.querySelector('#reviews-wrapper')
    const reviewCardTemplate = document.querySelector('.review-card-template')
    const swiperWrapper = document.querySelector('#testimonial-swiper')

    swiperWrapper.innerHTML = ""

    let reviews = reviewContainer.getAttribute('data-reviews')

    try {
        reviews = JSON.parse(reviews)
    } catch (error) {
        console.log(`Error of parsing JSON-file: ${error}`)
    }

    if (!Array.isArray(reviews) || reviews.length === 0) {
        swiperWrapper.innerHTML = '<p>No reviews yet</p>'
        return;
    }

    const randomReviews = [...reviews].sort(() => 0.5 - Math.random()).slice(0, 3)

    randomReviews.forEach((testimonial) => {
        const reviewCard = reviewCardTemplate.content.cloneNode(true)

        reviewCard.querySelector('.product-title').textContent = testimonial.product
        reviewCard.querySelector('.review-card-avatar').src = testimonial.avatar_url
        reviewCard.querySelector('.customer_name').textContent = testimonial.author
        reviewCard.querySelector('.review-text').textContent = testimonial.comment


        const ratingHTML = generateRatingHTML(testimonial.rating, testimonial.total_reviews);

        reviewCard.querySelector('.review-card-header').insertAdjacentHTML('beforeend', ratingHTML)

        swiperWrapper.appendChild(reviewCard)

        function generateRatingHTML(rating, totalReviews, ratingMax = 5) {

            let ratingDecimal = 0;
            let decimal = rating % 1;

            if (decimal >= 0.3 && decimal <= 0.7) {
                ratingDecimal = 0.5;
            } else if (decimal > 0.7) {
                ratingDecimal = 1;
            }

            return `
            <div class="product-rating">
            <div class="rating-block">
                <div class="rating" role="img" aria-label="Оценка: ${rating} из ${ratingMax}">
                    <span class="rating-star" 
                          style="--rating: ${Math.floor(rating)}; 
                                 --rating-max: ${ratingMax}; 
                                 --rating-decimal: ${ratingDecimal};">
                    </span>
                </div>
                <p class="rating-text caption">
                    <span aria-hidden="true">${rating} / ${ratingMax}</span>
                </p>
                <p class="rating-count caption">
                    <span aria-hidden="true" class="rating-count-total-reviews">(${totalReviews})</span>
                    <span class="visually-hidden">${totalReviews} отзывов</span>
                </p>
            </div>
        </div>
            `
        }
    })

    // initializeSwiper()
    // console.log('Test')
}


function initializeSwiper() {
    const swiperElement = document.querySelector('.swiper');

    if (!swiperElement) {
        console.log('Error: Swiper container not found');
        return;
    }

    if (swiperElement.swiper) {
        swiperElement.swiper.destroy(true, true);
    }


    new Swiper('.reviews-slider', {
        slidesPerView: 1,
        loop: false,
        freeMode: false,
        draggable: true,
        spaceBetween: 10,
        slidesPerGroup: 1,
        observeParents: true,
        mousewheel: {
            invert: false,
            forceToAxis: true,
            releaseOnEdges: true,
            sensitivity: 1,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: false
        },
        breakpoints: {
            1024: {
                slidesPerView: 3,
                spaceBetween: 50
            },
        }
    })

    console.log('Review Swiper initialized');
}