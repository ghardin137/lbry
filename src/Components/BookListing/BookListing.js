import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import './BookListing.css';

class BookListing extends Component {
	render() {
		const { book, currentUser, requestBook } = this.props;
		const bookUrl = '/books/' + book.id;
		let actions = null;
		if (currentUser.id && book.currentHolder.id !== currentUser.id) {
			let requested = false;
			if(book.bookRequests.edges.length > 0) {
				requested = book.bookRequests.edges.reduce((a, b) => {
					if(b.requesedBy.id === currentUser.id) {
						return a || true;
					}
					return a || false;
				});
			}
			if( !requested ) {
				actions = (
					<div className="bookActions">
						<button onClick={() => requestBook(book.id)}>Request</button>
					</div>
				);
			} else {
				actions = (
					<div className="bookActions">
						<button className="requested">Requested!</button>
					</div>
				);
			}
		}
		return (
			<li className="bookListing">
				<div className="bookDetails">
					<Link className="bookTitle" to={bookUrl}>{book.title}</Link>
					<p>{book.author.firstName} {book.author.lastName}</p>
				</div>
				{actions}
			</li>
		);
	}
};

export default connect((state) => {
	const { currentUser } = state;
	return {
		currentUser
	};
})(BookListing);