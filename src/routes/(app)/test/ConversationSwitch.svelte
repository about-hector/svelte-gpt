<div
	class="flex items-center justify-center gap-1 absolute left-0 top-2 -ml-4 -translate-x-full visible"
>
	<button
		class=" text-xs disabled:text-gray-300/60"
		disabled={currentAlternativeIndex === 0}
		on:click={() => {
			handleAlternative($messageTree, alternatives[currentAlternativeIndex - 1]);
			currentAlternativeIndex = currentAlternativeIndex - 1;
		}}
	>
		<svg
			stroke="currentColor"
			fill="none"
			stroke-width="1.5"
			viewBox="0 0 24 24"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="h-3 w-3"
			height="1em"
			width="1em"
			xmlns="http://www.w3.org/2000/svg"><polyline points="15 18 9 12 15 6"></polyline></svg
		>
	</button>
	<span class="text-xs flex-grow flex-shrink-0"
		>{currentAlternativeIndex + 1} / {alternatives.length}</span
	>
	<button
		class=" text-xs disabled:text-gray-300/60"
		disabled={(currentAlternativeIndex % alternatives.length) + 1 === alternatives.length}
		on:click={() => {
			handleAlternative($messageTree, alternatives[currentAlternativeIndex + 1]);
			currentAlternativeIndex = currentAlternativeIndex + 1;
		}}
	>
		<svg
			stroke="currentColor"
			fill="none"
			stroke-width="1.5"
			viewBox="0 0 24 24"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="h-3 w-3"
			height="1em"
			width="1em"
			xmlns="http://www.w3.org/2000/svg"><polyline points="9 18 15 12 9 6"></polyline></svg
		>
	</button>
</div>
