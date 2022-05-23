import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'


function SearchBox() {

    let history = useHistory()

    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) =>{
        e.preventDefault()
        if (keyword) {
            history.push(`/?keyword=${keyword}&page=1`)
        } else {
            history.push(history.location.pathname) 
        }
    }

  return (
    <Form onSubmit={submitHandler} className="d-flex" inline>
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
    </Form>
  )
}

export default SearchBox