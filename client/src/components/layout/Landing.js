import React from 'react'

const Landing = () => {
    return (
    <section className="landing">
        <div className="dark-overlay">
          <div className="landing__inner">
            <h1 className="x-large">Worker Connector</h1>
            <p className="lead">
              Create a worker profile/portfolio, share posts and get help from
              other developers
            </p>
            <div className="landing__buttons">
              <a href="register.html" className="btn btn-primary">Sign Up</a>
              <a href="login.html" className="btn btn-light">Login</a>
            </div>
        </div>
      </div>
    </section>
    )
}

export default Landing
