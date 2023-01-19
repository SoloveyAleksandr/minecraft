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

  if (document.querySelector('.main-reviews')) {
    const container = document.querySelector('.main-reviews-list-container');
    const listNode = document.querySelector('.main-reviews-list');
    container.appendChild(listNode.cloneNode(true));
    const animLists = gsap.utils.toArray('.main-reviews-list');
    const speed = listNode.children.length * 4;

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
  //<==
})