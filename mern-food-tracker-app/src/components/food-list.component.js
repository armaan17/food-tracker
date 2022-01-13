import React, {Component} from 'react';
import axios from 'axios';

const Food = props => (
    <tr>
        <td>{props.food.username}</td>
        <td>{props.food.location}</td>
        <td>{props.food.description}</td>
        <td>{props.food.price}</td>
        <td>{props.food.date.split('T')[0]}</td>
            <a href="/#" onClick={() => { props.deleteFood(props.food._id) }}>delete</a>
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
    total = () =>
        this.state.foods.reduce(
            (sum, food) => sum + food.price,0
        )
    render() {
        return (
            <div className="container">
                <h3>Logged Foods</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Added by: </th>
                            <th>Where was it bought: </th>
                            <th>Description of the Food: </th>
                            <th>Price of the Food: </th>
                            <th>When it was purchased: </th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.foodList() }
                    </tbody>            
                </table>
                <h2><center>Total Spent: ${this.total()}</center></h2>
            </div>
        )
    }
}