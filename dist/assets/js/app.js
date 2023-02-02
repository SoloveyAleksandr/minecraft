document.addEventListener("DOMContentLoaded", () => {
  const MENU = document.querySelector('.menu');
  const MENU_CLOSE_BTN = document.querySelector('.menu-btn');
  const MENU_OPEN_BTN = document.querySelector('.header-menu-btn');
  const MENU_BG = document.querySelector('.menu-bg');

  const OPEN_FORM_BTNS = gsap.utils.toArray('[data-open-form]');
  const CLOSE_MENU_BTNS = gsap.utils.toArray('[data-close-menu]');
  const OPEN_SUBMIN_BTNS = gsap.utils.toArray('[data-open-submit]');

  class Dropdown {
    constructor(container) {
      this.btn = container.querySelector('.menu-nav-dropdown-btn');
      this.content = container.querySelector('.menu-nav-dropdown-content');

      this.init();
    }

    init() {
      this.maxH = this.content.children ? [...this.content.children].reduce((acc, item) => acc += item.scrollHeight * 2, 0) / 10 + "rem" : "0rem";
      this.btn.onclick = this.handleClick.bind(this);
      if (this.btn.getAttribute('data-open-default') !== null) {
        this.open();
      } else this.close();
    }

    handleClick() {
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

  MENU_OPEN_BTN && (MENU_OPEN_BTN.onclick = toggleMenu);
  MENU_CLOSE_BTN && (MENU_CLOSE_BTN.onclick = toggleMenu);
  MENU_BG && (MENU_BG.onclick = toggleMenu);

  CLOSE_MENU_BTNS.forEach(btn => {
    btn.addEventListener('click', toggleMenu)
  })

  class Modal {
    constructor(container) {
      this.container = document.querySelector(container);
      this.bg = this.container.querySelector('.modal-bg');
      this.btn = this.container.querySelector('.modal-btn');

      this.init();
    }

    init() {
      this.bg.onclick = this.closeModal.bind(this);
      this.btn.onclick = this.closeModal.bind(this);
    }

    openModal() {
      this.container.classList.add('_active');
    }

    closeModal() {
      this.container.classList.remove('_active');
    }
  }

  const FORM_MODAL = document.querySelector(".form-modal") ? new Modal('.form-modal') : null;
  const SUBMIT_MODAL = document.querySelector(".submit-modal") ? new Modal('.submit-modal') : null;

  OPEN_FORM_BTNS.forEach(btn => {
    FORM_MODAL &&
      (btn.addEventListener("click", () => {
        FORM_MODAL.openModal();
      }))
  })

  OPEN_SUBMIN_BTNS.forEach(btn => {
    (FORM_MODAL && SUBMIT_MODAL) &&
      (btn.addEventListener("click", () => {
        FORM_MODAL.closeModal();
        SUBMIT_MODAL.openModal();
      }))
  })

  // HEADER 
  if (document.querySelector(".header-nav-search")) {
    class Search {
      constructor() {
        this.wrapper = document.querySelector(".header-nav-search");
        this.container = this.wrapper.querySelector(".header-nav-search-input");
        this.btn = this.wrapper.querySelector(".header-nav-search-btn");
        this.input = this.wrapper.querySelector(".header-nav-search-input__input");
        this.init();
      }

      init() {
        this.btn.addEventListener("click", this.open.bind(this));
        this.wrapper.addEventListener("click", (e) => e.stopPropagation());
        document.addEventListener("click", this.close.bind(this));
      }

      open() {
        this.container.classList.add("_active");
        this.input.focus()
      }

      close() {
        this.container.classList.remove("_active");
        this.input.blur()
      }
    }

    new Search();
  }

  //<==

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
        this.maxH = this.content.children ? [...this.content.children].reduce((acc, item) => acc += item.clientHeight, 0) / 10 + "rem" : "0rem";
        this.dropdownChildren = [...this.dropdownChildrenContainers].reduce((acc, item) => {
          const newClass = new Dropdown(item);
          return [...acc, newClass];
        }, []);
        this.btn.onclick = this.handleClick.bind(this);
        if (this.btn.getAttribute('data-open-default') !== null) {
          this.open();
        } else this.close();
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
      }

      close(id) {
        if (this.items) {
          this.items.forEach(item => {
            if (item.id !== id) {
              item.close();
            }
          })
        }
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

  // ABOUT
  if (document.querySelector('.about-partners')) {
    const animContainers = gsap.utils.toArray('.about-partners-container');

    animContainers.forEach((container, index) => {
      const listClone = container.querySelector('.about-partners-list').cloneNode(true);
      container.appendChild(listClone);
      const animLists = [...container.querySelectorAll('.about-partners-list')];

      const speed = listClone.children.length * 2.5;
      const tl = gsap.timeline({
        repeat: -1,
      })
      animLists.forEach(list => {
        tl.to(list, {
          x: index % 2 ? "100%" : "-100%",
          duration: speed,
          ease: "none"
        }, 'sin')
      })
    })
  }
  //<==

  // CATALOG-NAV
  const catalogNavContainer = document.querySelector(".catalog-nav");
  const dropdownConteiners = gsap.utils.toArray(".catalog-nav-dropdown");

  if (catalogNavContainer) {
    class Dropdown {
      constructor(container) {
        this.container = container;
        this.btn = this.container.querySelector('.catalog-nav-dropdown-btn');
        this.content = this.container.querySelector('.catalog-nav-dropdown-content');
        this.isActive = false;
        this.init();
      }

      init() {
        this.maxHeight = (this.content.scrollHeight + this.content.children.length * 2 * 10) / 10 + "rem";
        this.btn.onclick = this.toggleActive.bind(this);
        if (this.container.getAttribute("data-open") !== null) {
          this.open();
        } else {
          this.close();
        }
      }

      toggleActive() {
        if (this.isActive) {
          this.close.call(this);
        } else {
          this.open.call(this);
        }
      }

      close() {
        this.container.classList.remove('_active');
        this.content.style.maxHeight = 0;
        // this.content.style.overflowY = "hidden";
        this.isActive = false;
      }

      open() {
        this.container.classList.add('_active');
        this.content.style.maxHeight = this.maxHeight;
        // this.content.style.overflowY = "auto";
        this.isActive = true;
      }
    }

    const catalogNavContent = catalogNavContainer.querySelector('.catalog-nav-inner');
    const catalogNavBtn = catalogNavContainer.querySelector('.catalog-nav-btn');
    const maxHeight = catalogNavContent.clientHeight / 10 + "rem";

    const toggleNav = () => {
      if (catalogNavContainer.classList.contains("_active")) {
        catalogNavContainer.classList.remove("_active");
        catalogNavContent.style.maxHeight = 0;
      } else {
        catalogNavContainer.classList.add("_active");
        catalogNavContent.style.maxHeight = maxHeight;
      }
    }

    const createDropDownBtns = () => {
      dropdownConteiners.forEach(container => {
        new Dropdown(container);
      })
    }

    if (window.matchMedia("(min-width: 1331px)").matches) {
      createDropDownBtns();
    } else {
      catalogNavContainer.classList.remove("_active");
      catalogNavContent.style.maxHeight = 0;
      catalogNavBtn.addEventListener("click", toggleNav);
      createDropDownBtns();
    }
  }
  //<==

  // PRODUCT
  if (document.querySelector(".product-swiper")) {
    const swiper = new Swiper(".product-swiper", {
      spaceBetween: 20,
      freeMode: true,
      navigation: {
        nextEl: '.reviews-btns__btn_next',
        prevEl: '.reviews-btns__btn_prev',
      },
      slidesPerView: 2,

      breakpoints: {
        1025: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        651: {
          slidesPerView: 3,
        }
      }
    })
  }
  //<==
})