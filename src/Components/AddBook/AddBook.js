import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import gql from 'graphql-tag';
import './AddBook.css';

class AddBook extends Component {
	
	addAuthor() {
		const { addAuthorMutation, firstName, lastName, suffix } = this.props;
		
		addAuthorMutation({
			input: {
				firstName,
				lastName,
				suffix
			}
		}).then((data) => {
			// do something with the id so that we can add a book with a new author.
		});
	}
	
	addBook() {
		const { addBookMutation, title, authorId, pages, currentUserId } = this.props;
		
		addBookMutation({
			input: {
				title,
				authorId,
				pages,
				currentHolderId: currentUserId
			}
		}).then((data) => {
			// redirect to the book page.
		});
	}
	
	render() {
		return (
			<form name="addBookForm">
				
			</form>
		);
	}
}

const ADD_AUTHOR_MUTATION = gql`mutation AddAuthor($author: CreateAuthorInput!){
  createAuthor(input:$author){
	  changedAuthor {
		  id
	  }
  }
}`;

const ADD_BOOK_MUTATION = gql`query BookQuery($book: CreateBookInput!){
  createBook(input:$book){
	  changedBook {
		  id
	  }
  }
}`;

const withMutations = compose(
	graphql(ADD_AUTHOR_MUTATION, { name: 'addAuthorMutation' }),
	graphql(ADD_BOOK_MUTATION, { name: 'addBookMutation' }),
	reduxForm({
		form: 'addBookForm'
	})
);

export default withMutations(AddBook);