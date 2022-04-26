import React, {useState, useEffect} from 'react'
//import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
//import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'


function ShippingScreen({history}) {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country} ))
        history.push('/payment')
        // if( password !== confirmPassword){
        //     setMessage('Password do not match')
        // }else{
        //     dispatch(register(name, email, password))
        // }
       
        // console.log('Submitted')
    }



  return (
    <FormContainer>
        <CheckoutSteps step1 step2/>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Enter your address'
                    value={address ? address : ''}
                    onChange={(e)=> setAddress(e.target.value)}

                >

                </Form.Control>

            </Form.Group>

            <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Enter your City'
                    value={city ? city : ''}
                    onChange={(e)=> setCity(e.target.value)}

                >

                </Form.Control>

            </Form.Group>

            <Form.Group controlId='postalCode'>
                <Form.Label>Postalcode</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Enter your postal code'
                    value={postalCode ? postalCode : ''}
                    onChange={(e)=> setPostalCode(e.target.value)}

                >

                </Form.Control>

            </Form.Group>

            <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Enter your country'
                    value={country ? country : ''}
                    onChange={(e)=> setCountry(e.target.value)}

                >

                </Form.Control>

            </Form.Group>
            <h3><Button type='submit' variant='warning'>
                   Continue
                </Button> </h3>

        </Form>
    </FormContainer>
  )
}

export default ShippingScreen