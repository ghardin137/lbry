import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import './Home.css';

import BookListing from '../BookListing';

class Home extends Component {
	
	constructor() {
		super();
		this.requestBook.bind(this);
	}
	
	requestBook(bookId) {
		console.log(bookId);
	}
	
	render() {
		let books = [];
		let list = null;
		if (!this.props.data.loading && this.props.data.viewer) {
			books = this.props.data.viewer.allBooks.edges;
			list = (<ul className="books">
				{books.map((book, index) => {
					return <BookListing key={index} book={book.node} requestBook={this.requestBook} />;
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
					},
					currentHolder {
						id
					},
					bookRequests(where: { complete: { ne:true } }, orderBy:{ field: createdAt, direction: DESC }) {
						edges {
							node {
								createdAt
								requestedBy {
									id,
								}
							}
						}
					}
				}
			}
		}
	}
}`;

export default graphql(query)(Home);