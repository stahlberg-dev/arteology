import { ScrollTrigger, ScrollSmoother, } from './helpers/gsap.js';
import { getMediaQueries } from './helpers/constants.js';

class ScrollSmootherController {
  constructor(config) {
    this.smoothWrapper = config.smoothWrapper || '#smooth-wrapper';
    this.smoothContent = config.smoothContent || '#smooth-content';
    this.smoother = null;
    this.init();
  }

  createSmoother(isHoverMatched) {
    this.smoother = ScrollSmoother.create({
      wrapper: this.smoothWrapper,
      content: this.smoothContent,
      smooth: isHoverMatched ? 2 : 0.001,
      effects: true,
      smoothTouch: 0.001,
    });
  }

  init() {
    const MediaQueryHover = getMediaQueries().isHover;

    this.createSmoother(MediaQueryHover.matches);

    MediaQueryHover.addEventListener('change', (mqEvent) => {
      if (!this.smoother) return;

      this.smoother.smooth(mqEvent.matches ? 2 : 0.001);
      this.smoother.refresh();
      setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 100);
    });
  }
}

export const layoutScrollSmoother = new ScrollSmootherController({
  smoothWrapper: '#smooth-wrapper',
  smoothContent: '#smooth-content',
});
