<script lang="ts">
    export let callback: () =>  void;
</script>

<button on:click={callback}><slot /></button>

<style>
button {
    color: white; 
    height: 32px;
    font-size: 14px;
    padding: 4px 12px;
    background-color: var(--accent-color);
    border: 1px solid rgb(0,0,0,0.1);
    border-radius: 4px;
}
</style>

