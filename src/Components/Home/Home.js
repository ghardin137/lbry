import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import './Home.css';

import BookListing from '../BookListing';

class Home extends Component {
	render() {
		let books = [];
		let list = null;
		if (!this.props.data.loading && this.props.data.viewer) {
			books = this.props.data.viewer.allBooks.edges;
			list = (<ul className="books">
				{books.map((book, index) => {
					return <BookListing key={index} book={book.node} />;
				})}
			</ul>);
		} else {
			list = (
				<span>Loading...</span>
			);
		}
		return (
			<div>
				<h1>Books Available</h1>
				{list}
			</div>
		);
	}
}

const query = gql`query BookQuery {
  viewer {
    allBooks {
      edges {
        node {
          id,
          title,
          author {
            id,
            firstName,
            lastName,
            suffix
          }
        }
      }
    }
  }
}`;

export default graphql(query)(Home);