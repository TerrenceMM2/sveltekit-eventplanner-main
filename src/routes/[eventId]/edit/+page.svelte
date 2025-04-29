<script lang="ts">
	import type { PageData } from '../$types';
	import Form from '../../../components/Form.svelte';

	let { data }: { data: PageData } = $props();
</script>

<h1 class="text-3xl text-center">Edit Event</h1>

<div>
	{#await data.event}
		Loading event...
	{:then event}
		{#if event}
			<Form data={event} />
		{/if}
	{:catch error}
		<p>Error loading event: {error.message}</p>
	{/await}
</div>
