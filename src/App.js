import { useEffect, useState } from "react";
import "./App.css";
import Tours from "./components/Tours";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
const url = "https://course-api.com/react-tours-project";
function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);
  const [errorFlag, seterrorFlag] = useState(false);

  const fetchTours = async () => {
    setLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();
      setLoading(false);
      setTours(data);
    } catch (error) {
      setLoading(false);
      seterrorFlag(error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h3" gutterBottom>
          Loading...
        </Typography>
      </Container>
    );
  }

  if (errorFlag) {
    return (
      <Container maxWidth="sm">
        <Alert severity="error">Data not available.</Alert>
      </Container>
    );
  }

  return (
    <>
      <Container maxWidth="sm">
        <Tours tours={tours} />
      </Container>
    </>
  );
}

export default App;
