import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleterole } from "../../actions/authActions";
import classnames from "classnames";
import { Link } from "react-router-dom";

class delrole extends Component{
    constructor() {
        super();
        this.state = {
          role: "",
          results:{},
          errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
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
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    
      onSubmit = e => {
        e.preventDefault();
    
        const role = {
          role: this.state.role
        };
        this.setState({
          errors: {},
          results : {}
        });
        this.props.deleterole(role);
    };

      render() {
        var { errors } = this.state;
        var { results }=this.state;
        var mes1="";
        var mes2="";
        
        if(results.deletedCount === 1){
          mes1 = "The role ";
          mes2=" has been deleted";
          errors = {};
        }
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
                <div className = "col 12 offset-s2"><b>
                Delete a role: If the role exists, it will be deleted and any User with the role will have their role changed to "Basic"
                    </b>
                </div>
              <div className="col s8 offset-s2">   
                <form noValidate onSubmit={this.onSubmit}>

                  <div className="input-field col s12">
                    <input
                      onChange={this.onChange}
                      value={this.state.role}
                      error={errors.role}
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

                  <div className="col s6 offset-s4" style={{ paddingLeft: "40.250px" }}>
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
              </div>,
              <div style={{ marginTop: "15rem", paddingLeft: "45.250px"  }} className="row">
                <div className = "col s12 offset-s2"><b>
                    {mes1}{mes2}               
                  </b>
                </div>
              </div>
            </div>
        ];
      }

}
delrole.propTypes = {
    deleterole: PropTypes.object.isRequired,
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
    { deleterole }
  )(delrole);