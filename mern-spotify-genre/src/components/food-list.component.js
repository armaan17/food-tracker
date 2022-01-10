import React, {Component} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const Food = props => (
    <tr>
        <td>{props.food.username}</td>
        <td>{props.food.description}</td>
        <td>{props.food.price}</td>
        <td>{props.food.date}</td>
            <a href="#" onClick={() => { props.deleteFood(props.food._id) }}>delete</a>
    </tr>
)

export default class FoodList extends Component{
    constructor(props) {
        super(props);

        this.deleteFood = this.deleteFood.bind(this);

        this.state = {foods: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/food/')
            .then(response => {
                this.setState({ foods: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteFood(id) {
        axios.delete('http://localhost:5000/food/'+id)
            .then(res => console.log(res.date));
            
        this.setState({
            foods: this.state.foods.filter(el => el._id !== id)
        })
    }

    foodList() {
        return this.state.foods.map(currentFood => {
            return <Food food={currentFood} deleteFood={this.deleteFood} key={currentFood._id}/>;
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Foods</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.foodList() }
                    </tbody>
                </table>
            </div>
        )
    }
}