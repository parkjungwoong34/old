# Frontend (정웅, 가은)

# ✔️ 로그인

💻 code
<details>
<summary>routes/+page.svelte</summary>
![image](https://github.com/parkjungwoong34/old/assets/122510627/017d53d7-1a59-4337-8290-53a7f39d0c45)

</details> 

<details>
<summary> routes/login/+page.server.ts </summary>    

```javascript
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
		logger.debug(body);
		if (body.status == 403) {
			const message = body.response.message;
			logger.debug(message);
			return fail(body.status, { message, incorrect: true });
		}

		await locals.session.set({
			jwt: body.accessToken
		});

		throw redirect(302, '/home'); // main으로 redirect
	}
}satisfies Actions;

```
</details>


## 📷 View
<details>
<summary>image</summary>
![image](https://github.com/korone00/xsearch/assets/122510627/df600ec2-6c15-4015-b2b0-8de67fe142b2)



</details>

<details>
<summary>routes/search/+page.server.ts</summary>

```javascript
export const actions: Actions = {
	search: async ({ request, locals }) => {
	  console.log('actions post called');
	  
	  const formData = await request.formData();
	  const file = formData.get('file') as Blob;
	  console.log('get formdata');

      const imageUrls = await post('image/covers', formData, locals.session).catch(
		(error: any) => {
		  logger.error("search catch error:", error);
		  return fail(error.statusCode, { error: error.toString() });
		}
	  );
	  console.log("imageUrls:", imageUrls);
	  if (imageUrls.error) {
		logger.error(`search error:`, imageUrls.message);
		return fail(400, { error: imageUrls.message });
	  }
	return { urls : imageUrls }
  }
}