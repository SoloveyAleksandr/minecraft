document.addEventListener("DOMContentLoaded", () => {
  const MENU = document.querySelector('.menu');
  const MENU_CLOSE_BTN = document.querySelector('.menu-btn');
  const MENU_OPEN_BTN = document.querySelector('.header-menu-btn');
  const MENU_BG = document.querySelector('.menu-bg');

  class Dropdown {
    constructor(container) {
      this.btn = container.querySelector('.menu-nav-dropdown-btn');
      this.content = container.querySelector('.menu-nav-dropdown-content');

      this.init();
    }

    init() {
      this.maxH = [...this.content.children].reduce((acc, item) => acc += item.clientHeight, 0) / 10 + "rem";
      this.btn.onclick = this.handleClick.bind(this);
      this.close();
    }

    handleClick() {
      console.log('click')
      if (this.btn.classList.contains('_active')) {
        this.close();
      } else {
        this.open();
      }
    }

    close() {
      this.btn.classList.remove('_active');
      this.content.style.maxHeight = 0;
    }

    open() {
      this.btn.classList.add('_active');
      this.content.style.maxHeight = this.maxH;
    }
  }

  function toggleMenu() {
    MENU.classList.toggle('_active');
  }

  MENU_OPEN_BTN.onclick = toggleMenu;
  MENU_CLOSE_BTN.onclick = toggleMenu;
  MENU_BG.onclick = toggleMenu;

  // MENU
  if (MENU) {
    class MenuContainer {
      constructor(container, id, closeTrigger) {
        this.id = id;
        this.closeTrigger = closeTrigger;
        this.btn = container.querySelector('.menu-nav__btn');
        this.content = container.querySelector('.menu-nav-item-content');
        this.dropdownChildrenContainers = this.content.querySelectorAll('.menu-nav-dropdown');
        this.init();
      }

      init() {
        this.maxH = [...this.content.children].reduce((acc, item) => acc += item.clientHeight, 0) / 10 + "rem";
        this.dropdownChildren = [...this.dropdownChildrenContainers].reduce((acc, item) => {
          const newClass = new Dropdown(item);
          return [...acc, newClass];
        }, []);
        this.btn.onclick = this.handleClick.bind(this);
      }

      handleClick() {
        if (this.btn.classList.contains('_active')) {
          this.close();
        } else {
          this.open();
        }
      }

      open() {
        this.closeTrigger(this.id);
        this.btn.classList.add('_active');
        this.content.classList.add('_active');
        this.content.style.maxHeight = this.maxH;
      }

      close() {
        this.btn.classList.remove('_active');
        this.content.style.maxHeight = 0;
        this.content.classList.remove('_active');
        this.dropdownChildren.forEach(item => {
          item.close();
        })
      }
    }

    class MenuController {
      constructor(items) {
        this.items = items.reduce((acc, item, index) => [...acc, new MenuContainer(item, index, this.close.bind(this))], []);
        this.init();
      }

      init() {
        this.items.forEach(item => item.close())
      }

      close(id) {
        this.items.forEach(item => {
          if (item.id !== id) {
            item.close();
          }
        })
      }
    }

    const items = gsap.utils.toArray('.menu-nav-item');

    new MenuController(items);
  }
  //<==


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
    const swiper = new Swiper('.main-contacts-info-swiper', {
      allowTouchMove: false,
    });

    const btns = gsap.utils.toArray('.main-contacts-info-btns__btn');
    const map = document.querySelector('.main-contacts-map__frame');

    const handleClick = (btn, i) => {
      swiper.slideTo(i);
      map.src = btn.getAttribute('data-src');
      btns.forEach((btn, index) => {
        btn.classList.remove('_active');
        index === i && btn.classList.add('_active');
      })
    }
    btns.forEach((btn, index) => {
      btn.onclick = () => handleClick(btn, index);
    })
  }
  //<==

  // ADVANTAGES
  if (document.querySelector('.advantages')) {
    const items = gsap.utils.toArray('.advantages-list-item').reverse();;
    const mainTL = gsap.timeline({
      scrollTrigger: {
        start: "top 50%",
        end: "bottom 50%",
        trigger: '.advantages',
        toggleActions: "play none none reverse",
      }
    });

    items.forEach((item, index) => {
      mainTL.from(item, {
        x: "-=50vw",
        opacity: 0,
        duration: 1.8,
        delay: index * 0.5
      }, 'sin')
    })
  }
  //<==

  // REVIEWS
  if (document.querySelector('.reviews-list-container')) {
    const swiper = new Swiper('.reviews-list-container', {
      spaceBetween: 20,
      freeMode: true,
      navigation: {
        nextEl: '.reviews-btns__btn_next',
        prevEl: '.reviews-btns__btn_prev',
      },
      grid: {
        rows: 2,
      },
      slidesPerView: 2,

      breakpoints: {
        501: {
          grid: {
            fill: 'row',
            rows: 1
          },
          spaceBetween: 30,
          slidesPerView: 'auto',
        }
      }
    })
  }
  //<==
})