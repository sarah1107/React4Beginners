import React from 'react';
import PropTypes from "prop-types";

import { formatPrice } from '../helpers';
import { TransitionGroup, CSSTransition} from 'react-transition-group';

class Order extends React.Component{
	static propTypes = {
		fishes: PropTypes.object,
		order: PropTypes.object,
		removeFromOrder: PropTypes.func
	}
	renderOrder = (key) => {		
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

	render(){
		const orderIds = Object.keys(this.props.order);
		const total = orderIds.reduce((prev, key) => {
			const fish = this.props.fishes[key];
			const count = this.props.order[key];
			const isAvailable = fish && fish.status === "available"
			if(isAvailable){
				return (prev + count * fish.price)
			}
			return prev;
		}, 0)
		return (
			<div className="order-wrap">
				<h2>Order</h2>
				<TransitionGroup component="ul" className="order">
					{orderIds.map(key => this.renderOrder(key))}
				</TransitionGroup>
				Total : <strong>{formatPrice(total)}</strong>
			</div>
			);
	}
}

export default Order;