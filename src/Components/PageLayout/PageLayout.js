import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import './App.css';

const PageLayout = (props) => {
	const { children } = props;
	return (
		<div className="App">
			<div className="toolbar">
				<Link to="/" className="logo">Lbry</Link>
			</div>
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