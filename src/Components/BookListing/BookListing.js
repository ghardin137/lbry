import React, { Component } from 'react';
import { Link } from 'react-router';
import './BookListing.css';

export default class BookListing extends Component {
	render() {
		const { book } = this.props;
		const bookUrl = '/books/' + book.id;
		console.log(this.props);
		return (
			<li>
				<Link className="bookTitle" to={bookUrl}>{book.title}</Link>
				<p>{book.author.firstName} {book.author.lastName}</p>
			</li>
		);
	}
};
