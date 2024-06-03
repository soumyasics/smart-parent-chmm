import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export const RegisterKidForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission (e.g., send data to backend)
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={4} className="d-flex align-items-center justify-content-center">
          {/* Placeholder for Illustration Image */}
          <div className="placeholder-image" style={{ width: '200px', height: '200px', backgroundColor: '#e0e0e0' }}>
            <p className="text-center">Illustration Image</p>
          </div>
        </Col>
        <Col md={6}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                {...register('name', { required: true })}
              />
              {errors.name && <p className="text-danger">Name is required</p>}
            </Form.Group>

            <Form.Group controlId="formDob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                {...register('dob', { required: true })}
              />
              {errors.dob && <p className="text-danger">Date of Birth is required</p>}
            </Form.Group>

            <Form.Group controlId="formBirthWeight">
              <Form.Label>Birth Weight (kg)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter birth weight"
                {...register('birthWeight', { required: true })}
              />
              {errors.birthWeight && <p className="text-danger">Birth Weight is required</p>}
            </Form.Group>

            <Form.Group controlId="formWeight">
              <Form.Label>Weight (kg)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter weight"
                {...register('weight', { required: true })}
              />
              {errors.weight && <p className="text-danger">Weight is required</p>}
            </Form.Group>

            <Form.Group controlId="formHeight">
              <Form.Label>Height (cm)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter height"
                {...register('height', { required: true })}
              />
              {errors.height && <p className="text-danger">Height is required</p>}
            </Form.Group>

            <Form.Group controlId="formParentId">
              <Form.Label>Parent ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter parent ID"
                {...register('parentId', { required: true })}
              />
              {errors.parentId && <p className="text-danger">Parent ID is required</p>}
            </Form.Group>

            <Form.Group controlId="formBloodGroup">
              <Form.Label>Blood Group</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter blood group"
                {...register('bloodGroup', { required: true })}
              />
              {errors.bloodGroup && <p className="text-danger">Blood Group is required</p>}
            </Form.Group>

            <Form.Group controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                {...register('image', { required: true })}
              />
              {errors.image && <p className="text-danger">Image is required</p>}
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

