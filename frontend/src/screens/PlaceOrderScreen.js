import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
//import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'

function PlaceOrderScreen({history}) {



    const orderCreate = useSelector(state=> state.orderCreate)

    const{order, error, success} = orderCreate

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice>=500 ? 0 : 60).toFixed(2)
    cart.taxPrice = Number(cart.itemsPrice*0.05).toFixed(2)
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    if(!cart.paymentMethod){
        history.push('/payment')
    }

    useEffect(() =>{
        if(success){
            history.push(`/order/${order._id}`)

        }

    }, [success, history])

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,


        }))
    }

  return (
    <div>
        <CheckoutSteps step1 step2 step3 step4/>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>shipping</h2>
                        <p>
                            <strong>Shipping: </strong>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city},
                            {' '}
                            {cart.shippingAddress.postalCode},
                            {' '}
                            {cart.shippingAddress.country} 

                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                            

                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items </h2>
                        {cart.cartItems.length === 0 ? <Message variant='info'>
                            Your cart is empty.
                        </Message> : (
                            <ListGroup variant='flush'>
                                {cart.cartItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>
                                            <Col >
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} X Tk.{item.price} = Tk.{(item.qty*item.price).toFixed(2)}
                                            </Col>
                                            {/* <Col md={2}>

                                                <Form.Control
                                                    as="select"
                                                    value={item.qty}
                                                    onChange={ (e)=> dispatch(addToCart (item.product, Number(e.target.value)))}
                                                >
                                                    {
                                                        [...Array( item.countInStock ).keys () ].map((x)=> (
                                                            <option key={x + 1} value = {x+1}>
                                                                { x + 1 }
                                                            </option>
                                                        ))
                                                    }

                                                </Form.Control>

                                            </Col> */}

                                            {/* <Col md={1}>
                                                <Button
                                                    type='button'
                                                    variant='light'
                                                    onClick={() => removeFromCartHandler(item.product)}
                                                >
                                                    <i className='fas fa-trash'></i>

                                                </Button>
                                            </Col> */}
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                        
                    </ListGroup.Item>

                </ListGroup>

            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Items:</Col>
                                <Col>Tk.{cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col>Tk.{cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>Tk.{cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col>Tk.{cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            {error && <Message variant='danger'>{error}</Message>}
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            <Row>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    variant='warning'
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrder}
                                
                                >
                                Place Order
                                </Button>
                            </Row>
                            
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default PlaceOrderScreen