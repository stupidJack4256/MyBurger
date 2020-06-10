import React from 'react'; 
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css'

const burger =(props) =>{
	
	let transformedIngredient = Object.keys(props.ingredients)
												.map(igkey=>{
													return [...Array(props.ingredients[igkey])]
															.map((_, i)=>{
																return <BurgerIngredient key={igkey + i} type={igkey} />
													});
												})
												.reduce((arr, el)=>{
													return arr.concat(el)
												}, []);
	if(transformedIngredient.length === 0){
		transformedIngredient = <p><em>Please start adding Ingredients</em></p>
	}
	// Alternative method to reduce();
	// const totaladding = transformedIngredient.flat(Infinity).length;
	// if (totaladding === 0 ){
	// 	transformedIngredient = <p><em>Please start adding Ingredients</em></p>
	// }
	
	return(
		<div className={classes.Burger}>
			<BurgerIngredient type='bread-top'/>	
			{transformedIngredient}	
			<BurgerIngredient type='bread-bottom' />	
		</div>

	);
	
}

export default burger;