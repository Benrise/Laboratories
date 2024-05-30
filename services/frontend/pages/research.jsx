import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Box, Heading, Text, Input, Spinner, Link } from "@chakra-ui/react";
import axios from "axios";
import { NextSeo } from "next-seo";
import { format } from "@formkit/tempo";
import { debounce } from "lodash";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";

const Research = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const debouncedFetchData = debounce((query) => {
    setLoading(true);
    axios
      .get(`http://localhost/api/v1/publications/?page=1&query=${query}`)
      .then((response) => {
        setData(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
        setData([]);
        setLoading(false);
      });
  }, 1000);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost/api/v1/publications/?page=1");
      const publications = response.data.results;

      const publicationsWithMdx = await Promise.all(
        publications.map(async (publication) => {
          if (publication.description) {
            const mdxSource = await serialize(publication.description);
            return { ...publication, mdxSource };
          }
          return publication;
        })
      );

      return publicationsWithMdx;
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchData().then((data) => setData(data));
  }, []);

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    debouncedFetchData(value);
  };

  const containerVariant = {
    start: {
      y: 20,
      opacity: 0,
      transition: { staggerChildren: 0.25 },
    },
    end: {
      y: 0,
      opacity: 1,
      transition: { staggerChildren: 0.25 },
    },
    exit: { opacity: 0, transition: { duration: 0.1 } },
  };

  return (
    <Box px={{ default: 6, md: 4 }} maxWidth="7xl" pt={128} margin="auto">
      <NextSeo title="Работы" description="Past research by our members" />
      <Heading mt="2" fontSize={{ base: "2xl", lg: "3xl" }}>
        Работы
      </Heading>
      <Text>Все исследовательские работы лаборатории</Text>
      <Input
        mt="4"
        placeholder="Поиск..."
        value={searchTerm}
        onChange={handleSearch}
        background={"white"}
      />
      <Box overflow="auto" mt="6" background={"white"}>
        {loading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : (
          <Box w="full" overflow="auto">
            <Box as="table" width="full" textAlign="left">
              <Box as="thead" fontWeight="bold">
                <Box as="tr">
                  <Box as="th" borderWidth={1} p={2}>
                    Название
                  </Box>
                  <Box as="th" borderWidth={1} p={2}>
                    Описание
                  </Box>
                  <Box as="th" borderWidth={1} p={2}>
                    Авторы
                  </Box>
                  <Box as="th" borderWidth={1} p={2}>
                    Опубликовано
                  </Box>
                </Box>
              </Box>
              <Box as="tbody">
                {data.map((item, idx) => (
                  <Box as="tr" key={idx}>
                    <Box as="td" borderWidth={1} p={2}>
                      <Link color={"blue.500"} href={`/research/${item.id}`} passHref>
                        <a>{item.name}</a>
                      </Link>
                    </Box>
                    <Box as="td" borderWidth={1} p={2}>
                      {item.mdxSource ? (
                        <MDXRemote {...item.mdxSource} />
                      ) : (
                        item.description
                      )}
                    </Box>
                    <Box as="td" borderWidth={1} p={2}>
                      {item.authors}
                    </Box>
                    <Box as="td" borderWidth={1} p={2}>
                      {item.publication_date ? format(item.publication_date, "DD.MM.YYYY") : "-"}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Research;
