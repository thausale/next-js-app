import Head from "next/head";
import Script from "next/script";
import { useState } from "react";
const About = () => {
  const [color, setColor] = useState("#000");
  const getRandomColor = () => {
    setColor(randomColor());
  };
  return (
    <>
      <Head>
        <title>Dit is de about title</title>
      </Head>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/randomcolor/0.6.1/randomColor.js"
        onLoad={getRandomColor}
      />
      <h1>About page</h1>
      <button onClick={getRandomColor}>Get new Color</button>
      <p style={{ backgroundColor: color }}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui blanditiis
        eaque ratione impedit est, libero, excepturi vel, facere veritatis porro
        officiis esse a odio distinctio earum maxime quo molestias iste.
      </p>
    </>
  );
};

export default About;
