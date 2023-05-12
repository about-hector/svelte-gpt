export function KeydownEventListener(_: HTMLElement, options: {key: string, callback: (event:KeyboardEvent) => void}) {

    const handleKeydownEvent = async (event: KeyboardEvent) => {
        if (event.code === options.key) {
            options.callback(event); 
        }
    }


    document.addEventListener('keydown', handleKeydownEvent);

    return {
        destroy() {
            document.removeEventListener('keydown', handleKeydownEvent);
        }
    };
}
