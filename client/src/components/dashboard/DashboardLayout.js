import React from 'react'

export default ({children}) => {
  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4">Dashboard</h1>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
};
