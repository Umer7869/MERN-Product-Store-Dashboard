import React from "react";
import { Box, Flex, Button, Portal } from "@chakra-ui/react";

const CustomModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <Portal>
      {/* Modal Overlay */}
      <Box
        position="fixed"
        top="0"
        left="0"
        width="100%"
        height="100%"
        bg="blackAlpha.600"
        zIndex="overlay"
        onClick={onClose} // Close modal on clicking the overlay
      />

      {/* Modal Content */}
      <Flex
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        bg="black"
        borderRadius="md"
        boxShadow="lg"
        p={6}
        zIndex="modal"
        direction="column"
        maxW="400px"
        w="90%"
      >
        {children}
        {/* Close Button */}
        <Button
          mt={4}
          colorScheme="red"
          onClick={onClose}
          alignSelf="flex-end"
          bg={"red"}
        >
          Close
        </Button>
      </Flex>
    </Portal>
  );
};

export default CustomModal;
