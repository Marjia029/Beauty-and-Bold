import React, {useState, useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listUsers } from '../actions/userActions'

function UserListScreen() {

    const dispatch = useDispatch()

    const userList = useSelector( state => state.userList)
    const{loading, error, users} = userList

    useEffect(() => {
        
        dispatch(listUsers())
        
    }, [dispatch])

    // useEffect(() => {
    //     if (userInfo && userInfo.isAdmin) {
    //         dispatch(listUsers())
    //     } else {
    //         history.push("/login")
    //     }
    // }, [dispatch, history, successDelete, userInfo])

    return (
        <div>
            <h1>Users</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ): (
                <Table striped responsive bordered hover className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th></th>
                        </tr>
                    </thead>

                    
                    <tbody>
                        {(users).map(user=> (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>

                            </tr>
                        ))}
                    </tbody>

                </Table>
            )}
        </div>
    )
}

export default UserListScreen