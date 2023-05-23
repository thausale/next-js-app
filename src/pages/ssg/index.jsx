/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { slug } from "@/helpers";

const Index = ({ cocktails }) => {
  return (
    <div>
      <h1>Retrieving cocktails with static Side generation</h1>
      <h2>CONTRA</h2>
      <ol>
        <li>existing data could be stale</li>
        <li>new cocktails not included after build</li>
        <li></li>
        <li></li>
      </ol>
      <h2>PRO</h2>
      <ol>
        <li>Data is retrieved only once</li>
        <li>100% cached except for images</li>
        <li>speed</li>
        <li>if api down, still cocktails</li>
        <li>SEO optimal</li>
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
  };
}

export default Index;
