import { fail, type Actions } from '@sveltejs/kit';
import { emailSchema } from '$lib/schemas';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import * as brevo from '@getbrevo/brevo';
import { config } from '$lib/config-server';

export const actions: Actions = {
	sendEmail: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(emailSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const apiInstance = new brevo.ContactsApi();
		const apiKey = apiInstance.authentications['apiKey'];
		apiKey.apiKey = config.brevoApiKey;

		const createContact = new brevo.CreateContact();
		createContact.email = form.data.email;
		createContact.listIds = [2];
		createContact.updateEnabled = true;

		try {
			await apiInstance.createContact(createContact);
			return { form };
		} catch (err) {
			console.error('Unexpected error:', err);
			return fail(400, { form });
		}
	}
};
