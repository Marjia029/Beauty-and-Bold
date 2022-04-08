import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'




function LoginScreen({location, history}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }



    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
       dispatch(login(email, password))
        //console.log('Submitted')
    }


    return (
        <FormContainer>
           <h1>Sign In</h1>
           {error && <Message variant='danger'>{error}</Message>}
           {loading && <Loader/>}
           <Form onSubmit={submitHandler}>
               <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}

                    >

                    </Form.Control>

               </Form.Group>


               <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}

                    >

                    </Form.Control>

               </Form.Group>
                
               <h3><Button type='submit' variant='warning'>
                   Sign In
               </Button> </h3>

           </Form>
           <Row className='py-3'>
               <h4><Col>
                        Don't have an account?
                        <Link to={redirect? `/register?redirect=${redirect}` : '/register'}>
                            Resister
                        </Link>
                    </Col> </h4>
           </Row>
           
        </FormContainer>
    )
}

export default LoginScreen