import React from 'react';
import PropTypes from "prop-types";

import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import sampleFruits from '../sample-fruits';
import Fish from './Fish';
import Fruit from './Fruit';
import base from '../base';

class App extends React.Component{
	static propTypes = {
		match: PropTypes.object	
	};
	state = {
		fishes: {},
		fruits:{},
		order: {}
	};

	componentDidMount(){
		const storeId = this.props.match.params.storeId;

		const localStorageRef = localStorage.getItem(storeId)
		if(localStorageRef){
			this.setState({order: JSON.parse(localStorageRef)});
		}
		this.ref = base.syncState(`${storeId}/fishes`, {
			context: this,
			state: 'fishes'
		});
		this.ref = base.syncState(`${storeId}/fruits`, {
			context: this,
			state: 'fruits'
		});
	}

	componentDidUpdate(){
		localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
	}

	componentWillUnmount(){
		base.removeBinding(this.ref)
	}


	addFish = (fish) => {
		//1. Take a copy of existing state
		const fishes = {...this.state.fishes};
		//2. Add new fish to that fishes variable
		fishes[`fish${Date.now()}`] = fish;
		//3. Set new fishes object to state
		this.setState({
			fishes: fishes
		});
		//or ES6 this.setState({fishes});
		console.log(this.state);

	};

	updateFish = (key, updatedFish) => {
		//1. Take copy of current state
		const fishes = {...this.state.fishes};
		//2. Update that state
		fishes[key] = updatedFish;
		//3. Set that to state
		this.setState({fishes});
	}

	deleteFish = (key) => {
		//1.Take a copy of state
		const fishes = {...this.state.fishes}
		//2. Update that state
		fishes[key] = null;
		//3. Set that to state
		this.setState({fishes});
	}

	addToOrder = (key) => {
		//Copy of state
		const order = {...this.state.order}
		//Either add to order or update number
		order[key] = order[key] + 1 || 1
		//Call setState to update state
		this.setState({order});	
	}

	removeFromOrder = (key) => {
		//Copy of state
		const order = {...this.state.order}
		//Update that state
		delete order[key]
		//Set that to state
		this.setState({order})
	}

	loadSampleFishes = () => {
		this.setState({fishes : sampleFishes});
	}

	loadSampleFruits = () => {
		this.setState({fruits : sampleFruits});
	}

	render(){
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header 
						tagline="Fresh Seafood Market"
					/>
					<ul className="fishes">
						{Object.keys(this.state.fishes)
							.map(key => 
								<Fish 
									key={key} 
									details={this.state.fishes[key]} 
									addToOrder={this.addToOrder}
									index={key}
								/>)
						}
						{Object.keys(this.state.fruits)
							.map(key => 
								<Fruit 
									key={key} 
									details={this.state.fruits[key]} 
									addToOrder={this.addToOrder}
									index={key}
								/>)
						}
					</ul>
				</div>
				<Order 
					fishes = {this.state.fishes} 
					fruits = {this.state.fruits} 
					order = {this.state.order}
					removeFromOrder = {this.removeFromOrder}/>
				<Inventory 
					fishes = {this.state.fishes} 
					addFish={this.addFish} 
					updateFish={this.updateFish}
					deleteFish={this.deleteFish}
					loadSampleFishes = {this.loadSampleFishes}
					loadSampleFruits = {this.loadSampleFruits}
					storeId = {this.props.match.params.storeId}/>
			</div>
			);
	}
}

export default App;