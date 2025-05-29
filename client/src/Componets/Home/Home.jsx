import React from 'react';
import Hero from "../../Home/Hero"
import Trending from "../../Home/Trending"
import Devotional from "../../Home/Devotional"
import Creators from '../../Home/Creators';

const Home = () => {
  return (
   <>
   <Hero/>
   <Trending/>
   <Devotional/>
   <Creators/>
   </>
  )
}

export default Home