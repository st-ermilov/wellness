function reloadCartIcon() {
    fetch('/?sections=header', { cache: "no-store" })
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newIcon = doc.querySelector('#cart-icon-bubble .svg-wrapper');

            if (newIcon) {
                const oldIcon = document.querySelector('#cart-icon-bubble .svg-wrapper');
                if (oldIcon) {
                    oldIcon.innerHTML = newIcon.innerHTML;
                }
            }
        })
        .catch(error => console.error('Error fetching header content:', error));
}

document.addEventListener('click', (event) => {
    // Добавление товара в корзину через AJAX
    if (event.target.matches('.ajax-add-to-cart') || event.target.closest('.ajax-add-to-cart')) {
        setTimeout(reloadCartIcon, 300);  // Небольшая задержка, чтобы изменения успели сохраниться
    }

    // Удаление товара из корзины через AJAX
    if (event.target.matches('.ajax-remove-from-cart') || event.target.closest('.ajax-remove-from-cart')) {
        setTimeout(reloadCartIcon, 300);
    }

    // Очистка корзины
    if (event.target.matches('.icon-remove') || event.target.closest('.ajax-clear-cart')) {
        setTimeout(reloadCartIcon, 300);
    }
});