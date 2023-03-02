import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Table, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllAddresses = () => {
  console.log('inside');
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/addresses').then((response) => {
      setAddresses(response.data);
    });
  }, []);

  return (
    <>
      <Container className="mt-2">
        <Row>
          <Col className="col-md-4 offset-md-4">
            <Button
              variant="primary"
              type="button"
              onClick={() => navigate('/add-address')}
            >
              Add
            </Button>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {addresses.map((add) => (
              <tr key={add.id}>
                <td>{add.id}</td>
                <td>{add.address}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default AllAddresses;
