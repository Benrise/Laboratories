import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Box, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import { NextSeo } from "next-seo";
import { format } from "@formkit/tempo"

const research = () => {

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
          "http://localhost/api/v1/publications/?page=1",
      );
      return response.data.results
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchData().then((data) => setData(data));
  }, []);


  const MotionBox = motion(Box)
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
    <MotionBox
      initial="start"
      animate="end"
      variants={containerVariant}
      maxW={[null, null, "2xl", "5xl"]}
      m="auto"
      py="50px"
    >
      <Box px={{ default: 6, md: 0 }}>
        <NextSeo title="Работы" description="Past resesearch by our member" />
        <Heading mt="2" fontSize={{ base: "2xl", lg: "3xl" }}>
          Работы
        </Heading>
        <Text>Все исследовательские работы лаборатории</Text>
        <Box overflow="auto" mt="6">
          <Box w="full" overflow="auto">
            <Box as="table" width="full" textAlign="left">
              <Box as="thead" fontWeight="bold">
                <Box as="tr">
                  <Box
                    as="th"
                    borderWidth={1}
                    p={2}
                  >
                    Название
                  </Box>
                  <Box as="th" borderWidth={1} p={2}>
                    Описание
                  </Box>
                  <Box as="th" borderWidth={1} p={2}>
                    Автор
                  </Box>
                  <Box as="th" borderWidth={1} p={2}>
                    Опубликовано
                  </Box>
                </Box>
              </Box>
              <Box as="tbody">
                {data.map((item, idx) => {
                  return (
                    <Box as="tr" key={idx}>
                      <Box as="td" borderWidth={1} p={2}>
                        {item.name}
                      </Box>
                      <Box as="td" borderWidth={1} p={2}>
                        {item.description}
                      </Box>
                      <Box as="td" borderWidth={1} p={2}>
                        {item.authors}
                      </Box>
                      <Box as="td" borderWidth={1} p={2}>
                        { format(item.created_at, "DD.MM.YYYY") }
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </MotionBox>
  );
};

export default research;
