import React, {useState, useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

function ProductListScreen({history}) {

    const dispatch = useDispatch()

    const productList = useSelector( state => state.productList)
    const{loading, error, products} = productList

    const userLogin = useSelector( state => state.userLogin)
    const{userInfo} = userLogin

    const productDelete = useSelector( state => state.productDelete)
    const{loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete

    const productCreate = useSelector( state => state.productCreate)
    const{loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = productCreate



    // const userDelete = useSelector( state => state.userDelete)
    // const{success: successDelete} = userDelete

    // useEffect(() => {
        
    //     dispatch(listUsers())
        
    // }, [dispatch])

    const deleteHandler = (id) => {

        
         if (window.confirm("Are you sure you want to delete the product?")) {
            dispatch(deleteProduct(id))
        }
        // console.log('Deleted: ', id)
        }
    
        const createProductHandler = () => {
            dispatch(createProduct())
        }

        //let keyword = history.location.search

    useEffect(() => {

        dispatch({ type: PRODUCT_CREATE_RESET })

        if (!userInfo.isAdmin) {
            history.push("/login")
        }

        if(successCreate){
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts())
        }
    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct])

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                
                <Col className='text-end'>
                        
                    <Button className='my-3' onClick={createProductHandler} variant='warning'>
                        <i className='fas fa-plus'>Create Product</i>
                     </Button>

                </Col>
               
            </Row>
            {loadingDelete && <Loader/>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

            {loadingCreate && <Loader/>}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

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
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>

                    
                    <tbody>
                        {products.map((product)=> (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>Tk{product.price}</td>

                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant = 'light ' className='btn-sm'>
                                        <i className='fas fa-edit' style={{color : 'blue'}}></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        className="btn-sm"
                                        variant="light"
                                        onClick={() => deleteHandler(product._id)}
                                    >
                                        <i className="fas fa-trash" style={{color : 'red'}}></i>
                                    </Button>
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </Table>
            )}
        </div>
    )
}

export default ProductListScreen