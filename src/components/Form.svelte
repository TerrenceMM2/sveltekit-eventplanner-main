<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Event } from '$lib/server/remote-events';

	let { data }: { data: Event | null } = $props();
	let isSubmitting = $state(false);
</script>

<!-- https://svelte.dev/tutorial/kit/customizing-use-enhance -->
<form
	class="flex flex-col w-3/4 m-auto"
	method="POST"
	use:enhance={() => {
		isSubmitting = true;
		return async ({ update }) => {
			await update();
			isSubmitting = false;
		};
	}}
>
	<!-- form for creating new event -->
	<label for="title">Title</label>
	<input
		class="placeholder-gray-400 text-black mb-4"
		type="text"
		id="title"
		name="title"
		placeholder="Title"
		required
		value={data?.title}
	/>
	<label for="description">Description</label>
	<textarea
		class="placeholder-gray-400 text-black mb-4"
		id="description"
		name="description"
		rows="4"
		cols="50"
		placeholder="Description"
		value={data?.description}
	></textarea>
	<label for="date">Date</label>
	<input
		class="text-black mb-4"
		type="datetime-local"
		id="date"
		name="date"
		value={data?.date}
		required
	/>
	<button class="btn w-max" type="submit" disabled={isSubmitting}
		>{data ? 'Edit Event' : 'Create Event'}</button
	>
	{#if isSubmitting}
		<p>Submitting...</p>
	{/if}
</form>
