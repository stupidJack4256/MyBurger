import React, {Component} from 'react';
import Aux from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
		salad: 40,
		meat: 45,
		cheese: 35,
		bacon: 40
}

class BurgerBuilder extends Component {
	
	state = {
		ingredients: null,
		totalPrice: 200,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false
	}

	componentDidMount(){
		axios.get('https://react-my-burger-8bfa6.firebaseio.com/ingredieents.json')
				 .then(response=>{
						this.setState({ingredients: response.data})
				 })
				 .catch(error=> {
							this.setState({error: true})
				 })
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
		// alert("Continue!");
		
		const queryParams = [];
		for(let i in this.state.ingredients){
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]) )
		}
		queryParams.push('price='+ this.state.totalPrice)
		const queryString = queryParams.join('&');
		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString
		});
	}
	
	render(){
		
		const disabledInfo = {
			...this.state.ingredients
		};
		for(let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		
		let orderSummary = null;
		let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>
		
		if(this.state.ingredients){
			
			burger = (
				<Aux>
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
			 orderSummary = (
				<OrderSummary 
							ingredients={this.state.ingredients}
							price={this.state.totalPrice}
							purchaseCancelled={this.purchaseCancelHandler}
							purchaseContinued= {this.purchaseContinueHandler} />	
			)

			if(this.state.loading){
				orderSummary = <Spinner />
			}
		}	
		
		return(
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		)
	}
}

export default withErrorHandler(BurgerBuilder, axios);