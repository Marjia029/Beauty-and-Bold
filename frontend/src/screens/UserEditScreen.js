import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'


 function UserEditScreen({match, history}) {

    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    

    // const [password, setPassword] = useState('')
    // const [password, setPassword] = useState('')

    const dispatch = useDispatch()


    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const {error: errorUpdate, loading: loadingUpdate, success: successUpdate} = userUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/userlist')
        } else {
            if (!user.name || user._id !== Number(userId)) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }


    }, [dispatch, user, userId, successUpdate, history])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: user._id, name, email, isAdmin }))
        // if( password !== confirmPassword){
        //     setMessage('Password do not match')
        // }else{
        //     dispatch(register(name, email, password))
        // }
       
        //console.log('lellleellellelle')
    }
    return (
        <div>
            <Link to='/admin/userlist'>
                    Go Back
                    
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
 
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader/> : error? <Message variant='danger'>{error}</Message> : (

                    <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                // required
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
                                //required
                                type='email'
                                placeholder='Enter your email'
                                value={email}
                                onChange={(e)=> setEmail(e.target.value)}

                            >

                            </Form.Control>

                    </Form.Group>


                    <Form.Group controlId="isadmin">
                                <Form.Check
                                    type="checkbox"
                                    label="Is Admin"
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                ></Form.Check>
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
export default UserEditScreen
