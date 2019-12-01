import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { modlinks } from "../../actions/authActions";
import classnames from "classnames";
import { Link } from "react-router-dom";


class modlink extends Component{
    constructor() {
        super();
        this.state = {
          role: "",
          links:[],
          linksnew:[],
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
        var roleLinksAndNewLinks = {}
        if(!this.state.links.includes(",")){
            roleLinksAndNewLinks = {
                role: this.state.role,
                links: [this.state.links],
                linksnew: [this.state.linksnew]
            }
        }
        else {
            var li = this.state.links;
            var fin = li.split(',');
            var li2 = this.state.linksnew;
            var fin2 = li2.split(',');
            roleLinksAndNewLinks = {
            role: this.state.role,
            links: fin,
            linksnew: fin2
        }
       };
        this.setState({
          errors: {},
          results : {}
        });
        this.props.modlinks(roleLinksAndNewLinks);
    };

      render() {
        var { errors } = this.state;
        var { results }= this.state;
        var suc = "";
        if(results.nModified === 1){
            suc = "Success";
            errors = {};
          }
        else if (results.nModified === 0 ) {
            suc = "Failed";
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
                    Provide the role name and links you want to add
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

                  <div className="input-field col s12">
                    <input
                      onChange={this.onChange}
                      value={this.state.links}
                      error={errors.role}
                      id="links"
                      type="text"
                      className={classnames("", {
                        invalid: errors.role
                      })}
                    />
                    <label htmlFor="links">Link</label>
                    <span className="red-text">
                      {errors.role}
                    </span>
                  </div>
                  <div className="input-field col s12">
                    <input
                      onChange={this.onChange}
                      value={this.state.linksnew}
                      error={errors.role}
                      id="linksnew"
                      type="text"
                      className={classnames("", {
                        invalid: errors.role
                      })}
                    />
                    <label htmlFor="linksnew">New links</label>
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
            <div className = "col s6 offset-s4"><b>
                {suc}
                </b>
            </div>
          </div>
          

        ];
      }

}
modlink.propTypes = {
    modlinks: PropTypes.object.isRequired,
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
    { modlinks }
  )(modlink);