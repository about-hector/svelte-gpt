/** Dispatch event on click outside of node */
export function clickOutside(node, exception) {

    const handleClick = (event: MouseEvent) => {
        if (node && !node.contains(event.target) && !event.defaultPrevented && event.target !== exception) {
            node.dispatchEvent(
                new CustomEvent('click_outside', node)
            );
        }
    }

    document.addEventListener('click', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        }
    }
}
