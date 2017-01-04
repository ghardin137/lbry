import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { graphql } from 'react-apollo';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import gql from 'graphql-tag';
import { loginUserAction } from '../../actions/user';
import './RegisterUser.css';

class RegisterUser extends Component {
	constructor() {
		super();
		this.submit = this.submit.bind(this);
	}
	
	submit = (values) => {
		const { registerUserMutation, dispatch, reset } = this.props;
		const { username, password, firstName, lastName } = values;
		registerUserMutation({
			variables: {
				input: {
					username,
					password,
					firstName,
					lastName
				}
			}
		}).then((data) => {
			if(!data.errors) {
				dispatch(loginUserAction(data.data.createUser.changedUser));
				reset();
				browserHistory.push('/');
			}
		});
	};
	
	renderField = ({ input, label, type, meta: { touched, error } }) => (
		<div>
			<label>{label}</label>
			<div>
				<input {...input} placeholder={label} type={type}/>
					{touched && error && <span>{error}</span>}
			</div>
		</div>
	);
	
	render() {
		const { handleSubmit, submitting, error } = this.props;
		return (
			<form name="registerUserForm" onSubmit={handleSubmit(this.submit)}>
				{error && <strong>{error}</strong>}
				<Field component={this.renderField} type="text" name="username" id="username" label="Username" />
				<Field component={this.renderField} type="password" name="password" id="password" label="Password" />
				<Field component={this.renderField} type="text" name="firstName" id="firstName" label="First Name" />
				<Field component={this.renderField} type="text" name="lastName" id="lastName" label="Last Name" />
				
				<div>
					<button type="submit" disabled={submitting}>Register</button>
				</div>
			</form>
		);
	}
}

const REGISTER_USER_MUTATION = gql`mutation CreateUser($input: CreateUserInput!){
	createUser(input:$input){
		changedUser {
			id,
			username,
			firstName,
			lastName
		}
	}
}`;

const validate = (values) => {
	return {};
};

const withMutations = compose(
	graphql(REGISTER_USER_MUTATION, { name: 'registerUserMutation' }),
	reduxForm({
		form: 'registerUserForm',
		validate
	}),
	connect((state) => {
		const { currentUser } = state;
		return {
			currentUser
		}
	})
);

export default withMutations(RegisterUser);