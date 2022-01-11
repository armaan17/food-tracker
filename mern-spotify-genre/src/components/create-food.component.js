import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class CreateFood extends Component{
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            location: '',
            description: '',
            price: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0){
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }

    onChangeLocation(e){
        this.setState({
            location: e.target.value
        });
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        });
    }

    onChangePrice(e){
        this.setState({
            price: e.target.value
        });
    }

    onChangeDate(date){
        this.setState({
            startDate: date
        });
    }

    onSubmit(e){
        e.preventDefault();

        const food = {
            username: this.state.username,
            location: this.state.location,
            description: this.state.description,
            price: this.state.price,
            date: this.state.startDate,
        }

        console.log(food);

        axios.post('http://localhost:5000/food/add', food)
            .then(res => console.log(res.data));
        
        window.location = '/';
    }

    render() {
        return (
            <div className="container">
                <h3>Add a new food</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group mb-3">
                        <label>Who's adding the food? </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function(user) {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                        </option>;
                            })
                        }
                        </select>
                    </div>
                    <div className="form-group mb-3">
                        <label>Where did you get the food? </label>
                        <input type = "text"
                            required
                            className="form-control"
                            value={this.state.location}
                            onChange={this.onChangeLocation}
                            />
                    </div>
                    <div className="form-group mb-3">
                        <label>Describe the food: </label>
                        <input type = "text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            />
                    </div>
                    <div className="form-group mb-3">
                        <label>How much did it cost? </label>
                        <input type = "text"
                            required
                            className="form-control"
                            value={this.state.price}
                            onChange={this.onChangePrice}
                            />
                    </div>
                    <div className="form-group mb-3">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={date => this.onChangeDate(date)}
                                type="date"
                                dateFormat= "MM/dd/yyyy"
                            />
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <input type = "submit" value = "Add" className = "btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}