import { Box, Grid } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Jumbotron from "../components/Jumbotron";
import LaboratoryCard from "../components/LaboratoryCard";

function LandingPage() {
  const [data, setData] = useState([]);
  const gridRef = useRef(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/api/v1/laboratories/?page=1"
      );
      return response.data.results;
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchData().then((data) => setData(data));
  }, []);

  const scrollToGrid = () => {
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box
      style={{
        overflowY: "scroll",
        height: "100vh",
        scrollSnapType: "y mandatory",
      }}
    >
      <Jumbotron scrollToGrid={scrollToGrid} style={{ scrollSnapAlign: "start" }} />
      <Grid
        ref={gridRef}
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        gap={6}
        p={4}
      >
        {data.map((lab) => (
          <LaboratoryCard key={lab.id} lab={lab} />
        ))}
      </Grid>
    </Box>
  );
}

export default LandingPage;
