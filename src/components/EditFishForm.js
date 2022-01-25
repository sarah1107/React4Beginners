import React from 'react';
import PropTypes from "prop-types";

class EditFishForm extends React.Component{

	static propTypes = {
		fish: PropTypes.shape({
			image : PropTypes.string, 
			name : PropTypes.string, 
			price : PropTypes.number,
			desc : PropTypes.string, 
			status : PropTypes.string
		}),
		index: PropTypes.string,
		updateFish: PropTypes.func
	}
	handleChange = (e) => {
		//Update that fish
		//1. Take copy of fish
		const updatedFish = {
			...this.props.fish,
			[e.currentTarget.name] : e.currentTarget.value
		}
		this.props.updateFish(this.props.index, updatedFish);
	}
	render(){
		return (
		<div className="fish-edit">
			
			<input type="text" name="name" onChange={this.handleChange} value={this.props.fish.name}/>
			<input type="text" name="price" onChange={this.handleChange}value={this.props.fish.price}/>
			<select type="text" name="status" onChange={this.handleChange}>
				<option value="available">Fresh!</option>
				<option value="unavailable">Sold Out!</option>
			</select>
			<input type="text" name="desc" onChange={this.handleChange} value={this.props.fish.desc}/>
			<input type="text" name="image" onChange={this.handleChange} value={this.props.fish.image}/>

			<button name="deleteFish" onClick={() => this.props.deleteFish(this.props.index)}>Delete</button>
		</div>)
	}
}

export default EditFishForm;