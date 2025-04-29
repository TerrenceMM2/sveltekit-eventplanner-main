import { updateEventById } from '$lib/server/remote-events';
import { error, redirect } from '@sveltejs/kit';
import { validateFormData } from '../../../utils';
import { fetchEvent } from '../utils';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	return {
		event: fetchEvent(params)
	};
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const formdata = await request.formData();
		const { title, description, date } = validateFormData(formdata);

		const updatedEvent = await updateEventById(parseInt(params.eventId), {
			title,
			description,
			date
		});

		if (updatedEvent !== null) {
			redirect(303, `/${updatedEvent.id}`);
		} else {
			error(500, 'There was an error updating the event.');
		}
	}
};
