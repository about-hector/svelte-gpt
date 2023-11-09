<script>
	import LoginPanel from './LoginPanel.svelte';
	import SignInBackground from './SignInBackground.svelte';
    import SignIn from './SignIn.svelte';
</script>

<LoginPanel >
   <SignInBackground slot='background' />
   <SignIn slot='login-panel' /> 
</LoginPanel>

