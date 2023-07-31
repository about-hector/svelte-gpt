<script lang='ts'>

import { Drawer } from 'ui/ui-primitives/drawer';
let isOpen = false; 

</script>

<div id='wrapper' class='flex justify-center items-center mx-auto h-full'>
<Drawer.Root >
<Drawer.Trigger 
    class='rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
>
        Open drawer
</Drawer.Trigger>
<Drawer.Portal>
<Drawer.Overlay class='fixed inset-0 bg-black/40' />
    <Drawer.Content class='bg-gray-100 flex flex-col rounded-t-[10px] h-full mt-24 max-h-[96%] fixed bottom-0 left-0 right-0'>
        diocan areo
    </Drawer.Content>
</Drawer.Portal>
</Drawer.Root>
</div>
