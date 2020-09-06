import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { Pencil, Trash } from 'react-bootstrap-icons';
import '../custom.css';
import { Button } from 'reactstrap';

export default class ListCompanies extends Component {
    static displayName = ListCompanies.name;

    constructor(props) {
        super(props);
        this.state = { 
            companies: []
        };
        this.GetCompanyList();
    }

    componentDidMount() {
        this.GetCompanyList();
    }

    render() {
        return (
            <div>
                {this.renderCompanies(this.state.companies)}
            </div>
        );
    }

    GetCompanyList = async () => {
        const response = await fetch('/api/Companies');
        const data = await response.json();
        this.setState({ companies: data });
    }
    
    DeleteCompany = async (company) => {
        await fetch('/delete', {
            method: 'POST',
            body: JSON.stringify(company),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        this.GetCompanyList();
    }

    renderCompanies = (companies) => {

        if (companies.length > 0) {
            return (
                <div>
                    <table className='table table-striped' aria-labelledby="tabelLabel">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Country</th>
                                <th>City</th>
                                <th>Street</th>
                                <th>ZipCode</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies.map(company =>
                                <tr>
                                    <td>{company.name}</td>
                                    <td>{company.country}</td>
                                    <td>{company.city}</td>
                                    <td>{company.street}</td>
                                    <td>{company.zipCode}</td>
                                    <td><Link to={{pathname: '/Update', state: company}}><Button><Pencil/></Button></Link></td>
                                    <td><Button onClick={() => this.DeleteCompany(company)}><Trash/></Button></td>
                                </tr>
                            )}
                        </tbody>
                    </table >
                    <Link to="/Create"><Button>Add Company</Button></Link>
                </div>
            );
        } else {
            return (
            <div>
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Country</th>
                            <th>City</th>
                            <th>Street</th>
                            <th>ZipCode</th>
                        </tr>
                    </thead>
                </table>
                <Link to="/Create"><Button>Add Company</Button></Link>
            </div>
            )
        }
    }
}