import React from 'react';
import PropTypes from "prop-types";

import { formatPrice } from '../helpers';
import { TransitionGroup, CSSTransition} from 'react-transition-group';

class Order extends React.Component{
	static propTypes = {
		fishes: PropTypes.object,
		fruits: PropTypes.object,
		order: PropTypes.object,
		removeFromOrder: PropTypes.func
	}
	renderFishOrder = (key) => {		
		const fish = this.props.fishes[key];
		const count = this.props.order[key];
		const isAvailable = fish && fish.status === "available"
		const transitionOptions = {
			 classNames:"order",
			 key,
			 timeout:{enter: 500, exit: 500}
		};
		if(!fish) return null; //Make sure fish is reinstated
		if(!isAvailable){
			return (<CSSTransition {...transitionOptions}>
				<li key={key}>
					Sorry, {fish ? fish.name : 'This fish'} is no longer available
				</li>
			</CSSTransition>)		
		}
		return (<CSSTransition {...transitionOptions}>
			<li key={key}>
				<span>
				<TransitionGroup component="span" className="count">
					<CSSTransition 
						classNames="count" 
						key={count}
						timeout={{enter: 500, exit: 500}}>
						<span>{count} </span>
					</CSSTransition>
				</TransitionGroup>	
					lbs x {fish.name} : {formatPrice(count*fish.price)}
					<button onClick={() => this.props.removeFromOrder(key)}>x</button>
				</span>
			</li>
			</CSSTransition>)		
	}

	renderFruitOrder = (key) => {		
		const fruit = this.props.fruits[key];
		const count = this.props.order[key];
		const isAvailable = fruit && fruit.status === "available"
		const transitionOptions = {
			 classNames:"order",
			 key,
			 timeout:{enter: 500, exit: 500}
		};
		if(!fruit) return null; //Make sure fruit is reinstatedts
		if(!isAvailable){
			return (<CSSTransition {...transitionOptions}>
				<li key={key}>
					Sorry, {fruit ? fruit.name : 'This fruit'} is no longer available
				</li>
			</CSSTransition>)		
		}
		return (<CSSTransition {...transitionOptions}>
			<li key={key}>
				<span>
				<TransitionGroup component="span" className="count">
					<CSSTransition 
						classNames="count" 
						key={count}
						timeout={{enter: 500, exit: 500}}>
						<span>{count} </span>
					</CSSTransition>
				</TransitionGroup>	
					lbs x {fruit.name} : {formatPrice(count*fruit.price)}
					<button onClick={() => this.props.removeFromOrder(key)}>x</button>
				</span>
			</li>
			</CSSTransition>)
	}

	render(){
		const orderIds = Object.keys(this.props.order);
		const orderFishIds = Object.keys(this.props.order).filter(item => item.includes("fish"));
		const orderFruitIds = Object.keys(this.props.order).filter(item => item.includes("fruit"));
		const totalFish = orderFishIds.reduce((prev, key) => {
			const fish = this.props.fishes[key];
			const count = this.props.order[key];
			const isAvailable = fish && fish.status === "available"
			if(isAvailable){
				return (prev + count * fish.price)
			}
			return prev;
		}, 0);
		const totalFruit = orderFruitIds.reduce((prev, key) => {
			const fruit = this.props.fruits[key];
			const count = this.props.order[key];
			const isAvailable = fruit && fruit.status === "available"
			if(isAvailable){
				return (prev + count * fruit.price)
			}
			return prev;
		}, 0); 
		const total = totalFish + totalFruit;
		return (
			<div className="order-wrap">
				<h2>Order</h2>
				<TransitionGroup component="ul" className="order">
					<h4>Fish</h4>
					{orderFishIds.map(key => this.renderFishOrder(key))}
					<h4>Fruit</h4>
					{orderFruitIds.map(key => this.renderFruitOrder(key))}
				</TransitionGroup>
				Total : <strong>{formatPrice(total)}</strong>
			</div>
			);
	}
}

export default Order;