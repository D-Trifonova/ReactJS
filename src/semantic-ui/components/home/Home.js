import "./Home.css";
import { Container, FormControl, InputGroup, Row } from "react-bootstrap";
import FoodTable from "../foods/food-table/FoodTable";
import { useEffect, useMemo, useState } from "react";
import { getAll } from "../../services/foods-service";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState();
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);

  useEffect(() => {
    getAll()
    .then((res) => {
      setFoods(res);
    })
  }, [])

  const selectFood = (id) => {
    setFilteredFoods((prevFoods) => {
      const isFiltered = prevFoods.some(x => x.id === id) 
      if (isFiltered) {
        return prevFoods;
      }

      const newFilteredFood = foods.find(f => f.id === id);
      return [
        ...prevFoods,
        newFilteredFood,
      ]
    });
  };

  const removeSelected = (id) => {
    setFilteredFoods((prevFoods) => prevFoods.filter(x => x.id !== id));
  }

  const onInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const visibleFoods = useMemo(() => {
    return searchTerm
      ? foods.filter(f => f.description.toLowerCase().includes(searchTerm.toLowerCase()))
      : foods;
  }, [searchTerm, foods]);

  return (
    <Container>
      <Row>
        <FoodTable isFiltered foods={filteredFoods} removeSelected={removeSelected}/>
      </Row>
      <Row>
        <InputGroup className="mb-3">
          <InputGroup.Text>
            Search                      
          </InputGroup.Text>
          <FormControl
            value={searchTerm}
            placeholder="Search for food..." 
            aria-label="Search for food..."
            aria-describedby="basic-addon2"
            onChange={onInputChange}
          />
        </InputGroup>
      </Row>
      <Row>
        <FoodTable 
          foods={visibleFoods} 
          selectFood={selectFood}
        />
      </Row>
    </Container>
  );
}
