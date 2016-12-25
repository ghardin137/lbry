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
			<div>
				{display}
			</div>
		);
	}
}

const query = gql`query BookQuery($bookId: ID!){
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

export default graphql(query, 
	{ 
		options: (ownProps) => {
			return {
				variables: {
					bookId: ownProps.params.bookId
				}
			};
		}
	})(Book);