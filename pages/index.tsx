import React from "react";
import type { NextPage } from "next";
import NavBar from '../components/utils/navbar';
import FoodList from '../components/food/food-list';


const Home: NextPage = () => {
  return (
    <>
      <NavBar />
      <FoodList />
    </>
);
};

export default Home;
