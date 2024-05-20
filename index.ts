type MockableFunction = (...args: any[]) => any;
type MockFunction = (...args: any[]) => any;

export function mockable<T extends MockableFunction>(original: T) {
	if (typeof original !== 'function') {
		throw new Error('mockable() only works with functions');
	}
	if (process.env.NODE_ENV === 'production') {
		return original;
	}

	let impl: MockableFunction | undefined = undefined;

	// call impl or the original function, based on if impl is set
	const wrap = function (...args: any[]) {
		if (impl) {
			return impl(...args);
		} else {
			return original(...args);
		}
	};

	// attach an override function to wrap
	wrap.override = function (mock: MockFunction) {
		impl = mock;
		return mock;
	};

	wrap.clear = function () {
		impl = undefined;
	};

	return wrap as unknown as T;
}
