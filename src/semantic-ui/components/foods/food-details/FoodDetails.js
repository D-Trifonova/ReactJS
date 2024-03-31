import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./FoodDetails.css";
import { getById, getWikipediaInfo } from "../../../services/foods-service";

export function FoodDetails(props) {
  const params = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [food, setFood] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
      const fetchFood = async () => {
        try {
          debugger;
          const res = await getById(params.id);
          const info = await getWikipediaInfo(res.data[0].description);
          setFood({
            ...res.data[0],
            info,
          });
    
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false); 
      };
    }

    fetchFood();
  }, [params.id]);

  if (isLoading || !food) {
    return (
      <div className="food-form-wrapper">
        <h4>Loading...</h4>
      </div>
    )
  }

  return (
    <div className="food-form-wrapper">
      <Form>
        {error && <span className="text-danger">{error}</span>}
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={food.description}
            disabled
        />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Protein</Form.Label>
          <Form.Control
            type="text"
            name="protein"
            value={food.protein}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Fat</Form.Label>
          <Form.Control
            type="text"
            name="fat"
            value={food.fat}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Carbs</Form.Label>
          <Form.Control
            type="text"
            name="carbs"
            value={food.carbs}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Kcal</Form.Label>
          <Form.Control
            type="text"
            name="kcal"
            value={food.kcal}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Information</Form.Label>
          <Form.Control
            as="textarea"
            name="info"
            rows={4}
            value={food.info}
            disabled
          />
        </Form.Group>
      </Form>
    </div>
  );
}
