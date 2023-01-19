document.addEventListener("DOMContentLoaded", () => {
  // MAIN
  if (document.querySelector('.main-partners')) {
    const container = document.querySelector('.main-partners-list-container');
    const listNode = document.querySelector('.main-partners-list');
    container.appendChild(listNode.cloneNode(true));

    const animLists = gsap.utils.toArray('.main-partners-list');
    const speed = listNode.children.length * 2.5;
    const TL = gsap.timeline({
      repeat: -1,
    })

    animLists.forEach(list => {
      TL.to(list, {
        x: '-100%',
        ease: 'none',
        duration: speed,
      }, 'sin')
    });
  }

  if (document.querySelector('.main-contacts-info-swiper')) {
    const emirates = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28883.08863163467!2d55.26777586673055!3d25.190199407350896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f682829c85c07%3A0xa5eda9fb3c93b69d!2z0JTRg9Cx0LDQuSDQnNC-0LvQuw!5e0!3m2!1sru!2sby!4v1674122446125!5m2!1sru!2sby';
    const moscow = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2247.5111740058856!2d37.43057351608765!3d55.714868202384295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54fabbe68643b%3A0xd18eb6fead1bab76!2z0JPQttCw0YLRgdC60LDRjyDRg9C7LiwgNSwg0JzQvtGB0LrQstCwLCDQoNC-0YHRgdC40Y8sIDEyMTQ3MQ!5e0!3m2!1sru!2sby!4v1674116955080!5m2!1sru!2sby';
    const swiper = new Swiper('.main-contacts-info-swiper', {
      allowTouchMove: false,
    });

    const btns = gsap.utils.toArray('.main-contacts-info-btns__btn');
    const map = document.querySelector('.main-contacts-map__frame');
    const sources = [moscow, emirates];

    const handleClick = (i) => {
      swiper.slideTo(i);
      map.src = sources[i];
      btns.forEach((btn, index) => {
        btn.classList.remove('_active');
        index === i && btn.classList.add('_active');
      })
    }
    btns.forEach((btn, index) => {
      btn.onclick = () => handleClick(index);
    })
  }
  //<==
})