/* global window */
export const getInitialState = () => {
	const currentUser = JSON.parse(sessionStorage.getItem('localUser'));
	return {
		currentUser
	};
};
