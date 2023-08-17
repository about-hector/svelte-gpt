<script>
    import { signIn } from "@auth/sveltekit/client";
    import SvelteLogo from "./svelteLogo.svelte";
</script>




<h1 class='flex items-center text-4xl font-bold mb-8'>
    <SvelteLogo />-GPT
</h1>

<div class="flex flex-col gap-2 rounded-md p-2">
<button 
    class='rounded-md bg-gray-200 px-3 py-2 text-black'
    on:click={() => signIn('google', { callbackUrl: '/'})}>Continue with Google </button>
<button 
    class='rounded-md bg-slate-950 px-3 py-2'
    on:click={() => signIn('github', { callbackUrl: '/'})}>Continue with Github </button>

</div>
