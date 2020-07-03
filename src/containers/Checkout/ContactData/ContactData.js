import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'; 
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component{
	
	state={
		name: '',
		email: '',
		address: {
				street: '',
				postalCode: ''
		},
		loading: false
	}

	orderHandler =(event)=>{
		event.preventDefault();
		this.setState({loading: true})
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: 'Anil MJ',
				addresss: {
					street: 'MG Road',
					pinCode: '587313',
					country: 'India'
				},
				email:'stupidjack@ymail.com'
			},
			deliveryMethod: 'fast'
		}
		
		axios.post('/orders.json', order)
				.then(response=>{
						this.setState({loading: false})
						this.props.history.push("/");
				})
				.catch(error=> {
						this.setState({loading: false})
				})
	}
	
	render(){
		
		let form =(
				<form>
					<input type="text" name="name" placeholder="name" />
					<input type="email" name="email" placeholder="email" />
					<input type="text" name="street" placeholder="street" />
					<input type="text" name="postal" placeholder="postal code" />
					<Button btnType="Success" clicked={this.orderHandler} >ORDER</Button>
				</form>
		)
		
		if (this.state.loading){
			form = <Spinner />
		}
		
		return(
			<div className={classes.ContactData} >
				<h4>Enter Your Contact Data</h4>
				{form}
			</div>
		);	
	}
}

export default ContactData;
