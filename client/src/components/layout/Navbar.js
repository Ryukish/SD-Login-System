import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
class Navbar extends Component {

    renderNavLinks = () => {
        let that = this
        const userType = this.props.auth.user.userType
        const navLinks = [
            [
                { name: 'Manage User Accounts', redirectTo: '/global' },
                // { name: 'Assign Roles', redirectTo: '/admin' },
                { name: 'Help Desk', redirectTo: '/global' },
            ],
            [
                { name: 'Manage User Accounts', redirectTo: '/global' },
                // { name: 'Assign Roles', redirectTo: '/admin' },
                { name: 'Help Desk', redirectTo: '/global' },
                { name: 'Finance Reports', redirectTo: '/finance' },
                { name: 'Accounts Payable', redirectTo: '/finance' },
                { name: 'Accounts Receivables', redirectTo: '/finance' },
                { name: 'Tax', redirectTo: '/finance' },
            ],
            [
                { name: 'Manage User Accounts', redirectTo: '/global' },
                // { name: 'Assign Roles', redirectTo: '/admin' },
                { name: 'Help Desk', redirectTo: '/global' },
                { name: 'Sales Reports', redirectTo: '/sales' },
                { name: 'Sales Leads', redirectTo: '/sales' },
                { name: 'Sales Demo', redirectTo: '/sales' },
            ],
            [
                { name: 'Manage User Accounts', redirectTo: '/global' },
                // { name: 'Assign Roles', redirectTo: '/admin' },
                { name: 'Help Desk', redirectTo: '/global' },
                { name: 'New Hire', redirectTo: '/HR' },
                { name: 'On-boarding', redirectTo: '/HR' },
                { name: 'Benefits', redirectTo: '/HR' },
                { name: 'Payroll', redirectTo: '/HR' },
                { name: 'Terminations', redirectTo: '/HR' },
                { name: 'HR Reports', redirectTo: '/HR' },
            ],
            [
                { name: 'Manage User Accounts', redirectTo: '/global' },
                // { name: 'Assign Roles', redirectTo: '/admin' },
                { name: 'Help Desk', redirectTo: '/global' },
                { name: 'Application Monitoring', redirectTo: '/engineering' },
                { name: 'Tech Support', redirectTo: '/engineering' },
                { name: 'App Development', redirectTo: '/engineering' },
                { name: 'App Admin', redirectTo: '/engineering' },
                { name: 'Release', redirectTo: '/engineering' },
            ],
            [
                { name: 'Manage User Accounts', redirectTo: '/admin' },
                // { name: 'Assign Roles', redirectTo: '/admin' },
                { name: 'Finance', redirectTo: '/finance' },
                { name: 'Sales', redirectTo: '/sales' },
                { name: 'HR', redirectTo: '/HR' },
                { name: 'Engineering', redirectTo: '/engineering' },

            ],
            [
                { name: 'Unauthorized User: Contact Super Admin for Roles!', redirectTo: '/admin' },


            ]
        ]
        switch (userType) {

            case 'ADMIN':
                return navLinks[0].map((item) => {
                    return (
                        <li><Link to={item.redirectTo} className="black-text">{item.name}</Link></li>
                    )
                })
                break
            case 'FINANCE_ADMIN':
                return navLinks[1].map((item) => {
                    return (
                        <li><Link to={item.redirectTo} className="black-text">{item.name}</Link></li>
                    )
                })
                break
            case 'SALES_ADMIN':
                return navLinks[2].map((item) => {
                    return (
                        <li><Link to={item.redirectTo} className="black-text">{item.name}</Link></li>
                    )
                })
                break
            case 'HR_ADMIN':
                return navLinks[3].map((item) => {
                    return (
                        <li><Link to={item.redirectTo} className="black-text">{item.name}</Link></li>
                    )
                })
                break
            case 'ENGG_ADMIN':
                return navLinks[4].map((item) => {
                    return (
                        <li><Link to={item.redirectTo} className="black-text">{item.name}</Link></li>
                    )
                })
                break
                case 'SUPERADMIN':
                    return navLinks[5].map((item) => {
                        return (
                            <li><Link to={item.redirectTo} className="black-text">{item.name}</Link></li>
                        )
                    })
                    break
                    case 'unassigned_role':
                        return navLinks[6].map((item) => {
                            return (
                                <li><Link to={item.redirectTo} className="black-text">{item.name}</Link></li>
                            )
                        })
                        break
        }
    }

    render() {
        return (
            <div className="navbar">
                <nav className="z-depth-0">
                    <div className="nav-wrapper white">
                        <Link
                            to="/dashboard"
                            style={{
                                fontFamily: "monospace"
                            }}
                            className="col s12 brand-logo right black-text"
                        >
                            <i className="material-icons">code</i>
                            COSC 4351 PROJECT
                        </Link>
                        <ul id="nav-mobile" className="left hide-on-med-and-down">
                            {this.renderNavLinks()}
                        </ul>

                    </div>
                </nav>
            </div>
        );
    }
}

// export default Navbar;
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps
)(Navbar);