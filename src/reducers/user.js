import { LOGIN_USER, LOGOUT_USER } from '../actions/user';

export const currentUser = (state = {}, action) => {
	switch (action.type) {
		case LOGIN_USER: 
			sessionStorage.setItem('localUser', JSON.stringify(action.payload));
			return Object.assign({}, state, action.payload);
		case LOGOUT_USER: 
			sessionStorage.removeItem('localUser');
			return {};
		default:
			return state;
	}
};