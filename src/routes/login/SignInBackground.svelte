<script>
	import SignInCard from './SignInCard.svelte';
</script>

<div
	class="background h-full bg-slate-950 w-full md:w-2/3 relative flex flex-col justify-center mt-auto items-center p-6"
>
	<h2 class="font-bold text-4xl my-12 md:hidden block">Welcome back!</h2>
	<SignInCard class="md:hidden bg-white my-auto " />
	<div class="md:hidden block text-xs mt-auto">The project is not sponsored nor endorsed by OpenAI.</div>
</div>

<style>
	.background {
		background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
			url('$lib/assets/background-1.jpeg');
		background-size: cover;
		background-repeat: no-repeat;
	}

	@media (max-width: 768px) {
		.background {
			background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
				url('$lib/assets/background-openai.jpeg');
			background-size: cover;
		}
	}
</style>
