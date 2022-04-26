import React, {useState, useEffect} from 'react'
//import { Link } from 'react-router-dom'
import { Form, Button, Col, FormCheck } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
//import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

function PaymentScreen({history}) {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('Paypal')

    if(!shippingAddress.address){
        history.push('/shiping')
    }

    const submitHandler = (e) =>{
        e.preventDefault()

        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeOrder')
    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3/>

        <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Col>
                <FormCheck
                    type='radio'
                    label='Bkash'
                    id='Bkask'
                    //checked
                    onChange={(e)=> setPaymentMethod(e.target.value)}
                
                >
                

                </FormCheck>
                <FormCheck
                    type='radio'
                    label='Rocket'
                    id='rocket'
                    //checked
                    onChange={(e)=> setPaymentMethod(e.target.value)}
                
                ></FormCheck>
                <FormCheck
                    type='radio'
                    label='Paypal Or CreditCard'
                    id='paypal'
                    checked
                    onChange={(e)=> setPaymentMethod(e.target.value)}
                
                ></FormCheck>
            </Col>
                

            </Form.Group>

            <h3><Button type='submit' variant='warning'>
                   Continue
                </Button> </h3>

        </Form>

    </FormContainer>
  )
}

export default PaymentScreen