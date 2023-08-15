import type { Actions, fail, redirect } from '@sveltejs/kit';
import { Logger } from 'tslog';
import * as api from '$lib/api'; 
const logger = new Logger({ name: 'upload' });

export const load = async ({}) => {
	logger.debug(`load START`);
	// ...  
	logger.debug(`load END`);
};

export const actions: Actions = {
	search : async ({ request }) => {
		logger.debug(`actions upload START`);
		// upload 코드 작성




    //...
    logger.debug("upload END")
	}
} satisfies Actions;
