import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import Cart, { cartType } from "../pages/cart";
import { AxiosResponse } from "axios";
import axios from "axios";

type Props = {};

const Navbar = (props: Props) => {
  const [cart, setCart] = React.useState<cartType[]>([]);



  React.useEffect(() => {
    cartData();
  }, []);

  const cartData = async () => {
    const cart: AxiosResponse<cartType[]> = await axios.get(
      "http://localhost:8080/cart"
    );
    setCart(cart.data);
  };

  return (
    <Box>
      <Flex
        align="center"
        h="60px"
        bgColor="blackAlpha.200"
        justify="space-around"
        fontWeight="bold"
      >
        <Link href="/">
          <Text>Home</Text>
        </Link>
        <Link href="/products">
          <Text>Products</Text>
        </Link>
        <Link href="/cart">
          <Text>Cart: {cart?.length}</Text>
        </Link>
      </Flex>
    </Box>
  );
};

export default Navbar;
