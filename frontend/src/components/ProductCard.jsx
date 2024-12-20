import React, { useState } from "react";
import {
  Box,
  Heading,
  Image,
  Text,
  HStack,
  Button,
  Input,
  VStack,
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useProductStore } from "../store/product";
import CustomModal from "./CustomModal";

const ProductCard = ({ product }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const { deleteProducts, updateProduct } = useProductStore();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProducts(pid);
    alert(success ? message : "Failed to delete product");
  };

  const handleUpdateProduct = async () => {
    const { success, message } = await updateProduct(product._id, updatedProduct);
    setModalOpen(false);
    alert(success ? "Product updated successfully" : message);
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      bg={"whiteAlpha.200"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={"white"} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <Button bg="#22d3ee" color="black" onClick={() => setModalOpen(true)}>
            <FaEdit />
          </Button>
          <Button
            bg="red"
            color="black"
            onClick={() => handleDeleteProduct(product._id)}
          >
            <MdDeleteForever />
          </Button>
        </HStack>
      </Box>

      {/* Custom Modal */}
      <CustomModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <Heading size="md" mb={4}>
          Update Product
        </Heading>
        <VStack spacing={4}>
          <Input
            placeholder="Product Name"
            value={updatedProduct.name}
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, name: e.target.value })
            }
          />
          <Input
            placeholder="Product Price"
            value={updatedProduct.price}
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, price: e.target.value })
            }
          />
          <Input
            placeholder="Product Image URL"
            value={updatedProduct.image}
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, image: e.target.value })
            }
          />
        </VStack>
        <Button
          mt={4}
          colorScheme="blue"
          onClick={handleUpdateProduct}
          w="full"
        >
          Update Product
        </Button>
      </CustomModal>
    </Box>
  );
};

export default ProductCard;
