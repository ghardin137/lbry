import { LOGIN_USER, LOGOUT_USER } from '../actions/user';

export const currentUser = (state = {}, action) => {
	switch (action.type) {
		case LOGIN_USER: 
			return Object.assign({}, state, action.payload);
		case LOGOUT_USER: 
			return {};
		default:
			return state;
	}
};