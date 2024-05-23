import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  SimpleGrid,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import axios from "axios";
import { NextSeo } from "next-seo";
import Link from 'next/link';

const About = () => {
  const MotionBox = motion(Box);
  const bgColor = useColorModeValue("white", "gray.700");
  const itemVariant = {
    start: { y: 20, opacity: 0 },
    end: { y: 0, opacity: 1 },
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

  const [jsonData, setJsonData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost/api/v1/persons/?page=1");
      return response.data.results;
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchData().then((data) => setJsonData(data));
  }, []);

  return (
    <React.Fragment>
      <NextSeo title="О нас" description="Научно-исследовательская лаборатория МИФИ" />
      <MotionBox
        initial="start"
        animate="end"
        variants={containerVariant}
        maxW={[null, null, "2xl", "5xl"]}
        m="auto"
        py="128px"
        textAlign="center"
      >
        <Image
          mt="2"
          alt="Наш состав"
          src="/img/miphi/miphi_lab.jpeg"
          fallbackSrc="/img/miphi/miphi_lab.jpeg"
        />
        <Box px={{ base: 6, md: 0 }}>
          <Heading mt="2" fontSize={{ base: "2xl", lg: "3xl" }}>
            Подробнее о составе научно-исследовательских лабораторий НИЯУ МИФИ
          </Heading>
          <Text mt="2">
            Основная цель состава — проведение массовых и объединенных перспективных научных
            исследований, подготовка высококвалифицированных кадров, разработка
            и проведение современных учебных курсов для завоевания университетом
            НИЯУ МИФИ лидирующих позиций в области информационных технологий
          </Text>
          <Divider mt="2" mb="4" />
          <Heading as="h2" fontSize={{ base: "xl", lg: "2xl" }} mb="4">
            Наши сотрудники
          </Heading>
          {jsonData.length === 0 && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="400"
              style={{ scrollSnapAlign: "start" }}
            >
              Отсутствуют данные о сотрудниках
            </Box>
          )}
          <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={4}>
            {jsonData.map((item, idx) => (
              <Link href={`/persons/${item.id}`} passHref key={idx}>
                <MotionBox
                  as="a"
                  backgroundColor={bgColor}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  p="6"
                  variants={itemVariant}
                  borderWidth="1px"
                  _hover={{ boxShadow: "md", cursor: "pointer" }}
                >
                  <Image src={'/img/miphi/miphi_profile.jpeg'} />
                  <Heading as="h4" fontSize="lg">
                    {item.full_name}
                  </Heading>
                  <Text p="2" textAlign="justify">
                    {item.description}
                  </Text>
                  <Text p="2" textAlign="center">
                    {item.laboratory_titles[0]}
                  </Text>
                </MotionBox>
              </Link>
            ))}
          </SimpleGrid>
        </Box>
      </MotionBox>
    </React.Fragment>
  );
};

export default About;
