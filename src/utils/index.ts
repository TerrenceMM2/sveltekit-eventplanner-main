import { error, type HttpError } from '@sveltejs/kit';
import type { Event } from '$lib/server/remote-events';

export const isValidFutureDate = (date?: string): boolean =>
	date ? new Date(date) > new Date() : false;

export const validateFormData = (formdata: FormData): Omit<Event, 'id'> | HttpError => {
	const title = formdata.get('title')?.toString();
	const description = formdata.get('description')?.toString();
	const date = formdata.get('date')?.toString();
	if (!title || !date) {
		error(400, 'Title and Date are required');
	}

	if (!isValidFutureDate(date)) {
		error(400, 'Cannot select a past date.');
	}
	return { title, description, date };
};
