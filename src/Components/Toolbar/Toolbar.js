import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router';
import gql from 'graphql-tag';
import { loginUserAction, logoutUserAction } from '../../actions/user';
import './Toolbar.css';

class Toolbar extends Component {
	
	constructor() {
		super();
		this.loginUser = this.loginUser.bind(this);
		this.logoutUser = this.logoutUser.bind(this);
	}
	
	loginUser(values) {
		console.log('values', values);
		const { username, password } = values;
		const { loginUserMutation, dispatch } = this.props;
		if(username && password) {
			const loginVariables = { 
				variables : {
					user: {
						username,
						password
					}
				}
			};
			loginUserMutation(loginVariables).then((data) => {
				if(!data.errors) {
					dispatch(loginUserAction(data.data.loginUser.user));
				}
			});
		}
	}
	
	logoutUser() {
		const { dispatch, reset } = this.props;
		reset();
		dispatch(logoutUserAction());
	}
	
	render() {
		const { pristine, submitting, currentUser, handleSubmit } = this.props;
		let userArea = (
			<div className="loginForm">
				<form name="loginForm" onSubmit={handleSubmit(this.loginUser)}>
					<Field name="username" id="username" component="input" type="text" placeholder="Username" />
					<Field name="password" id="password" component="input" type="password" placeholder="Password"/>
					<button type="submit" disabled={pristine || submitting}>Login</button>
					<Link to="/register">Register</Link>
				</form>
			</div>
		);
		if (currentUser && currentUser.id) {
			userArea = (
				<div className="loginForm">
					Welcome {currentUser.username}! <button className="buttonLink" onClick={this.logoutUser}>Logout</button>
				</div>
			);
		}
		return (
			<div className="toolbar">
				<div className="logo">
					<Link to="/" className="logo">Lbry</Link>
				</div>
				{userArea}
			</div>
		);
	}
}

const LOGIN_USER_MUTATION = gql`mutation LoginUser($user: LoginUserInput!){
	loginUser(input:$user){
		token,
		user {
			id,
			username,
			firstName,
			lastName
		}
	}
}`;

const validate = (values) => {
	const errors = {}
	if (!values.username) {
		errors.username = 'Required'
	} else if (values.username.length > 15) {
		errors.username = 'Must be 15 characters or less'
	}
	
	if (!values.password) {
		errors.password = 'Required'
	} else if (values.password.length < 8) {
		errors.password = 'Must be at least 8 characters'
	}
	
	return errors;
}

const withMutations = compose(
	graphql(LOGIN_USER_MUTATION, { name: 'loginUserMutation' }),
	reduxForm({
		form: 'loginForm',
		validate
	}),
	connect((state) => {
		console.log(state);
		const { currentUser } = state;
		return {
			currentUser
		}
	})
);

export default withMutations(Toolbar);