import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
//import FormContainer from '../components/FormContainer'
//import CheckoutSteps from '../components/CheckoutSteps'
import { getOrderDetails } from '../actions/orderActions'
//import { ORDER_CREATE_RESET } from '../constants/orderConstants'

function OrderScreen({match}) {

    const orderId = match.params.id
    const dispatch = useDispatch()

    const orderDetails = useSelector(state=> state.orderDetails)

    const{order, error, loading} = orderDetails

    
   

    if(!loading && !error){
       order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2) 
    }
    
    
    
    useEffect(() =>{
       if(!order || !order._id == Number(orderId)){
          dispatch(getOrderDetails(orderId)) 
       }
       
        

    }, [dispatch, order, orderId])

  

  return  loading ? (
      <Loader/>
  ) : error ?(
      <Message variant='danger'> {error}</Message>
  ) : (
    <div>
        <h1>Order: {order._id}</h1>
        
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>shipping</h2>
                        <p><strong>Name: </strong>{order.user.name}</p>
                        <p><strong>Email: </strong><a href= {`mailto: ${order.user.email}`}>{order.user.email}</a></p>
                        <p>
                            <strong>Shipping: </strong>
                            
                            {order.shippingAddress.address}, {order.shippingAddress.city},
                            {' '}
                            {order.shippingAddress.postalCode},
                            {' '}
                            {order.shippingAddress.country} 

                        </p>
                        {order.isDelivered ? (
                            <Message variant="success">
                            Delivered on {order.deliveredAt}
                            </Message>
                        ) : (
                            <Message variant="warning">
                                Not Delivered
                            </Message>
                        )}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                            {order.isPaid ? (
                                <Message variant="success">
                                     Paid on {order.paidAt.substring(0, 10)}{" "}
                                    {order.paidAt.substring(11, 19)}
                                </Message>
                            ) : (
                                <Message variant="warning">
                                    Not Paid
                                </Message>
                            )}
                            

                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items </h2>
                        {order.orderItems.length === 0 ? <Message variant='info'>
                            No ORDER has been made.
                        </Message> : (
                            <ListGroup variant='flush'>
                                {order.orderItems.map((item, index) => (
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
                                <Col>Tk.{order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col>Tk.{order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>Tk.{order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col>Tk.{order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                       
                        
                        
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default OrderScreen