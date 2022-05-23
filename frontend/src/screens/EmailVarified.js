import React from 'react'
import Message from '../components/Message'
import { Link } from 'react-router-dom'

function EmailVarified() {
  return (
    <div>
        <Message>Your account is varified. Please <Link to='/login' className='text-decoration-none' style={{color: 'blue'}}>
                Login
            </Link> to continue.
        </Message>
    </div>
  )
}

export default EmailVarified