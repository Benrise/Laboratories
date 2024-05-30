import React, { useEffect, useState } from "react";
import { Box, Button, Heading, Text, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { NextSeo } from "next-seo";
import Link from "../../components/Link";

const News = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost/api/v1/news/?page=1");
      return response.data.results;
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
      return [];
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData().then((data) => setData(data));
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  if (data && data.length) {
    return (
      <Box px={{ default: 6, md: 4 }} maxWidth="7xl" pt={16} margin="auto">
        <Box px={{ default: 6, md: 4 }} maxWidth="7xl" pt={16} margin="auto" display={"flex"} flexDirection={"column"} gap={4}>
          <NextSeo title="Публикации" />
          <Heading mt="2" fontSize={{ base: "2xl", lg: "3xl" }}>
            Публикации
          </Heading>
          <Box style={{ display: "flex", flexFlow: "row wrap", gap: "20px" }}>
            {data.map((ele) => (
              <Box
                maxWidth="7xl"
                style={{
                  display: "flex",
                  flexFlow: "column",
                  padding: "20px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  width: "35rem",
                  backgroundColor: "white"
                }}
              >
                {ele.picture && (
                  <img
                    src={`http://localhost${ele.picture}`}
                    alt={ele.picture}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                )}
                <Heading mt="2" fontSize={{ base: "1xl", lg: "2xl" }}>
                  {ele.title}
                </Heading>
                <Text>{ele.short_content}</Text>
                <Text color="grey">{ele.created_at}</Text>
                <Link
                  route
                  href={`/news/${ele.id}`}
                  fontWeight="bold"
                  style={{ marginTop: "auto" }}
                >
                  <Button
                    style={{
                      width: "100%",
                      color: "black",
                    }}
                  >
                    Читать полностью
                  </Button>
                </Link>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box px={{ default: 6, md: 4 }} maxWidth="7xl" pt={128} margin="auto">
      <Box px={{ default: 6, md: 4 }} maxWidth="7xl" pt={128} margin="auto">
        <NextSeo title="Публикации" />
        <Heading mt="2" fontSize={{ base: "2xl", lg: "3xl" }}>
          Публикаций нет!
        </Heading>
      </Box>
    </Box>
  );
};

export default News;
