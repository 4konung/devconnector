import React from 'react';
import Spinner from '../common/Spinner';

export default ({children, onSubmitHandler, isLoading}) => {
  return (
    <div className="create-profile">
        <div className="containe">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required fields</small>
              {
                isLoading
                ?
                <Spinner />
                :
                <form onSubmit={onSubmitHandler}>
                {
                  children
                }
                <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>
              }
            </div>
          </div>
        </div>
      </div>
  )
};
