import React, {useState, useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listOrders } from '../actions/orderActions'

function OrderListScreen({history}) {

    const dispatch = useDispatch()

    const orderList = useSelector( state => state.orderList)
    const{loading, error, orders} = orderList

    const userLogin = useSelector( state => state.userLogin)
    const{userInfo} = userLogin


    // useEffect(() => {
        
    //     dispatch(listUsers())
        
    // }, [dispatch])

  

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            history.push("/login")
        }
    }, [dispatch, history, userInfo])

    return (
        <div>
            <h1>Orers</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ): (
                <Table striped responsive bordered hover className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User</th>
                            <th>date</th>
                            <th>totalPrice</th>
                            <th>paid</th>
                            <th>delivered</th>
                            <th></th>
                        </tr>
                    </thead>

                    
                    <tbody>
                        {orders.map((order)=> (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>Tk{order.totalPrice}</td>
                                 
                                <td>{order.isPaid ? (
                                    order.paidAt.substring(0,10)
                                ) : (
                                    <i className='fas fa-times' style={{color : 'red'}}></i>
                                )}</td>

                             

                                <td>{order.isDelivered? (
                                    <i className='fas fa-check' style={{color : 'green'}}></i>
                                ) : (
                                    <i className='fas fa-times' style={{color : 'red'}}></i>
                                )}</td>

                                <td>

                                    <LinkContainer to={`/order/${order._id}/`}>
                                        <Button variant = 'light ' className='btn-sm'>
                                            Details
                                        </Button>
                                    </LinkContainer>
                                    
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </Table>
            )}
        </div>
    )
}

export default OrderListScreen