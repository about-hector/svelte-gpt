<script lang="ts">
    // prop for the component. Given the user session, it will fetch its profile
    // image if one was provided
    export let user: string; 
    let profileImage = '';
    if (user === 'user') {
        profileImage = '/user-mock.avif'
    } else if (user === 'assistant') {
        profileImage = '/assistant-mock.jpeg'
    }
</script>

<div class='image-wrapper flex-shrink-0'>
    <img
        alt={`${user}'s profile picture`}
        src={profileImage}
    /> 
</div>

<style>
    .image-wrapper {
        width: 48px;
        height: 48px;
    }

    img {
        border-radius: 50%;
        display: inline-block;
        width: 100%; 
    }
</style>

