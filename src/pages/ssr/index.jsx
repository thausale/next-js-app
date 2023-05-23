/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { slug } from "@/helpers";

const Index = ({ cocktails }) => {
  return (
    <div>
      <h1>Retrieving cocktails with Server Side Rendering</h1>
      <h2>CONTRA</h2>
      <ol>
        <li>if api down, fucked</li>
        <li>10000 users, 10000 api calls, no caching</li>
        <li></li>
        <li></li>
      </ol>
      <h2>PRO</h2>
      <ol>
        <li>No loading ui</li>
        <li>fetch by server: faster</li>
        <li>SEO !!! page has all html on page load</li>
        <li></li>
      </ol>
      <div className="cocktails">
        {cocktails &&
          cocktails.map(({ idDrink, strDrinkThumb, strDrink }) => (
            <article key={idDrink}>
              <Link href={`/ssr/detail/${idDrink}-${slug(strDrink)}`}>
                <img src={strDrinkThumb} alt={strDrink} />
                <p>{strDrink}</p>
              </Link>
            </article>
          ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const response = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
  );

  const { drinks: cocktails } = await response.json();
  return {
    props: {
      cocktails,
    },
  };
}

export default Index;
