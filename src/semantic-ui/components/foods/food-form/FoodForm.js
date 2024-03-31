import { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./FoodForm.css";
import { createFood } from "../../../services/foods-service";
import { v4 as uuidv4 } from 'uuid';

export function FoodForm() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [food, setFood] = useState({
    description: '',
    protein: 0,
    fat: 0,
    carbs: 0,
  });

  const onInputChange = (e) => {
    setFood((prevState) => {
      let currentName = e.target.name;
      let currentValue = e.target.value;

      return {
        ...prevState,
        [currentName]: isNaN(currentValue) ? currentValue : parseFloat(currentValue),
      };
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    try {
      createFood({id: uuidv4(), ...food})
      .then(() => {
        navigate(`/`);
      })
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="food-form-wrapper">
      <Form onSubmit={onFormSubmit}>
        {error && <span className="text-danger">{error}</span>}
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={food.description}
            placeholder="Enter Description"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Protein</Form.Label>
          <Form.Control
            type="number"
            name="protein"
            value={food.protein}
            placeholder="Enter Protein"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Fat</Form.Label>
          <Form.Control
            type="number"
            name="fat"
            value={food.fat}
            placeholder="Enter Fat"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Carbs</Form.Label>
          <Form.Control
            type="number"
            name="carbs"
            value={food.carbs}
            placeholder="Enter Carbs"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Kcal</Form.Label>
          <Form.Control
            type="number"
            name="kcal"
            value={food.kcal}
            placeholder="Enter Kcal"
            onChange={onInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Food
        </Button>
      </Form>
    </div>
  );
}
