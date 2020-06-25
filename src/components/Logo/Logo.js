import React from 'react';
import burgerlogo from '../../assets/Images/logo.png';
import classes from './Logo.module.css';


const logo = (props)=>{
	return(
		<div className={classes.Logo} >
			<img src={burgerlogo} alt="MyBurger" />
		</div>
	)
}

export default logo;