import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar,Nav,Container,Row, NavDropdown, Button, Form } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useHistory } from 'react-router-dom'
import {logout} from '../actions/userActions'
//import SearchBox from './SearchBox.js'
import SearchBox from './SearchBox'

function Header() {

    


    const [keyword, setKeyword] = useState('')

    // const submitHandler = (e) =>{
    //     e.preventDefault()
    //     if (keyword) {
    //         history.push(`/?keyword=${keyword}`)
    //     } else {
    //         history.push(history.location.pathname) //
    //     }
    // }


    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const dispatch = useDispatch()

     const logoutHandler  = ()=>{
        //  console.log('Logout')
        dispatch(logout)
   }

    return (
        <header>
            <Navbar bg="warning" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>
                            {/* <img
                            src="/bbn.png"
                            width="100"
                            height="40"
                            className="d-inline-block align-top"
                            alt="Beauty&Bold logo"
                        />{' '} */}
                        Beauty&Bold</Navbar.Brand>
                    </LinkContainer>
                    {/* <Navbar.Brand href="#home">
                        <img
                            src="/bb.jpg"
                            width="100"
                            height="30"
                            className="d-inline-block align-top"
                            alt="Beauty&Bold logo"
                        />
                    </Navbar.Brand> */}
                    

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        
                        <Nav className="mr-auto" variant='warning'>

                            <LinkContainer to='/cart'>
                                <Nav.Link><i className="fas fa-shopping-cart">Cart</i> </Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                <NavDropdown title = {userInfo.name} id = 'username'>
                                    <LinkContainer to = '/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                
                                    <Nav.Link ><i className="fas fa-user">LogIn</i></Nav.Link>
                                </LinkContainer>
                                ) }

                            
                            {userInfo && userInfo.isAdmin && (
                                    
                                    <NavDropdown title="Admin Panel" id="adminmenu">
                                        <LinkContainer to="/admin/userlist">
                                            <NavDropdown.Item>
                                                Users
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/admin/productlist">
                                            <NavDropdown.Item>
                                                Products
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/admin/orderlist">
                                            <NavDropdown.Item>
                                                Orders
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>
                            )}
                            
                            
                            
                            
                            
                        </Nav>


                        {/* <Form onSubmit={submitHandler} inline>
                            <Form.Control
                                type = 'text'
                                name='q'
                                onChange={(e)=> setKeyword(e.target.value)}
                                className='mr-sm-2 ml-sm-5'
                            >
                                <Button type='submit' variant='outline-success' className='p-2'>
                                    search
                                </Button>

                            </Form.Control>

                        </Form> */}
                        {/* <Form onSubmit={submitHandler} className="d-flex" inline>
                            <Form.Control
                                type="text"
                                name="q"
                                onChange={(e) => setKeyword(e.target.value)}
                                className="mr-sm-2 ml-sm-5 text-end"
                                placeholder='Search Products'
                            ></Form.Control>
                            <Button type="submit" className="p-2" variant='outline-success'>
                                <i className='fas fa-search'></i>
                            </Button>
                        </Form> */}

                        <SearchBox/>
                       
                                            
                    </Navbar.Collapse>
                </Container>
                </Navbar>
        </header>
    )
}

export default Header
