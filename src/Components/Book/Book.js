import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { compose } from 'redux';
import update from 'immutability-helper';
import { getBookQueryWithFragment, requestBookQuery } from './Book.queries';
import './Book.css';

class Book extends Component {

	constructor() {
		super();
		this.requestBook = this.requestBook.bind(this);
	}

	requestBook() {
		const { requestBookMutation, currentUser, data: { getBook } } = this.props;
		const requestedById = currentUser.id;
		const bookRequestedId = getBook.id;
		requestBookMutation({
			requestedById,
			bookRequestedId,
		}).then((data) => {
			console.log(data);
		});
	}

	render() {
		let display = null;
        console.log(this.props.data.getBook);
		if (this.props.data.getBook) {
			const currentUser = this.props.currentUser;
			const book = this.props.data.getBook;
			let actions = null;
			if (currentUser && currentUser.id && book.currentHolder.id !== currentUser.id) {
				let requested = false;
				if(book.bookRequests.edges.length > 0) {
					requested = book.bookRequests.edges.reduce((a, b) => {
						if(b.requestedBy.id === currentUser.id) {
							return a || true;
						}
						return a || false;
					});
				}
				if( !requested ) {
					actions = (
						<div className="bookActions">
							<button onClick={this.requestBook}>Request</button>
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
			display = (
				<div>
					<h1>{book.title}</h1>
					<p>{book.author.firstName} {book.author.lastName} - {book.pages} pgs.</p>
					{actions}
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

const withApollo = compose(
	graphql(getBookQueryWithFragment,
		{
			options: (ownProps) => {
				return {
					variables: {
						id: ownProps.params.bookId
					}
				};
			}
		}
	),
	graphql(requestBookQuery, {
		props({ ownProps, mutate }) {
			return {
				requestBookMutation({ requestedById, bookRequestedId }) {
					return mutate({
						variables: {
							input: {
								requestedById,
								bookRequestedId,
								complete: false
							}
						},
						updateQueries: {
							BookQuery: (prev, { mutationResult }) => {
								console.log('prev', prev);
								const next = update(prev, {
									getBook: {
										bookRequests: {
											edges: {
												$unshift: [{ node: mutationResult.data.createBookRequest.changedBookRequest, __typename: "BookRequestEdge"}]
											}
										}
									}
								});
								console.log('next', next);
								return next;
							}
						}
					})
				}
			}
		}
	}),
	connect((state) => {
		const { currentUser } = state;
		return {
			currentUser
		};
	})
);

export default withApollo(Book);
