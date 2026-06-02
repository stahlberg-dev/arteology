export function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

export function throttle(func, delay) {
	let isThrottled = false;
	let savedArgs = null;
	let savedThis = null;

	return function throttledFunction(...args) {
		if (isThrottled) {
			savedArgs = args;
			savedThis = this;
			return;
		}
		
		func.apply(this, args);
		isThrottled = true;

		setTimeout(() => {
			isThrottled = false;

			if (savedArgs) {
				throttledFunction.apply(savedThis, savedArgs);
				savedArgs = null;
				savedThis = null;
			}
		}, delay);
	}
}
