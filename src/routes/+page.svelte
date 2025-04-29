<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<header class="py-4">
	<h1>Welcome to SvelteKit</h1>
	<p>
		Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
	</p>
</header>

<section class="my-4">
	<h2 class="text-3xl text-center">Events</h2>

	<a class="btn" href="/newevent" role="button">Add Event</a>
</section>

<main class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
	{#await data.events}
		Loading events...
	{:then events}
		{#each events as event}
			<a href={`/${event.id}`} class="p-4 bg-slate-800 rounded-md">
				<h2 class="text-lg font-bold">{event.id}: {event.title}</h2>
				<p>{event.description}</p>
				<p>{new Date(event.date).toLocaleString()}</p>
			</a>
		{/each}
	{:catch error}
		<p>Error loading events: {error.message}</p>
	{/await}
</main>
