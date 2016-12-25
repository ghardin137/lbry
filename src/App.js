import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {ApolloProvider} from 'react-apollo';
import configureStore from './store/configureStore';
import {getInitialState} from './store/getInitialState';
import PageLayout from './Components/PageLayout';
import Home from './Components/Home';
import Book from './Components/Book';

const {store, client} = configureStore(getInitialState());

class App extends Component {
	render() {
		return (
			<div>
				<ApolloProvider store={store} client={client}>
					<Router history={browserHistory}>
						<Route path="/" component={PageLayout}>
							<IndexRoute component={Home}/>
							<Route path="/books" component={Home}/>
							<Route path="/books/:bookId" component={Book} />
							<Route path="/register" component={Home}/>
						</Route>
					</Router>
				</ApolloProvider>
			</div>
		);
	}
}

export default App;
