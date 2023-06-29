import React from 'react'
import { Link } from 'react-router-dom'
import './Error.css'

const Error = () => {
  return (
        <section class="page_404">
	<div class="container">
        <h1>404 Page Not Found!</h1>
		<div class="four_zero_four_bg">
		</div>
		
		<div class="contant_box_404">
		<h3 class="h2">
		Look like you're lost
		</h3>
		
		<p>the page you are looking for not avaible!</p>
        <Link to='/' className='btn btn-success'>Go To Login Page</Link>
	</div>
	</div>
</section>
  )
}

export default Error