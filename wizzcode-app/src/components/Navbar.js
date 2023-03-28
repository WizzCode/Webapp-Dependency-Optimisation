import React from 'react'

function Navbar() {
  return <nav className="nav">
    <a href="/" className="site-title" style={{textAlign:"right"}}> WizzCode</a>
    <ul>
      <li style={{fontSize:'19px'}}>
        <a href="/Description">Description </a>
      </li>
      <li style={{fontSize:'19px'}}>
        <a href="/About">About </a>
      </li>
    </ul>
  </nav>    
}

export default Navbar