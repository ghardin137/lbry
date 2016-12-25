import { createAction } from 'redux-actions';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const loginUserAction = createAction(LOGIN_USER);
export const logoutUserAction = createAction(LOGOUT_USER);
