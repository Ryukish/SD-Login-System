import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllUsers, updateUserRole } from "../actions/adminActions";
import $ from 'jquery'

class Admin extends Component {
    constructor() {
        super();
        this.state = {
            role: '',
            users: [],
        };
    }

    // LIFECYCLE METHODS
    componentDidMount() {
        this.props.getAllUsers()
    }
    // END LIFECYCLE METHODS

    // UTILITY FUNCTIONS
    handleNameFormat = (name) => {
        return name.replace(new RegExp('_', 'g'), ' ')
    }

    handleCheckbox = (id) => {
        let users = this.state.users
        let index = users.indexOf(id)
        if (index == -1) {
            users.push(id)
        }
        else {
            users.splice(index, 1)
        }
        this.setState({ users })
    }

    handleSubmit = e => {
        e.preventDefault();

        const data = {
            role: this.state.role,
            users: this.state.users
        };

        this.props.updateUserRole(data);
        this.props.getAllUsers()
    };
    // END UTILITY FUNCTIONS

    // RENDERING FUNCTIONS
    renderUsers = (users) => {
        return users.map((item, index) => {
            return (
                <tr key={index}>
                    <td>
                        <label>
                            <input type="checkbox" onChange={() => this.handleCheckbox(item._id)} />
                            <span></span>
                        </label>
                    </td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{this.handleNameFormat(item.userType)}</td>
                </tr>
            )
        })
    }

    render() {
        const { renderUsers } = this
        const { userType } = this.props.auth.user
        let users = this.props.admin.users
        if (userType == 'SUPERADMIN') {
            if (users) {
                return (

                    <div>
                        <h2>Super Admin Panel</h2>
                        <form onSubmit={this.handleSubmit}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                        </th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderUsers(users)}
                                </tbody>
                            </table>
                            <div>
                                <h2>Select Role To Assign: </h2>
                                <div className="input-field col s12">
                                    <select className='browser-default' name="role" required onChange={(event) => this.setState({ role: event.target.value })}>
                                        <option value="" disabled selected>CHOOSE ROLE</option>
                                        <option value="ADMIN"> ADMIN</option>
                                        <option value="FINANCE_ADMIN"> FINANCE ADMIN</option>
                                        <option value="SALES_ADMIN">SALES ADMIN</option>
                                        <option value="HR_ADMIN">HR ADMIN</option>
                                        <option value="ENGG_ADMIN">ENGG ADMIN</option>
                                        <option value="unassigned_role">-UNASSIGN ROLE-</option>
                                    </select>
                                </div>
                                <button className="btn waves-effect waves-light blue accent-3" type="submit" name="action">Submit
                                <i className="material-icons right">send</i>
                                </button>
                            </div>
                        </form>
                    </div>
                )
            }
            return (
                <p>Loading...</p>
            )
        }
        else {
            return (
                <div>
                    <h3>You Are Not Authorized To Access This Page</h3>
                </div>
            )
        }
    }
    // END RENDERING FUNCTIONS
}

const mapStateToProps = state => ({
    auth: state.auth,
    admin: state.admin,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { getAllUsers, updateUserRole }
)(Admin);