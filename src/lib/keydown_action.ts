export function KeydownEventListener(
	domNode: HTMLElement,
	options: { key: string; callback: (event: KeyboardEvent) => void }
) {
	const handleKeydownEvent = async (event: KeyboardEvent) => {
		if (event.code === options.key) {
			options.callback(event);
		}
	};

	if (domNode) {
		domNode.addEventListener('keydown', handleKeydownEvent);
	}

	document.addEventListener('keydown', handleKeydownEvent);

	return {
		destroy() {
			if (domNode) {
				domNode.removeEventListener('keydown', handleKeydownEvent);
			}

			document.removeEventListener('keydown', handleKeydownEvent);
		}
	};
}
