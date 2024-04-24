export function mockable(fn) {
	if (process.env.NODE_ENV === 'production') {
		return fn;
	}

	let impl = undefined;

	// call impl or the original function, based on if impl is set
	const wrap = function (...args) {
		if (impl) {
			return impl(...args);
		} else {
			return fn(...args);
		}
	};

	// attach an override function to wrap
	wrap.override = function (mock) {
		impl = mock;
		return mock;
	};

	wrap.clear = function () {
		impl = undefined;
	};

	return wrap;
}
