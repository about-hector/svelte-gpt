type TCharType = 'space' | 'number' | 'uppercase' | 'lowercase' | 'symbol';

export function isDomElement(input: any) {
	return !!input && input.nodeType === 1 && input instanceof Element === true;
}

export function dataShuffle(domElement: HTMLElement, config = {}) {
	const defaultOptions = {
		text: '',
		iterations: 8,
		fps: 30,
		onComplete: () => void 0
	};

	const options = {
		...defaultOptions,
		...config
	};

	//verify the dom domElement is in fact a dom domElement
	if (!isDomElement(domElement)) {
		throw new Error(`Can't use this function on this element, provide a valid HTML element.`);
	} else if (!domElement.textContent) {
		throw new Error(`The dom element has no text content`);
	}

	// the user might want to use a specific string by passing it into the options
	const charsArray =
		options.text && typeof options.text === 'string'
			? options.text.split('')
			: domElement.textContent.split('');

	const arrayCharacterTypes: TCharType[] = [];
	const arrayCharacterPositions = [];

	for (let i = 0; i < charsArray.length; ++i) {
		const char = charsArray[i];

		if (/\s/.test(char)) {
			arrayCharacterTypes[i] = 'space';
			continue;
		} else if (/[a-z]/.test(char)) {
			arrayCharacterTypes[i] = 'lowercase';
		} else if (/[A-Z]/.test(char)) {
			arrayCharacterTypes[i] = 'uppercase';
		} else {
			arrayCharacterTypes[i] = 'symbol';
		}

		arrayCharacterPositions.push(i);
	}

	domElement.textContent = '';

	let timeoutID: NodeJS.Timeout | null = null;
	(function shuffle(start) {
		const charsArrayCopy = [...charsArray];
		const charsPositionsLength = arrayCharacterPositions.length;

		if (start > charsPositionsLength && typeof options.onComplete === 'function') {
			//console.log('Animation ended: running onComplete()', options.onComplete);
			options.onComplete();
			return;
		}

		for (let i = Math.max(start, 0); i < charsPositionsLength; i += 1) {
			if (i < start + options.iterations) {
				charsArrayCopy[arrayCharacterPositions[i]] = randomChar(
					arrayCharacterTypes[arrayCharacterPositions[i]]
				);
			} else {
				charsArrayCopy[arrayCharacterPositions[i]] = '';
			}
		}

		domElement.textContent = charsArrayCopy.join('');

		if (timeoutID) {
			clearTimeout(timeoutID as NodeJS.Timeout);
		}

		timeoutID = setTimeout(() => {
			shuffle(start + 1);
		}, 1000 / options.fps);
	})(-options.iterations);

    //why don't you run brother, is it because of the return after options.onComplete() ? yes it is you sneaky animal.
    //TODO: delete the timeout and verify it is in fact deleted
	return () => {
		clearTimeout(timeoutID as NodeJS.Timeout);
		timeoutID = null;
		console.log('animation finished');
	};
}

export function randomChar(type: TCharType): string {
	let pool = '';

	if (type == 'lowercase') {
		pool = 'abcdefghijklmnopqrstuvwxyz0123456789';
	} else if (type == 'uppercase') {
		pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	} else if (type === 'symbol') {
		pool = ',.?/\\(^)![]{}*&^%$#\'"';
	} else if (type === 'number') {
		pool = ',.?/\\(^)![]{}*&^%$#\'"0123456789';
	}

	const arrayOfCharacters = pool.split('');
	return arrayOfCharacters[Math.floor(Math.random() * arrayOfCharacters.length)];
}
