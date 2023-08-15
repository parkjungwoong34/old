import { type Actions, fail, redirect } from '@sveltejs/kit';
import { Logger } from 'tslog';
import * as api from '../../../lib/api';
const logger = new Logger({ name: 'login' });

export const load = async ({}) => {
	logger.debug(`load START`);
	logger.debug(`load END`);
};

export const actions: Actions = {
	login: async ({ request, locals, cookies }) => {
		const data = await request.formData();
		logger.debug(`actions login START`);
		const body = await api.post(
			'auth/login',
			{
				id: data.get('id'),
				password: data.get('password')
			},
			''
		);
		if (body.errors) {
			return fail(body.error, body);
		}

		await locals.session.set({
			jwt: body.accessToken
		});

		throw redirect(307, '/home'); // main으로 redirect
	}
} satisfies Actions;
