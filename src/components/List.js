import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';

function List(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  //const apiUrl = "http://localhost:3000/api/v1/products";
  const apiUrl = "http://localhost:8080/api/notes/";

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const showDetail = (id) => {
    props.history.push({
      pathname: '/show/' + id
    });
  }

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }
      <div>
            <h1 id='title'>React Dynamic Table</h1>
            <Table id='products' striped bordered hover>
            <thead>
    <tr>
      <th>#</th>
      <th>Title</th>
      <th>Content</th>
     
    </tr>
  </thead>
               <tbody>
      {data.map((item, idx) => (
      <tr key={item.id} action onClick={() => { showDetail(item.id) }}>
               <td>{item.id}</td>
               <td>{item.title}</td>
               <td>{item.content}</td>             
            </tr>            
    ))}
     </tbody>
            </Table>
         </div>

    </div>
  );
}

export default withRouter(List);
