import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { getMediaQueries } from './constants.js';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

class ScrollSmootherController {
  constructor(config) {
    this.smoothWrapper = config.smoothWrapper || '#smooth-wrapper';
    this.smoothContent = config.smoothContent || '#smooth-content';
    this.smoother = null;
    this.init();
  }

  createSmoother() {
    this.smoother = ScrollSmoother.create({
      wrapper: this.smoothWrapper,
      content: this.smoothContent,
      smooth: 2,
      effects: true,
      smoothTouch: 0.1,
    });
  }

  init() {
    this.createSmoother();

    const MediaQueryHover = getMediaQueries().isHover;

    MediaQueryHover.addEventListener('change', (mqEvent) => {
      if (!this.smoother) return;

      this.smoother.smooth(mqEvent.matches ? 2 : 0.1);
      this.smoother.refresh();
      ScrollTrigger.refresh(true);
    });
  }
}

export const layoutScrollSmoother = new ScrollSmootherController({
  smoothWrapper: '#smooth-wrapper',
  smoothContent: '#smooth-content',
});
