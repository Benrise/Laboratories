import React from "react";
import style from "./Jumbotron.module.scss";
import {
  Box,
  Heading,
  IconButton,
  Image,
  Link,
  Stack,
  Text,
  useColorMode,
  Button
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaTelegram, FaVk, FaReact } from "react-icons/fa";

const Jumbotron = ({ scrollToGrid, ...props }) => {
  const MotionStack = motion(Stack)
  const MotionLink = motion(Link)
  const { colorMode } = useColorMode();
  const links = [
    {
      name: "vk",
      url: "https://vk.com/mephi_official",
      icon: <FaVk />,
    },
    {
      name: "telegram",
      url: "https://t.me/s/mephi_of",
      icon: <FaTelegram />,
    },
    {
      name: "line",
      url: "https://mephi.ru/",
      icon: <FaReact />,
    },
  ];
  const containerVariant = {
    start: {
      y: 30,
      opacity: 0,
      transition: { staggerChildren: 0.2 },
    },
    end: {
      y: 0,
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
    exit: { opacity: 0, transition: { duration: 0.1 } },
  };


  const linkVariant = {
    start: { y: 20, opacity: 0 },
    end: { y: 0, opacity: 1 },
  };
  return (
    <Box
      h="100vh"
      className={style.bgAnimation}
      _before={colorMode == "dark" && { filter: "invert(80%)" }}
      {...props}
    >
      <MotionStack
        initial="start"
        animate="end"
        exit="exit"
        variants={containerVariant}
        h="full"
        alignItems="center"
        justifyContent={{ base: "center", lg: "unset" }}
        direction={{ base: "column", lg: "row" }}
        m="auto"
        maxW={[null, null, "2xl", "5xl"]}
      >
        <Box p="6">
          <Image
            shadow="lg"
            rounded="full"
            src="/img/miphi/miphi_logo.jpeg"
            fallbackSrc="/img/logo-md.png?lqip"
            w={{ base: "200px", lg: "xl" }}
            alt="Artificial Intelligence logo"
          />
        </Box>
        <Box p="2" textAlign={{ base: "center", lg: "unset" }}>
          <Heading>Состав научно-исследовательских лабораторий НИЯУ МИФИ </Heading>
          <Text>
            Научные проекты, выполняемые в рамках федеральной целевой программы «Исследования и разработки по
            приоритетным направлениям
            развития научно-технологического комплекса
            России на 2014-2020 годы».
          </Text>
          <Stack
            direction="row"
            mt={4}
            justifyContent={{ base: "center", lg: "unset" }}
          >
            {links.map((item, idx) => {
              return (
                <MotionLink
                  key={idx}
                  variants={linkVariant}
                  href={item.url}
                  isExternal
                >
                  <IconButton
                    colorScheme="blue"
                    aria-label={item.name}
                    icon={item.icon}
                  />
                </MotionLink>
              );
            })}
          </Stack>
          <Button mt={4} colorScheme="teal" onClick={scrollToGrid}>
            К составу
          </Button>
        </Box>
      </MotionStack>
    </Box>
  );
};

export default Jumbotron;
