import { layoutScrollSmoother } from '../layoutScrollSmoother.js';

export class Popup {
  constructor(config) {
    this.animationTime = config.animationTime ?? 0;
  }

  open(currentPopup, ...callBacks) {
    if (!currentPopup) {
      return;
    }

    const activePopups = document.querySelectorAll('.popup-active');

    layoutScrollSmoother.smoother.paused(true);
    
    activePopups.forEach(activePopup => {
      activePopup.classList.remove('popup-active');
    });
    
    currentPopup.classList.add('popup-active');
    currentPopup.style.pointerEvents = 'none';

    callBacks.forEach(callBack => {
      if (typeof callBack === 'function') {
        callBack();
      }
    });

    setTimeout(() => {
      currentPopup.style.pointerEvents = '';
    }, this.animationTime * 2);
  }

  close(currentPopup, ...callBacks) {
    const isPointerDisabled = document.body.classList.contains('disable-pointer');

    if (!currentPopup || isPointerDisabled) {
      return;
    }

    const isCurrentPopupOpened = currentPopup.classList.contains('popup-active');

    if (!isCurrentPopupOpened) {
      return;
    }

    currentPopup.classList.remove('popup-active');

    layoutScrollSmoother.smoother.paused(false);
    document.body.style.pointerEvents = 'none';

    callBacks.forEach(callBack => {
      if (typeof callBack === 'function') {
        callBack();
      }
    });

    setTimeout(() => {
      document.body.style.pointerEvents = '';
    }, this.animationTime * 2);
  }
}
