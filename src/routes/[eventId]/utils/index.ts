import { fetchEventById } from '$lib/server/remote-events';
import type { RouteParams } from '../$types';

/**
 * Get event by id
 * @param params
 * @returns Event | undefined
 */
export const fetchEvent = async (params: RouteParams) => {
	const eventId = parseInt(params.eventId);
	const event = await fetchEventById(eventId);
	return event;
};
