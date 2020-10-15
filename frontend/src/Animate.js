import anime from 'animejs/lib/anime.es.js';

const Animate = {
  openGameOverlay() {
    anime({
      targets: '.gameOverlayBackground',
      direction: 'reverse',
      easing: 'easeOutSine',
      translateY: 1000,
      duration: 500,
    });
  },

  closeGameOverlay() {
    anime({
      targets: '.gameOverlayBackground',
      easing: 'easeOutSine',
      translateY: 1000,
      duration: 500,
    });
  },

  openSearchResults() {
    anime({
      targets: '.searchResults',
      easing: 'easeOutSine',
      direction: 'reverse',
      opacity: 0,
      duration: 500,
    });
  },

  fadeInResultingGames() {
    anime({
      targets: '.resultingGames',
      easing: 'easeOutSine',
      direction: 'reverse',
      opacity: 0,
      duration: 300,
    });
  },

  closeSearchResults() {
    anime({
      targets: '.searchResults',
      easing: 'easeOutSine',
      opacity: 0,
      duration: 500,
    });
  },

  openFavs() {
    anime({
      targets: '.favsListBackground',
      easing: 'easeOutSine',
      direction: 'reverse',
      translateY: 1000,
      duration: 500,
    });
  },

  closeFavs() {
    anime({
      targets: '.favsListBackground',
      easing: 'easeOutSine',
      translateY: 1000,
      duration: 500,
    });
  },
};

export default Animate;
