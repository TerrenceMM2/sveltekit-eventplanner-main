<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<!-- https://svelte.dev/blog/streaming-snapshots-sveltekit -->

{#await data.event}
	Loading event...
{:then event}
	{#if event}
		<div class="text-center">
			<h2 class="text-lg mb-2">Event Title: <span class="font-bold">{event.title}</span></h2>
			<p class="mb-2">Description: {event.description}</p>
			<p class="mb-2">Date: {new Date(event.date).toLocaleString()}</p>
			<div class="flex flex-row justify-center gap-4">
				<a class="btn" href={`/${event.id}/edit`} role="button">Edit Event</a>
				<form action="?/delete" method="POST" use:enhance>
					<input type="hidden" name="id" value={event.id} />
					<button class="btn">Delete</button>
				</form>
			</div>
		</div>
	{/if}
{:catch error}
	<p>Error loading event: {error.message}</p>
{/await}
