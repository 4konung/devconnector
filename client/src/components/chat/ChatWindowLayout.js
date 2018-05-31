import React from "react";

export default ({ children }) => {
  return (
    <div className="chat-window">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header bg-dark text-center text-white">
                <h4>Developer Chat</h4>
              </div>
              <div className="card-body">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
