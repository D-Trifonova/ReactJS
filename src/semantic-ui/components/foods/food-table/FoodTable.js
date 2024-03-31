import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function FoodTable({ isFiltered, foods, selectFood, removeSelected }) {
  const navigate = useNavigate();
  
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {isFiltered && <th>Action</th>}
          <th>Description</th>
          <th>Kcal</th>
          <th>Protein (g)</th>
          <th>Fat (g)</th>
          <th>Carbs (g)</th>
        </tr>
      </thead>
      <tbody>
        {foods.map((food, index) => (
          <tr key={index} onClick={() => !isFiltered && selectFood(food.id)}>
            {isFiltered && (
              <td>
                <Button 
                  variant="outline-secondary"
                  onClick={() => navigate(`/details/${food.id}`)}
                >
                  View
                </Button>
                <Button 
									className="mx-2"
									variant="outline-danger"
									onClick={() => removeSelected(food.id)}
								>
									Remove
								</Button>
              </td>
            )}
            <td>{food.description}</td>
            <td>{food.kcal}</td>
            <td>{food.protein}</td>
            <td>{food.fat}</td>
            <td>{food.carbs}</td>
          </tr>
        ))}
				{isFiltered && (
        <tr>
          <td colSpan={isFiltered ? 2 : 0}>Total</td>
					<td>
						{+foods.reduce((acc, food) => acc + food.kcal, 0).toFixed(2)}
					</td>
					<td>
						{+foods.reduce((acc, food) => acc + food.protein, 0).toFixed(2)}
					</td>
					<td>
						{+foods.reduce((acc, food) => acc + food.fat, 0).toFixed(2)}
					</td>
					<td>
						{+foods.reduce((acc, food) => acc + food.carbs, 0).toFixed(2)}
					</td>
        </tr>
				)}
      </tbody>
    </Table>
  );
}
