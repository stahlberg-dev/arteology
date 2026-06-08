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

    callBacks.forEach(callBack => {
      if (typeof callBack === 'function') {
        callBack();
      }
    });
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

    callBacks.forEach(callBack => {
      if (typeof callBack === 'function') {
        callBack();
      }
    });
  }
}
