import { fetchAllEvents } from '$lib/server/remote-events';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	const loadedEvents = fetchAllEvents();
	return {
		events: loadedEvents
	};
};
