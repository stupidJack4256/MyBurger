import React,{Component} from 'react';
import Aux from '../../hoc/Auxilliary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';

class Layout extends Component{
	
	state = {
		showSideDrawer: false
	}

	sideDrawerClosedHandler =()=>{
		this.setState({showSideDrawer: false});
	}
	
	sideDrawerToggleHandler =()=>{
		this.setState((prevState)=>{
					return {showSideDrawer: !prevState.showSideDrawer};				 
									})
	}
	
	render(){
		return (
			<Aux>
				<SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
				<Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
				<main className={classes.content}>
					{this.props.children}
				</main>
			</Aux>
		);
	}
}

export default Layout;