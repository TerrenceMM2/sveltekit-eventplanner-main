import { createEvent } from '$lib/server/remote-events';
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { validateFormData } from '../../utils';

export const actions: Actions = {
	default: async ({ request }) => {
		const formdata = await request.formData();
		const { title, description, date } = validateFormData(formdata);

		const newEvent = await createEvent({ title, description, date });
		redirect(303, `/${newEvent.id}`);
	}
};
