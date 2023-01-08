import { GetStaticPaths, GetStaticPathsContext, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { productsType } from "../index";
import axios from "axios";
import { AxiosResponse } from "axios";
import { ParsedUrlQuery } from "querystring";
import Image from "next/image";
import { Heading, Box, Text, Flex, Stack, Button } from "@chakra-ui/react";
type Props = {
  product: productsType;
};

interface paramsType extends ParsedUrlQuery {
  id: string;
}

interface pathProps {
  paths: Array<paramsType>;
  fallback: boolean;
}

const Pages = ({ product }: Props) => {
  const { id, title, price, description, category, image, rating } = product;

  const addToCart = (data: productsType) => {
    axios
      .post(`http://localhost:8080/cart`, {
        ...data,
        count: 1
      })
      .then((res: AxiosResponse<productsType>) => {})
      .catch((err) => console.log(err));
  };

  return (
    <Box mx="2%" my={"50px"}>
      <Flex>
        <Box w="48%">
          <Image src={image} alt={image} width="500" height="700" />
        </Box>
        <Box w="48%">
          <Stack spacing={"30px"}>
            <Heading>{title}</Heading>
            <Text>{description}</Text>
            <Text>
              <Text as={"span"} fontWeight="bold">
                Category:{" "}
              </Text>
              {category}
            </Text>
            <Text>
              <Text as={"span"} fontWeight="bold">
                Price: ₹{" "}
              </Text>
              {price}
            </Text>
            <Text>
              <Text as={"span"} fontWeight="bold">
                Rating:{" "}
              </Text>
              {rating?.rate}
            </Text>
            <Text>
              <Text as={"span"} fontWeight="bold">
                Count:{" "}
              </Text>
              {rating?.count}
            </Text>
          </Stack>
          <Button mt={"40px"} w="80%" onClick={() => addToCart(product)}>
            Add To Cart
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: AxiosResponse<productsType[]> = await axios({
    method: "get",
    url: "http://localhost:8080/products",
  });

  return {
    paths: data.data.map((prod: productsType) => ({
      params: { id: `${prod.id}` },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ product: productsType }> = async (
  context
) => {
  const product: AxiosResponse<productsType> = await axios({
    method: "get",
    url: `http://localhost:8080/products/${context?.params?.id}`,
  });

  return {
    props: {
      product: product.data,
    },
  };
};

export default Pages;
