import React from 'react';
import Aux from '../../hoc/Auxilliary';
import './Layout.module.css';

const layout = (props) =>{
	return (
		<Aux>
			<div>Toolbar, side drawer, backdrop, orders </div>
			<main>
				{props.children}
			</main>
		</Aux>
	    
	
	);
}

export default layout;