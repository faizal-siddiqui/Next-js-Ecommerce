import { GetServerSideProps } from "next";
import React from "react";
import { AxiosResponse } from "axios";
import axios from "axios";
import CartItem from "../components/CartItem";
import { Box, Grid, Text } from "@chakra-ui/react";

export interface cartType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  count: number
}


type Props = {
  cart: cartType[];
};

const Cart = ({ cart }: Props) => {
  return (
    <Box mx="2%" my="50px">
      
      <Grid gap={"20px"} templateColumns='repeat(4, 1fr)'>
        {cart?.map((item) => (
          <CartItem key={item.id} cart={item} />
        ))}
      </Grid>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps<{
  cart: cartType[];
}> = async () => {
  const data: AxiosResponse<cartType[]> = await axios.get(
    "http://localhost:8080/cart"
  );

  return {
    props: {
      cart: data?.data,
    },
  };
};

export default Cart;
