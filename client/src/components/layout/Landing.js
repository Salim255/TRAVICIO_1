import React from 'react'
import { Link } from 'react-router-dom'

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
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
              <Link to="/login" className="btn btn-light">Login</Link>
            </div>
        </div>
      </div>
    </section>
    )
}

export default Landing
