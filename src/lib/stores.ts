import { writable } from 'svelte/store';
import { DEFAULT_GPT_MODEL } from './costants';


// chat-tree
export const messageTree = writable([]); 


export const chatId = writable<string | null>(null);



//type Model = 'gpt-3.5-turbo' | 'gpt-4'
export const gptModel = writable(DEFAULT_GPT_MODEL);
export const isMenuOpen = writable(false);


export const activeChat = writable<string | null>(null);

interface IChat {
    id: string, 
    title: string
}

export const previousChats = writable<IChat[]>([]);


interface IToast {
    id: string,
    title?: string,
    message: string,
    icon?: string,
    type: 'warning' | 'success' | 'error' | 'neutral'
}

// type can be success, warning, danger, neutral
function createToast() {
    const { subscribe, set, update } = writable<IToast[]>([]);

    return {
        subscribe,
        addToast: ({ title, message, icon, type }: IToast) => update((current) => {
            current.push({
                id: crypto.randomUUID(),
                title: title,
                message: message,
                icon: icon,
                type: type
            })
            return current
        }), 
        removeToast: (id) => update((current) => {
            const nextStore = current.filter((toast) => {
                return toast.id !== id;
            })

            return nextStore;
        }),
        reset: () => set([])

    }
}


export const toasts = createToast();

