import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  Link,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import classes from "../../utils/classes";
import { useRouter } from "next/router";

const ProductScreen = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const [state, setState] = useState({
    product: null,
    loading: true,
    error: "",
  });
  const { product, loading, error } = state;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const respons = await fetch(`/api/data/${id}`);
        const product = await respons.json();
        console.log(product);
        setState({
          ...state,
          product,
          loading: false,
        });
      } catch (err) {
        setState({
          ...state,
          error: err.message,
          loading: false,
        });
      }
    };
    fetchData();
  }, []);
  return (
    <Layout>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert variant="error">{error}</Alert>
      ) : (
        <Box>
          <Box sx={classes.section}>
            <NextLink href="/" passHref>
              <Link>
                <Typography>Back o result</Typography>
              </Link>
            </NextLink>
          </Box>
          <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
              <Image
                src={product.image}
                alt={product.name}
                layout="response"
                width={640}
                height={640}
              ></Image>
            </Grid>
            <Grid item md={3} xs={12}>
              <List>
                <ListItem>
                  <Typography component="h1" variant="h1">
                    {product.name}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography>Description: {product.description}</Typography>
                </ListItem>
              </List>
            </Grid>
            <Grid item md={3} xs={12}>
              <Card>
                <List>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Price</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>${product.price}</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Status</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>
                          {product.countInStock > 0
                            ? "In stock"
                            : "Unavailable"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Button fullWidth variant="contained">
                      Add to cart
                    </Button>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
    </Layout>
  );
};

export default ProductScreen;

export function getServerSideProps(context) {
  return {
    props: { id: context.params.id },
  };
}
