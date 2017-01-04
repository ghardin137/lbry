import gql from 'graphql-tag';

export const bookDetails = gql`
	fragment bookDetails on Book {
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

// export const requestBookQuery = gql``;
// 
// export const updateBookQuery = gql``;