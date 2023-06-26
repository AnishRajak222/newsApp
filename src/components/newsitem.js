import React, { Component } from 'react'

export class newsitem extends Component {

  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className="my-3" >
        <div className="card">
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-dark" style={{left: '80%', zIndex: '1'}}>
              {source}
            </span>
          <img src={imageUrl ? imageUrl : "https://scitechdaily.com/images/Gamma-Ray-Burst-Artistic-Illustration-scaled.jpg"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {author ? author : "unknown"} on {new Date(date).toUTCString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default newsitem
