import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'


 function RegisterScreen({location, history}) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    // const [password, setPassword] = useState('')
    // const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }

    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if( password !== confirmPassword){
            setMessage('Password do not match')
        }else{
            dispatch(register(name, email, password))
            history.push(redirect)
            
        }
       
        //console.log('Submitted')
    }
    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
           <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type='name'
                            placeholder='Enter your name'
                            value={name}
                            onChange={(e)=> setName(e.target.value)}

                        >

                        </Form.Control>

                </Form.Group>
                <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            required
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
                        required
                        type='password'
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}

                    >

                    </Form.Control>

                </Form.Group>

                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Confirm your password'
                        value={confirmPassword}
                        onChange={(e)=> setConfirmPassword(e.target.value)}

                    >

                    </Form.Control>

                </Form.Group>

                <h3><Button type='submit' variant='warning'>
                   Sign Up
                    </Button> </h3>
           </Form>

           <Row className='py-3'>
               <h4><Col>
                        Already have an account?
                        <Link to={redirect? `/login?redirect=${redirect}` : '/login'}>
                            Sign In
                        </Link>
                    </Col> </h4>
           </Row>

        </FormContainer>
    )
}
export default RegisterScreen
