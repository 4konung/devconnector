import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ExperienceRow from './ExperienceRow';
import {deleteExperience} from '../../store/actions/profile-actions';


const propTypes = {
  profile: PropTypes.object.isRequired,
  deleteExperience: PropTypes.func.isRequired,
}

 class ExperienceCredentials extends Component {

  
  
  render() {
    const {profile:{profile}, deleteExperience} = this.props;
    return (
      <Fragment>
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
            {
              profile.experience.map(
                exp => (<ExperienceRow key={exp._id} {...exp} handleOnDelete={deleteExperience} />)
              )
            }
          </thead>
        </table>
      </Fragment>
    )
  }
}

ExperienceCredentials.propTypes = propTypes;

const mapStateToProps = ({profile})=> {
  return {
    profile
  }
}

export default connect(mapStateToProps, {deleteExperience})(ExperienceCredentials);