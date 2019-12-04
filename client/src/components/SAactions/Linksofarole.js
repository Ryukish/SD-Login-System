import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { linksofrole } from "../../actions/authActions";
import classnames from "classnames";
import { Link } from "react-router-dom";


class linksofarole extends Component{
    constructor() {
        super();
        this.state = {
          role: "",
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
        var role= {
            role: this.state.role

        };
        this.setState({
          errors: {},
          results : {}
        });
        this.props.linksofrole(role);
    };

      render() {
        var { results }=this.state;
        var { errors } = this.state;
        var mes1="";
        var mes2="";
        var mes3="";
        if(results.links){
          mes1 = "The role ";
          mes2=" has these links ";
          var i;
          for(i = 0; i<results.links.length; i++){
            mes3+= "["+results.links[i] + "] ";
          }
          mes3 = mes3.replace("[null]","");
          mes3 = mes3.replace("[]","");
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
                <div className = "col s6 offset-s3"><b>
                  Links of a role: Give the role name
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
            <div className = "col s8 offset-s2" style={{ paddingLeft: "11.250px" }}><b>
                {mes1}{results.role}{mes2}{mes3}
                </b>
            </div>
          </div>
          

        ];
      }

}
linksofarole.propTypes = {
    linksofrole: PropTypes.object.isRequired,
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
    { linksofrole }
  )(linksofarole);