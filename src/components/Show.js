import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';



function Show(props) {

 


  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:8080/api/notes/" + props.match.params.id;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editProduct = (id) => {
    props.history.push({
      pathname: '/edit/' + id
    });
  };

  const deleteProduct = (id) => {
    setShowLoading(true);
    const note = { title: data.title, content: data.content };
    axios.delete(apiUrl, note)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/list')
      }).catch((error) => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }    
      <Jumbotron>
        <p>{data.title}</p>
        <p>{data.content}</p>
       
        <p>
          <Button type="button" variant="primary" onClick={() => { editProduct(data.id) }}>Edit</Button>&nbsp;
          <Button type="button" variant="danger" onClick={() => { deleteProduct(data.id) }}>Delete</Button>
        </p>
      </Jumbotron>
    </div>
  );
}

export default withRouter(Show);
