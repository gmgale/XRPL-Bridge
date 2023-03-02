import axios from 'axios';
import { useRef } from 'react';
import { Button, Col, Container, Row, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddAddress = () => {
  const address = useRef('');
  const navigate = useNavigate();

  const addAddressHandler = () => {
    let payload = {
      address: address.current.value,
    };
    axios.post('http://localhost:3001/addresses', payload).then(() => {
      navigate('/');
    });
  };

  return (
    <>
      <Container className="mt-2">
        <Row>
          <Col className="col-md-8 offset-md-2">
            <legend>Add New Address Details</legend>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" ref={address} />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formRole">
                <Form.Label>Job Role</Form.Label>
                <Form.Control type="text" ref={role} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formExperience">
                <Form.Label>Experience</Form.Label>
                <Form.Control type="text" ref={experience} />
              </Form.Group> */}
            <Button type="button" variant="primary" onClick={addAddressHandler}>
              Add
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddAddress;
