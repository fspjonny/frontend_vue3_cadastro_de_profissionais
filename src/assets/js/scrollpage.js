export function scrollToAnchor(anchor) {
    const element = document.getElementById(anchor)
    if (element) {
      const offset = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: offset,
        behavior: 'smooth',
        });
    }
  }