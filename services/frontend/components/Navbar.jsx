import React, { useRef, useEffect, useState } from "react";
import {
  Box,
  IconButton,
  useColorMode,
  useColorModeValue,
  Stack,
  Text,
  Icon,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  FaSun,
  FaMoon,
  FaBars,
  FaChevronDown,
  FaLanguage,
  FaImages,
} from "react-icons/fa";
import Link from "./Link";
import { useRouter } from "next/router";
const Navbar = () => {
  const router = useRouter();
  const { toggleColorMode } = useColorMode();
  const Icons = useColorModeValue(<FaSun />, <FaMoon />);
  const color = useColorModeValue("gray.800", "white");
  const bgColor = useColorModeValue("white", "#1A202C");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isTop, setIsTop] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      const top = window.scrollY < 20;
      if (top !== isTop) {
        setIsTop(top);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <Box
      style={{
        background: bgColor,
      }}
      w="full"
      position="fixed"
      top
      zIndex={1}
      p={4}
      px={{ base: 4, lg: 5 }}
      d="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Stack direction="row" spacing={5}>
        <Link route href="/" fontWeight="bold" color={color}>
          ЛабораторияМИФИ
        </Link>
        <Stack spacing={5} direction="row" d={{ base: "none", lg: "flex" }}>
          <Link route href="/news" color={color}>
            Публикации
          </Link>
          <Link route href="/research" color={color}>
            Работы
          </Link>
          <Link route href="/about" color={color}>
            О нас
          </Link>
        </Stack>
      </Stack>
      <Stack direction="row">
        <IconButton
          d={{ base: "flex", lg: "none" }}
          variant="transparent"
          w="3vw"
          Р
          onClick={onOpen}
          icon={<FaBars />}
        />
      </Stack>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay zIndex={999}>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              Лаборатории <br></br> НИЯУ МИФИ
            </DrawerHeader>

            <DrawerBody>
              <Stack>
                <Link p="2" route href="/news" color={color}>
                  Публикации
                </Link>
                <Link p="2" route href="/research" color={color}>
                  Работы
                </Link>
                <Link p="2" route href="/about" color={color}>
                  О нас
                </Link>
              </Stack>
            </DrawerBody>

            <DrawerFooter>
              <Text fontSize="sm">НИЯУ МИФИ ❤️</Text>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
};

export default Navbar;
