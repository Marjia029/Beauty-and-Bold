import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listProductDetails } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/userConstants'


 function ProductEditScreen({match, history}) {

    const productId = match.params.id

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    

    // const [password, setPassword] = useState('')
    // const [password, setPassword] = useState('')

    const dispatch = useDispatch()


    const productDetails = useSelector(state => state.productDetails)
    const {error, loading, product} = productDetails

    // const userUpdate = useSelector(state => state.userUpdate)
    // const {error: errorUpdate, loading: loadingUpdate, success: successUpdate} = userUpdate

    useEffect(() => {
        // if (successUpdate) {
        //     dispatch({ type: USER_UPDATE_RESET })
        //     history.push('/admin/userlist')
        // } else {
            if (!product.name || product._id !== Number(productId)) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setImage(product.image)
                setPrice(product.price)
                setCategory(product.category)
                setBrand(product.brand)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        //}


    }, [dispatch, product, productId, history])

    const submitHandler = (e) => {
        e.preventDefault()
        //dispatch(updateUser({ _id: user._id, name, email, isAdmin }))
        // if( password !== confirmPassword){
        //     setMessage('Password do not match')
        // }else{
        //     dispatch(register(name, email, password))
        // }
       
        //console.log('lellleellellelle')
    }
    return (
        <div>
            <Link to='/admin/productlist'>
                    Go Back
                    
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
 
                {/* {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>} */}

                {loading ? <Loader/> : error? <Message variant='danger'>{error}</Message> : (

                    <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                // required
                                type='text'
                                placeholder='Enter product name'
                                value={name}
                                onChange={(e)=> setName(e.target.value)}

                            >

                            </Form.Control>

                    </Form.Group>
                    <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                //required
                                type='text '
                                placeholder='choose image '
                                value={image}
                                onChange={(e)=> setImage(e.target.value)}

                            >

                            </Form.Control>

                    </Form.Group>


                    <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="Number"
                                    placeholder='Enter product price'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.checked)}
                                >

                                </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                //required
                                type='text'
                                placeholder='Enter Category name '
                                value={category}
                                onChange={(e)=> setCategory(e.target.value)}

                            >

                            </Form.Control>

                    </Form.Group>

                    <Form.Group controlId='brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                //required
                                type='text'
                                placeholder='Enter Brand name '
                                value={brand}
                                onChange={(e)=> setBrand(e.target.value)}

                            >

                            </Form.Control>

                    </Form.Group>

                    <Form.Group controlId="countInStock">
                            <Form.Label>CountInStock</Form.Label>
                                <Form.Control
                                    type="Number"
                                    placeholder='Enter CountInStock'
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.checked)}
                                >

                                </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                //required
                                type='text'
                                placeholder='Enter Description '
                                value={description}
                                onChange={(e)=> setDescription(e.target.value)}

                            >

                            </Form.Control>

                    </Form.Group>


                    




                    <h3><Button type='submit' variant='warning'>
                    Update
                        </Button> </h3>
                    </Form>


                )}
                
                


            </FormContainer> 
        </div>
    )
}
export default ProductEditScreen
