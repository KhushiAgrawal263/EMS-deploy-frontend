import React from 'react'
import './Loading.css'

const Loading = () => {
  return (
    <div className="Lcontainer">
        <div className="loader">
            <div className="loader--dot"></div>
            <div className="loader--dot"></div>
            <div className="loader--dot"></div>
            <div className="loader--dot"></div>
            <div className="loader--dot"></div>
            <div className="loader--dot"></div>
            <div className="loader--text"></div>
        </div>
    </div>
  )
}

export default Loading