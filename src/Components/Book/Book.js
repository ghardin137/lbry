import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQueryWithFragment } from './Book.queries';
import './Book.css';

class Book extends Component {
	render() {
		let display = null;
		if (!this.props.data.loading && this.props.data.getBook) {
			const book = this.props.data.getBook;
			display = (
				<div>
					<h1>{book.title}</h1>
				</div>
			);
		} else {
			display = (
				<span>Loading...</span>
			);
		}
		return (
			<div>
				{display}
			</div>
		);
	}
}

export default graphql(getBookQueryWithFragment, 
	{ 
		options: (ownProps) => {
			return {
				variables: {
					id: ownProps.params.bookId
				}
			};
		}
	})(Book);