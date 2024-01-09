import "./App.css";
import { useEffect, useState } from "react";
import TableData from "./components/TableData";
import { Container } from "react-bootstrap";

function App() {
  const [data, setData] = useState([]);
  const getProductData = async () => {
    const res = await fetch(
      "https://s3.amazonaws.com/open-to-cors/assignment.json"
    );
    const data = await res.json();
    let productArray = [];
    for (const element in data.products)
      productArray.push(data.products[element]);
    productArray.sort((a, b) => {
      if (a.popularity - b.popularity > 0) return -1;
      else if (a.popularity - b.popularity < 0) return 1;
      else return 0;
    });
    setData(productArray);
    return data;
  };

  useEffect(() => {
    const data = getProductData();
    console.log(data);
  }, []);
  return (
    <Container fluid className="px-0 d-flex flex-row justify-content-center">
      {data.length > 0 && <TableData data={data}></TableData>}
      {!data.length && <p>Loading data...</p>}
    </Container>
  );
}

export default App;
