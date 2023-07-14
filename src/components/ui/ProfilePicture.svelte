<script lang="ts">
    import { page } from '$app/stores'
    // prop for the component. Given the user session, it will fetch its profile
    // image if one was provided
    export let user: string; 
    let profileImage = '';
    if (user === 'user') {
        profileImage = `${$page.data.session?.user?.image}`
    } else if (user === 'assistant') {
        profileImage = '/assistant-mock.jpeg'
    }
</script>

<div class='w-7 h-7 flex-shrink-0'>
    <img
        alt={`${user}'s profile picture`}
        class="rounded-sm"
        src={profileImage}
    /> 
</div>

<style>
    .image-wrapper {
        width: 48px;
        height: 48px;
    }

    img {
        display: inline-block;
        width: 100%; 
    }
</style>

