import { Box, Button, Container, Input, VStack, Heading, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useProductStore } from '../store/product';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const [message, setMessage] = useState(""); // State to show message
  const [isError, setIsError] = useState(false); // To differentiate success/error

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);

    setMessage(message); // Update the message to show
    setIsError(!success); // Mark as error if the operation failed

    // Clear the message after 3 seconds
    setTimeout(() => setMessage(""), 3000);

    setNewProduct({ name: "", price: "", image: ""})
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8} marginTop={"30px"}>
          Create a New Product
        </Heading>
        <Box w={"full"} bgColor={"whiteAlpha.200"} p={6} rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>
            <Input
              placeholder={"Product Name"}
              name="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <Input
              placeholder={"Product Price"}
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <Input
              placeholder={"Product Image URL"}
              name="image"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />
            <Button bg="gray" color={"black"} onClick={handleAddProduct} w="full">
              Save
            </Button>

            {/* Message display section */}
            {message && (
              <Text
                color={isError ? "red.500" : "green.500"}
                fontSize="md"
                fontWeight="bold"
              >
                {message}
              </Text>
            )}
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
