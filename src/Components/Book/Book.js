import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
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
			{display}
		);
	}
}

const query = gql`query BookQuery($bookId: String!){
  getBook(id:$bookId){
    title
    author {
      id
    }
    pages
    bookRequests {
      edges {
        node {
          createdAt
          modifiedAt
          complete
          requestedBy {
            username
          }
        }
      }
    }
  }
}`;

export default graphql(query)(Book);