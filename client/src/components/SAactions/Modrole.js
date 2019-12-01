import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { modrolea } from "../../actions/authActions";
import classnames from "classnames";
import { Link } from "react-router-dom";

class modrole extends Component{
    constructor() {
        super();
        this.state = {
          role: "",
          rolechange: "",
          oldname:"",
          results:{},
          errors: {}
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.results){
        this.setState({
          results : nextProps.results
        });

      }
      if (nextProps.errors) {
            this.setState({
              errors: nextProps.errors
            });
          
      }
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    
      onSubmit = e => {
        e.preventDefault();
    
        const roleAndRolechange = {
          role: this.state.role,
          rolechange: this.state.rolechange
        };
        this.setState({
          errors: {},
          results : {}
        });
        this.props.modrolea(roleAndRolechange);
    };

      render() {
        var { errors } = this.state;
        var { results }= this.state;
        
        return [
    <body>
        <div class = "col s12">
            <nav>
            <div class="nav-wrapper blue">
              <ul id="nav-mobile" class="left hide-on-med-and-down">  
                <li><Link to="/sadashboard"> <b>Home</b></Link></li>              
                <li><Link to="/assignrole">Assign Role</Link></li>
                <li><Link to="/addrole">Add Role</Link></li>
                <li><Link to="/delrole">Delete Role</Link></li>
                <li><Link to="/modrole">Modify Role</Link></li>
                <li><Link to="/addlinks">Add Links</Link></li>
                <li><Link to="/dellinks">Delete Links</Link></li>
                <li><Link to="/modlinks">Modify Links</Link></li>
                <li><Link to="/linksofarole">Links of a Role</Link></li>  
                <li><b>Company XYZ - SuperAdmin Tools</b></li>
              </ul>
            </div>
            </nav>
        </div>
      </body>,
            <div style={{ marginTop: "10rem" }} className="row">
                <div className = "col s6 offset-s3"><b>
                    Provide the role name you want to update and the new role name to assign
                    </b>
                </div>
              <div className="col s8 offset-s2">   
                <form noValidate onSubmit={this.onSubmit}>

                  <div className="input-field col s5">
                    <input
                      onChange={this.onChange}
                      value={this.state.role}
                      error={errors.email}
                      id="role"
                      type="text"
                      className={classnames("", {
                        invalid: errors.role
                      })}
                    />
                    <label htmlFor="role">Role</label>
                    <span className="red-text">
                      {errors.role}
                    </span>
                  </div>

                  <div className="input-field col s5">
                    <input
                      onChange={this.onChange}
                      value={this.state.rolechange}
                      error={errors.rolechange}
                      id="rolechange"
                      type="text"
                      className={classnames("", {
                        invalid: errors.rolechange
                      })}
                    />
                    <label htmlFor="rolechange">Role Change</label>
                    <span className="red-text">
                      {errors.rolechange}
                    </span>
                  </div>

                  <div className="col s6 offset-s5" style={{ paddingLeft: "11.250px" }}>
                    <button
                      style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                      }}
                      type="submit"
                      className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                    >
                      submit
                    </button>
                  </div>
                </form>
              </div>
            </div>,
            <div style={{ marginTop: "2rem" }} className="row">
            <div className = "col s6 offset-s4"><b>
                The role's new name: {results.role}
                </b>
            </div>
          </div>
          

        ];
      }

}
modrole.propTypes = {
    modrolea: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    results: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
  results: state.results
});

export default connect(
    mapStateToProps,
    { modrolea }
  )(modrole);