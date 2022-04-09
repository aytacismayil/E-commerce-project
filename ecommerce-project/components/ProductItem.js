import React,{useContext} from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { useSnackbar } from "notistack";
import { Store } from "../utils/Store";
import axios from "axios";

const ProductItem = ({ product }) => {
  const {
    state: { cart },
    dispatch,
  } = useContext(Store);
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/data/${product.id}`);
    if (data.countInStock < quantity) {
      enqueueSnackbar("Sorry. Product is out of stock", { variant: "error" });
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: {
        _key: product._id,
        name: product.name,
        countInStock: product.countInStock,
        id: product.id,
        price: product.price,
        image: urlForThumbnail(product.image),
        quantity,
      },
    });
    enqueueSnackbar(`${product.name} added to the cart`, {
      variant: "success",
    });
    router.push("/cart");
  };
  return (
    <Card>
      <NextLink href={`/data/${product.id}`} passHref>
        <CardActionArea>
          <CardMedia
            component="img"
            image={product.image}
            title={product.name}
          ></CardMedia>
          <CardContent>
            <Typography>{product.name}</Typography>
          </CardContent>
        </CardActionArea>
      </NextLink>
      <CardActions>
        <Typography>{product.price}</Typography>
        <Button size="small" color="primary" onClick={addToCartHandler}>
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductItem;
