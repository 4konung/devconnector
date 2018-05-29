import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import EducationRow from './EducationRow';
import {deleteEducation} from '../../store/actions/profile-actions';


const propTypes = {
  profile: PropTypes.object.isRequired,
  deleteEducation: PropTypes.func.isRequired,
}

 class EducationCredentials extends Component {
  render() {
    const {profile:{profile}, deleteEducation} = this.props;
    return (
      <Fragment>
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
            {
              profile.education.map(
                edu => (<EducationRow key={edu._id} {...edu} handleOnDelete={deleteEducation} />)
              )
            }
          </thead>
        </table>
      </Fragment>
    )
  }
}

EducationCredentials.propTypes = propTypes;

const mapStateToProps = ({profile})=> {
  return {
    profile
  }
}

export default connect(mapStateToProps, {deleteEducation})(EducationCredentials);