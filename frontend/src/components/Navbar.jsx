import React, { useState } from 'react';
import { Container, Flex, HStack, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaPlusSquare } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  // Custom state for light/dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle handler
  const toggleMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <Container maxW="1140px" px={4}>
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDir={{ base: "column", sm: "row" }}
        bg={isDarkMode ? "white" : "gray.800"} // Change background color
        color={isDarkMode ? "black" : "white"}   // Change text color
        p={4}
        borderRadius="md"
      >
        {/* Brand */}
        <Text
          fontSize={{ base: "22px", sm: "32px" }}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
        >
          <Link to="/">Product Store 🛒</Link>
        </Text>

        {/* Buttons */}
        <HStack spacing={4} alignItems="center">
          <Link to="/create">
            <Button bg="gray.500" color="white">
              <FaPlusSquare />
            </Button>
          </Link>

          <Button onClick={toggleMode} bg="gray.500" color="white">
            {isDarkMode ? <IoMoon size="20px" /> : <LuSun size="20px" />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
