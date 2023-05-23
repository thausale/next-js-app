/* eslint-disable @next/next/no-img-element */
import React from "react";

const detail = ({ cocktail }) => {
  return (
    <>
      <h1>Detail of Cocktail using SSR</h1>
      {cocktail && (
        <>
          <h2>{cocktail.strDrink}</h2>
          <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
          <p>{cocktail.strInstructions}</p>
        </>
      )}
    </>
  );
};

export default detail;

export async function getServerSideProps(ctx) {
  const id = ctx.params.slug.split("-")[0];
  console.log(id);
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  const { drinks } = await response.json();
  return {
    props: {
      cocktail: drinks[0],
    },
  };
}
