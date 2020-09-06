import React, { Component } from 'react';
import { Button, Input } from 'reactstrap';
import { Link } from "react-router-dom"

import '../custom.css'

export default class UpdateCompany extends Component {
    static displayName = UpdateCompany.name;

    constructor(props) {
        super(props);
        this.state = {
            name: props.location.state.name,
            country: props.location.state.country,
            city: props.location.state.city,
            street: props.location.state.street,
            zipcode: props.location.state.zipCode,
            nameIsValid: true,
        };
    }

    handleChange = (event) => {

        if(event.target.name === "name") {
            if(event.target.value.length > 0) {
                this.setState({nameIsValid: true})
            } else {
                this.setState({nameIsValid: false})
            }
        }

        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = async () => {
        let company = {
            Id: this.props.location.state.id,
            Name: this.state.name,
            Country: this.state.country,
            City: this.state.city,
            Street: this.state.street,
            ZipCode: this.state.zipcode
        }

        await fetch('/update', {
            method: 'POST',
            body: JSON.stringify(company),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => console.log(response));
    }

    renderErrorMessage = () => {
        if(this.state.nameIsValid) {
            return(<div></div>)
        } else {
            return(<div style={{color: 'red'}}>Invalid company name</div>)
        }
    }

    render() {
        return (
            <div>
                <div style={{padding: '5px'}}><Input placeholder='Company name:' value={this.state.name}  invalid={!this.state.nameIsValid} style={{ width: '180px' }} name='name' onChange={(e) => this.handleChange(e)} /></div>
                <div style={{padding: '5px'}}><Input placeholder='Country:' value={this.state.country} style={{ width: '180px' }} name='country' onChange={(e) => this.handleChange(e)} /></div>
                <div style={{padding: '5px'}}><Input placeholder='City:' value={this.state.city} style={{ width: '180px' }} name='city' onChange={(e) => this.handleChange(e)} /></div>
                <div style={{padding: '5px'}}><Input placeholder='Street:' value={this.state.street} style={{ width: '180px' }} name='street' onChange={(e) => this.handleChange(e)} /></div>
                <div style={{padding: '5px'}}><Input placeholder='Zipcode:' value={this.state.zipcode} style={{ width: '180px' }} name='zipcode' onChange={(e) => this.handleChange(e)} /></div>
                <div style={{padding: '5px'}}>
                    <Link to="/">
                        <Button style={{width: '88px'}} disabled={!this.state.nameIsValid} onClick={() => this.handleSubmit()}>Save</Button>
                    </Link>&nbsp;
                    <Link to="/">
                        <Button style={{width: '88px'}}>Home</Button>
                    </Link>
                </div>
                {this.renderErrorMessage()}
            </div>
        );
    }
}