import React, { useEffect, useState } from "react";
import { Alert, CircularProgress, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";

export default function Home() {
  const [state, setState] = useState({
    products: [],
    error: "",
    loading: true,
  });

  const { loading, error, products } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/data`);
        const products = await response.json();
        setState({ products, loading: false });
        console.log(products);
      } catch (err) {
        setState({ loading: false, error: err.message });
      }
    };
    fetchData();
  }, []);
  return (
    <Layout>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item md={4} key={product.slug}>
              <ProductItem product={product}></ProductItem>
            </Grid>
          ))}
        </Grid>
      )}
    </Layout>
  );
}
