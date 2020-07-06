import React, {Component} from 'react';
import Aux from '../../../hoc/Auxilliary/Auxilliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
	//.. tis could be a functional component.
	componentDidUpdate(){
		console.log("[OrderSummary] did update");
	}
	
	render(){
		
		const ingredientSummary = Object.keys(this.props.ingredients)
				.map(igKey=>{
					return <li key={igKey}>
										<span style={{textTransform: 'capitalize'}} >{igKey}</span>: 					                                          {this.props.ingredients[igKey]}
									</li>
				});
		
		return(
			<Aux>
				<h3>Your Order</h3>
				<p>A Deliciious Burger with following Ingredients:</p>
				<ul>{ingredientSummary}</ul>
				<p>Continue to Checkout?</p>
				<p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
				<Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
				<Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
		</Aux>
		);
	}
}

export default OrderSummary;