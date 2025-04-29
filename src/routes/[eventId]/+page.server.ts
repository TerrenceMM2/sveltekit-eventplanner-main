import { deleteEventById } from '$lib/server/remote-events';
import { error, redirect } from '@sveltejs/kit';
import { fetchEvent } from './utils';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	return {
		event: fetchEvent(params)
	};
};

// https://svelte.dev/tutorial/kit/named-form-actions
export const actions: Actions = {
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id')?.toString();

		if (id) {
			const parsedId = parseInt(id);
			const deleteSuccessful = await deleteEventById(parsedId);

			if (deleteSuccessful) {
				redirect(303, '/');
			} else {
				error(500, 'There was an error deleting the event.');
			}
		}
	}
};
