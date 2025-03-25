document.addEventListener('DOMContentLoaded', function () {
    menuToggle()
    menuCreate()
    initializeShopSwiper()
})


const headerSubsection = document.querySelector('.header-mega-menu-subsection')
const shopSlider = document.querySelector('.header-mega-menu-subsection__shop-slider-swiper')
const learnSlider = document.querySelector('.header-mega-menu-subsection__learn-slider-swiper')

function menuToggle() {
    const learnBtn = document.querySelector('#HeaderMenu-Learn')
    const shopBtn = document.querySelector('#HeaderMenu-Shop')

    learnBtn.addEventListener('click', function () {
        const isLearnOpen = learnSlider.classList.contains('open-learn');
        const isShopOpen = shopSlider.classList.contains('open-shop');

        if (isShopOpen) {
            shopSlider.classList.remove('open-shop');
        }

        if (isLearnOpen) {
            learnSlider.classList.remove('open-learn');
            headerSubsection.classList.remove('open');
        } else {
            learnSlider.classList.add('open-learn');
            headerSubsection.classList.add('open');
        }
    });

    shopBtn.addEventListener('click', function () {
        const isLearnOpen = learnSlider.classList.contains('open-learn');
        const isShopOpen = shopSlider.classList.contains('open-shop');

        if (isLearnOpen) {
            learnSlider.classList.remove('open-learn');
        }

        if (isShopOpen) {
            shopSlider.classList.remove('open-shop');
            headerSubsection.classList.remove('open');
        } else {
            shopSlider.classList.add('open-shop');
            headerSubsection.classList.add('open');
        }
    });


}


function menuCreate() {
    const menu = document.querySelector('.header-mega-menu-subsection__learn-slider-swiper')
    const sliderLearnMenu = document.querySelector('.header-mega-menu-subsection__learn-item-wrapper')
    let menuData = menu.getAttribute('data-menu')


    try {
        menuData = JSON.parse(menuData)
    } catch (error) {
        console.error('Problem with loading: ' + error)
    }

    if (!Array.isArray(menuData) || menuData.length === 0) {
        sliderMenu.innerHTML = `<p>Menu not found</p>`
    }

    menuData.forEach((point) => {
        const slide = document.createElement('div')
        slide.classList.add('mega-slide', 'swiper-slide')

        slide.innerHTML = `
                        <a href="${point.link}" class="mega-slide-link">
                            <img src="${point.image}" alt="${point.title}" class="mega-slide-img">
                            <span class="mega-slide-title">${point.title}</span>
                        </a>`;

        sliderLearnMenu.appendChild(slide)
    })
    initializeLearnSwiper()
}

function initializeLearnSwiper() {
    const swiperElement = document.querySelector('.swiper');

    if (!swiperElement) {
        console.log('Error: Swiper container not found');
        return;
    }

    if (swiperElement.swiper) {
        swiperElement.swiper.destroy(true, true);
    }

    new Swiper('.header-mega-menu-subsection__learn-slider-swiper', {
        slidesPerView: 5,
        freeMode: false,
        draggable: true,
        spaceBetween: 24,
        slidesPerGroup: 1,
        observeParents: true,
        mousewheel: {
            invert: false,
            forceToAxis: true,
            releaseOnEdges: true,
            sensitivity: 1,
        },
    })

    console.log('Learn-Menu Swiper initialized');
}

function initializeShopSwiper() {
    const swiperElement = document.querySelector('.swiper');

    if (!swiperElement) {
        console.log('Error: Swiper container not found');
        return;
    }

    if (swiperElement.swiper) {
        swiperElement.swiper.destroy(true, true);
    }

    new Swiper('.header-mega-menu-subsection__shop-slider-swiper', {
        slidesPerView: 5,
        freeMode: false,
        draggable: true,
        spaceBetween: 24,
        slidesPerGroup: 1,
        observeParents: true,
        mousewheel: {
            invert: false,
            forceToAxis: true,
            releaseOnEdges: true,
            sensitivity: 1,
        },
    })

    console.log('Shop-Menu Swiper initialized');
}

