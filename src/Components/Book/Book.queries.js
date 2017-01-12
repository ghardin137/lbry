import gql from 'graphql-tag';

export const bookDetails = gql`
	fragment bookDetails on Book {
		id,
		title,
		author {
			id,
			firstName,
			lastName,
			suffix
		},
		pages,
		currentHolder {
			id
		},
		bookRequests(where: { complete: { ne:true } }, orderBy:{ field: createdAt, direction: DESC }) {
			edges {
				node {
					createdAt
					requestedBy {
						id
					}
				}
			}
		}		
	}
`;

export const getBookQuery = gql`query BookQuery($id: ID!){
  getBook(id:$id){
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

export const getBookQueryWithFragment = gql`query BookQuery($id: ID!) {
	getBook(id:$id) {
		...bookDetails
	}
}
${bookDetails}`;

export const requestBookQuery = gql`mutation RequestBook($input: CreateBookRequestInput!) {
	createBookRequest(input: $input) {
		changedBookRequest {
			createdAt,
			requestedBy {
				id
			}
		}
	}
}`;
 
// export const updateBookQuery = gql``;