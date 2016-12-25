import React, { PropTypes } from 'react';
import Toolbar from '../Toolbar';
import './App.css';

const PageLayout = (props) => {
	const { children } = props;
	return (
		<div className="App">
			<Toolbar/>
			<div className="body">
				{children}
			</div>
		</div>
	);
}

PageLayout.propTypes = {
	/**
	 * Components to render within the PageLayout
	 */
	children: PropTypes.node
};

export default PageLayout