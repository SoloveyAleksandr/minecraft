document.addEventListener("DOMContentLoaded", () => {
  // MAIN
  if (document.querySelector('.main-partners-swiper')) {
    const swiper = new Swiper('.main-partners-swiper', {
      effect: 'slide',
      slidesPerView: 6,
      direction: 'horizontal',
      spaceBetween: 30,
      autoplay: true,
      loop: true,
      freeMode: true,
    })
  }

  new Swiper('.swiper', {})
  //<==
})