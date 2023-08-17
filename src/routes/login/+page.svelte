<script>
    import { signIn } from "@auth/sveltekit/client";
    import SvelteLogo from "./svelteLogo.svelte";
	import LogoGoogle from "./LogoGoogle.svelte";
	import LogoGithub from "./LogoGithub.svelte";
</script>




<h1 class='flex items-center text-4xl font-bold mb-8'>
    <SvelteLogo />-GPT
</h1>

<div class="flex flex-col gap-2 rounded-md p-2">
<button 
    class='flex items-center gap-4 rounded-md bg-gray-200 px-3 py-2 text-black'
    on:click={() => signIn('google', { callbackUrl: '/'})}>
    <LogoGoogle />
    Continue with Google </button>
<button 
    class='flex items-center gap-4 rounded-md bg-gray-200 px-3 py-2 text-black'
    on:click={() => signIn('github', { callbackUrl: '/'})}>
    <LogoGithub />
    Continue with Github </button>

</div>
