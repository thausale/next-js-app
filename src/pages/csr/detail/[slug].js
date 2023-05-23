/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
const Detail = () => {
  const router = useRouter();
  const [cocktail, setCocktail] = useState({
    loading: false,
    data: {},
  });
  useEffect(() => {
    (async () => {
      if (router.query.slug) {
        setCocktail({ loading: true, data: {} });
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${
            router.query.slug.split("-")[0]
          }`
        );
        const { drinks } = await response.json();
        setCocktail({ loading: false, data: drinks[0] });
      }
    })();
  }, [router]);
  return (
    <>
      <h1>Detail of Cocktail using CSR</h1>
      {cocktail.loading && <p>LOADING...</p>}
      {cocktail.data && (
        <>
          <h2>{cocktail.data.strDrink}</h2>
          <img src={cocktail.data.strDrinkThumb} alt={cocktail.data.strDrink} />
          <p>{cocktail.data.strInstructions}</p>
        </>
      )}
    </>
  );
};

export default Detail;
