<script>
	import { signIn } from "@auth/sveltekit/client";


	import LogoGithub from "./LogoGithub.svelte";
	import LogoGoogle from "./LogoGoogle.svelte";
	import SvelteLogo from "./svelteLogo.svelte";
    import gptOrange from '$lib/assets/gpt-orange.png'



</script>
	<!-- sign in card starts here -->
	<div class="{$$props.class || ''} relative border border-slate-950/10 rounded-xl p-3 flex flex-col items-center text-black">
		<h3 class="flex items-center text-4xl font-bold mb-4">
			<SvelteLogo />-GPT
		</h3>
		<div class="flex flex-col gap-2 rounded-md p-2">
			<button
				class="flex items-center gap-4 rounded-md bg-gray-200 px-3 py-2 text-black"
				on:click={() => signIn('google', { callbackUrl: '/' })}
			>
				<LogoGoogle />
				Continue with Google
			</button>
			<button
				class="flex items-center gap-4 rounded-md bg-gray-200 px-3 py-2 text-black"
				on:click={() => signIn('github', { callbackUrl: '/' })}
			>
				<LogoGithub />
				Continue with Github
			</button>
	<img
			alt="orange and candy-like logo of OpenAI with SvelteKit branding and colors"
			src={gptOrange}
			class="absolute -top-10 -left-8 w-20 -rotate-12"
		/>
		</div>
	</div>
