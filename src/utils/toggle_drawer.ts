import { isMenuOpen } from '../stores/menuStore.js';


export const toggleMenu = () => {
    const body = document.getElementById('page-body');
    
    isMenuOpen.update((current) => {
        const nextValue = !current;
        if (body && nextValue) {
            body.classList.add('no-scroll');
        } else if (body && !nextValue) {
            body.classList.remove('no-scroll');
        }
        return nextValue;
    });
} 
 
 export function handleClickOutsideEvent() { 
    toggleMenu();
}
