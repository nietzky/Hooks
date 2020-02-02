import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function Create(props) {
  const [note, setNote] = useState({ _id: '', title: '', content: '' });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:8080/api/notes";

  const saveProduct = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { title: note.title, content: note.content};
    axios.post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/show/' + result.data.id)
        //props.history.push('/show/' + result.data._id)
        //props.history.push('/list/' )
      }).catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setNote({...note, [e.target.name]: e.target.value});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
      <Jumbotron>
        <Form onSubmit={saveProduct}>
          <Form.Group>
            <Form.Label>Product Name</Form.Label>
            <Form.Control type="text" name="title" id="title" placeholder="Enter product name" value={note.title} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Product Description</Form.Label>
            <Form.Control as="textarea" name="content" id="content" rows="3" placeholder="Enter product description" value={note.content} onChange={onChange} />
          </Form.Group>
         
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(Create);
