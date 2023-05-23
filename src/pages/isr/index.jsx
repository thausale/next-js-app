/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { slug } from "@/helpers";

const Index = ({ cocktails }) => {
  return (
    <div>
      <h1>Retrieving cocktails with incremental static regeneration</h1>
      <h2>CONTRA</h2>
      <ol>
        <li>Stale data within certain timeframe</li>
        <li></li>
      </ol>
      <h2>PRO</h2>
      <ol>
        <li>data is retrieved after your set time</li>
        <li>api down still cocktails</li>
        <li></li>
        <li></li>
        <li></li>
      </ol>
      <div className="cocktails">
        {cocktails &&
          cocktails.map(({ idDrink, strDrinkThumb, strDrink }) => (
            <article key={idDrink}>
              <Link href={`/ssg/detail/${idDrink}-${slug(strDrink)}`}>
                <img src={strDrinkThumb} alt={strDrink} />
                <p>{strDrink}</p>
              </Link>
            </article>
          ))}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
  );

  const { drinks: cocktails } = await response.json();
  return {
    props: {
      cocktails,
    },
    revalidate: 60, // Als er een request komt na 60 seconden wordt er een nieuwe api call gedaan
  };
}

export default Index;
