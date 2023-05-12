/** Dispatch event on click outside of node */
export function clickOutside(node: HTMLElement, exception) {

    const handleClick = (event: MouseEvent) => {
        if (node && !node.contains(event.target) && !event.defaultPrevented && event.target !== exception) {
            node.dispatchEvent(
                new CustomEvent('click_outside', node)
            );
            console.log(event.target)
        }
    }

    document.addEventListener('click', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        }
    }
}
