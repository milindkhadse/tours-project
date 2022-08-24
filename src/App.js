import { useEffect, useState } from "react";
import "./App.css";
import Tours from "./components/Tours";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import DrawerAppBar from "./components/NavBar";
import Footer from "./components/Footer";
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

  const removeTour = (id) => {
    const newTour = tours.filter((tour) => {
      return tour.id !== id;
    });
    setTours(newTour);
  };

  useEffect(() => {
    fetchTours();
  }, []);

  if (loading) {
    return (
      <>
        <DrawerAppBar />
        <Container maxWidth="sm" sx={{ mt: 14 }}>
          <Typography variant="h3" gutterBottom>
            Loading...
          </Typography>
        </Container>
        <Footer />
      </>
    );
  }

  if (errorFlag) {
    return (
      <>
        <DrawerAppBar />
        <Container maxWidth="sm" sx={{ mt: 14 }}>
          <Alert severity="error">Data not available.</Alert>
        </Container>
        <Footer />
      </>
    );
  }

  if (tours.length === 0) {
    return (
      <>
        <DrawerAppBar />
        <Container maxWidth="sm" align="center" sx={{ mt: 14 }}>
          <Typography variant="h3" gutterBottom>
            No tours found
          </Typography>
          <Button
            variant="outlined"
            onClick={() => fetchTours()}
            sx={{ mt: 4, mb: 8 }}
          >
            Reset
          </Button>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <DrawerAppBar />
      <Container maxWidth="sm" sx={{ mt: 14 }}>
        <Tours tours={tours} removeTour={removeTour} />
      </Container>
      <Footer />
    </>
  );
}

export default App;
