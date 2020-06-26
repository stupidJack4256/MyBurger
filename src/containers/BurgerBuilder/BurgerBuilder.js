import React, {Component} from 'react';
import Aux from '../../hoc/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
		salad: 40,
		meat: 45,
		cheese: 35,
		bacon: 40
}


class BurgerBuilder extends Component {
	
	state = {
		ingredients: {
			salad: 0,
			meat: 0,
			cheese: 0,
			bacon: 0
		},
		totalPrice: 200,
		purchasable: false,
		purchasing: false
	}

	updatePurchaseState (ingredients) {
		const sum = Object.keys(ingredients)
					.map(igKey=>{
						return ingredients[igKey];
					})
					.reduce((sum, el) =>{
						return sum+el;
					} ,0)
		// instead of Object.keys we can make use of Object.values
		// const anil = Object.values(ingredients)
		// 			.reduce((sum, el) =>{
		// 				return sum+el;
		// 			} ,0)
		// console.log(anil);
		this.setState({purchasable: sum > 0})
		
		// insteadof mapping through all the ingredients, use totalPrice
		// if(price <= 200){
		// 	this.setState({purchasable: true})
		// }
		}

	
	addIngredienthandler=(type)=>{
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount+1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type]=updatedCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice+priceAddition;
		
		this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
		this.updatePurchaseState(updatedIngredients);

	}
	
	removeIngredientHandler = (type) =>{
		const oldCount = this.state.ingredients[type];
		if(oldCount <= 0){
			return;
		}
		const updatedCount = oldCount-1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type]=updatedCount;
		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice-priceDeduction;
		
		this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
		this.updatePurchaseState(updatedIngredients);

	}
	
	purchaseHandler =()=>{
		this.setState({purchasing: true})
	}
	
	purchaseCancelHandler =()=>{
		this.setState({purchasing: false})
	}
	
	purchaseContinueHandler = ()=>{
		alert("Continue!");
	}
	
	render(){
		
		const disabledInfo = {
			...this.state.ingredients
		};
		for(let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		
		return(
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
					<OrderSummary 
						ingredients={this.state.ingredients}
						price={this.state.totalPrice}
						purchaseCancelled={this.purchaseCancelHandler}
						purchaseContinued= {this.purchaseContinueHandler} />
				</Modal>
				<Burger ingredients = {this.state.ingredients} />
				<BuildControls 
					ingredientAdded={this.addIngredienthandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
					purchasable={this.state.purchasable}
					price={this.state.totalPrice}
					ordered={this.purchaseHandler}
					/>
			</Aux>
		)
	}
}

export default BurgerBuilder;