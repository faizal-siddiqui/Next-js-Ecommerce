import Image from "next/image";
import React from "react";
import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { cartType } from "../pages/cart";
import axios from "axios";
import { useRouter } from "next/router";
import { AxiosResponse } from "axios";

type Props = {
  cart: cartType;
};

const CartItem = ({ cart }: Props) => {
  const { id, title, price, image, count } = cart;

  const router = useRouter();

  const refreshPage = () => {
    router.replace(router.asPath);
  };

  const increaseCount = (count: number) => {
    axios
      .patch(`http://localhost:8080/cart/${id}`, {
        count: count + 1,
      })
      .then((res: AxiosResponse) => refreshPage())
      .catch((err) => console.log(err));
  };

  const decreaseCount = (count: number) => {
    axios
      .patch(`http://localhost:8080/cart/${id}`, {
        count: count - 1,
      })
      .then((res: AxiosResponse) => refreshPage())
      .catch((err) => console.log(err));
  };

  const deleteCart = () => {
    axios
      .delete(`http://localhost:8080/cart/${id}`)
      .then((res: AxiosResponse) => refreshPage())
      .catch((err) => console.log(err));
  };

  return (
    <Box p={"15px"} boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px">
      <Box h="250px" maxHeight="250px">
        <Image src={image} alt={image} width="100" height="130" />
        <Text mt="10px">{title}</Text>
        <Text mt="10px">₹ {price}</Text>
      </Box>
      <Flex justify="space-between">
        <Box>
          <Button disabled={count === 15} bgColor="gray.400" onClick={() => increaseCount(count)}>
            +
          </Button>
          <Button disabled bgColor="gray.100">
            {count}
          </Button>
          <Button disabled={count === 1} bgColor="gray.400" onClick={() => decreaseCount(count)}>
            -
          </Button>
        </Box>
        <Box>
          <Button bgColor="red.200" onClick={deleteCart}>
            Delete
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default CartItem;
