/* eslint-disable @next/next/no-img-element */
import React from "react";
import { slug } from "@/helpers";

const detail = ({ cocktail }) => {
  return (
    <>
      <h1>Detail of Cocktail using incremental static regeneration</h1>
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
// { params: { slug: 1038213 - margarita } },

export async function getStaticPaths() {
  //Get all cocktails here

  const response = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
  );

  const { drinks: cocktails } = await response.json();

  return {
    paths: cocktails.map((c) => ({
      params: {
        slug: `${c.drink}-${slug(c.strDrink)}`,
      },
    })),
    fallback: true,
  };
}

export async function getStaticProps(ctx) {
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
    revalidate: 60,
  };
}
