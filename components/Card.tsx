import React from "react";
import { productsType } from "../pages";
import Link from "next/link";

import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
} from "@chakra-ui/react";
import Image from "next/image";

const Card = ({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
}: productsType) => {
  return (
    <Link href={`/products/${id}`}>
      <Center py={12}>
        <Box
          role={"group"}
          p={6}
          maxW={"330px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"lg"}
          pos={"relative"}
          zIndex={1}
        >
          <Box
            rounded={"lg"}
            mt={-12}
            pos={"relative"}
            height={"230px"}
            _after={{
              transition: "all .3s ease",
              content: '""',
              w: "full",
              h: "full",
              pos: "absolute",
              top: 5,
              left: 0,
              filter: "blur(15px)",
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: "blur(20px)",
              },
            }}
          >
            <Image src={image} alt={title} width="300" height={"399"} />
          </Box>
          <Stack pt={10} align={"center"}>
            <Text
              color={"gray.500"}
              fontSize={"sm"}
              textTransform={"uppercase"}
            >
              {title.split(" ")[0]}
            </Text>
            <Heading
              noOfLines={1}
              fontSize={"2xl"}
              fontFamily={"body"}
              fontWeight={500}
            >
              {title}
            </Heading>
            <Stack direction={"row"} align={"center"}>
              <Text fontWeight={800} fontSize={"xl"}>
                ₹ {price}
              </Text>
              <Text textDecoration={"line-through"} color={"gray.600"}>
                ₹ {Math.round(price * 3)}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Center>
    </Link>
  );
};

export default Card;
