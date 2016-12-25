import { createStore, applyMiddleware, combineReducers } from 'redux';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { reducer as formReducer } from 'redux-form';
import createLogger from 'redux-logger';
import { currentUser } from '../reducers/user';

const loggerMiddleware = createLogger();

const fetchOptions = {
	uri: 'https://us-west-2.api.scaphold.io/graphql/lbry',
	headers: {
		'Content-Type': 'application/json'
	},
};

const networkInterface = createNetworkInterface(fetchOptions);
const client = new ApolloClient({
	networkInterface,
	dataIdFromObject: (obj) => obj.id + obj.__typename
});

const configureStore = (preloadedState = {}) => {
	const reducers = combineReducers({ 	apollo: client.reducer(), form: formReducer, currentUser });
	const store = createStore(
		reducers,
		preloadedState,
		applyMiddleware(
			loggerMiddleware
		)
	);
	return { store, client };
};

export default configureStore;
