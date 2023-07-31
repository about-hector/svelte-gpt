import Root from './root.svelte';
export type { DrawerRootProps } from './root.svelte';
import Portal from './portal.svelte';
export type { DrawerPortalProps } from './portal.svelte';
import Trigger from './trigger.svelte';
export type { DrawerTriggerProps } from './trigger.svelte';
import Content from './content.svelte';
export type { DrawerContentProps } from './content.svelte';
import Close from './close.svelte';
export type { DrawerCloseProps } from './close.svelte';
import Overlay from './overlay.svelte';
export type { DrawerOverlayProps } from './overlay.svelte';
import Title from './title.svelte';
export type { DrawerTitleProps } from './title.svelte';
import Description from './description.svelte';
export type { DrawerDescriptionProps } from './description.svelte';

export const Drawer = {
	Root,
	Portal,
	Trigger,
	Content,
	Close,
	Overlay,
	Title,
	Description,
};
