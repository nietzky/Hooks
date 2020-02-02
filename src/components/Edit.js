import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function Edit(props) {
  const [product, setProduct] = useState({ id: '', title: '', content: '' });
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:8080/api/notes/" + props.match.params.id;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setProduct(result.data);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, [apiUrl]);

  const updateProduct = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { title: product.title, content: product.content };
    axios.put(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/show/' + result.data.id)
      }).catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setProduct({...product, [e.target.name]: e.target.value});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
      <Jumbotron>
        <Form onSubmit={updateProduct}>
          <Form.Group>
            <Form.Label>Product Name</Form.Label>
            <Form.Control type="text" name="title" id="title" placeholder="Enter product name" value={product.title} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Product Description</Form.Label>
            <Form.Control as="textarea" name="content" id="content" rows="3" placeholder="Enter product description" value={product.content} onChange={onChange} />
          </Form.Group>
         
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(Edit);
