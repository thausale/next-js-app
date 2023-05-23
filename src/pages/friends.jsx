import { db } from "@/db";
import { nest } from "@/helpers";
import { useState } from "react";

const Friends = ({ friends }) => {
  const [input, setInput] = useState("");
  const [area, setArea] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("submithandler");
    const data = { subject: input, body: area };
    console.log(data);

    const response = await fetch("/api/mail", {
      method: "POST", // or PUT or DELETE
      body: JSON.stringify({
        subject: input,
        body: area,
      }),
    });
    console.log(response);
  };

  return (
    <div>
      <h1>Friends</h1>

      <div>
        <form action="" onSubmit={submitHandler}>
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <textarea
            name="textarea"
            id="textarea"
            cols="30"
            rows="10"
            value={area}
            onChange={(e) => {
              setArea(e.target.value);
            }}
          ></textarea>
          <button type="submit">submit</button>
        </form>
      </div>

      <ul>
        {friends.map(({ name, age, friend_id, hobbies, hobbies_ids }) => (
          <details key={friend_id}>
            <summary>{name}</summary>
            age: {age}
            <br />
            hobbies: {hobbies}
            <br />
            hobbies ids: {hobbies_ids}
          </details>
        ))}
      </ul>
    </div>
  );
};

export default Friends;

export async function getStaticProps() {
  //   const friends = await db("friends");
  //   const friends = await db("friends")
  //     .select("friends.friends_id", "friends.name")
  //     .select(
  //       db.raw(
  //         "(SELECT GROUP_CONCAT(hobbies.hobby) FROM friends_has_hobbies JOIN hobbies ON friends_has_hobbies.hobbies_hobbies_id = hobbies.hobbies_id WHERE friends_has_hobbies.friends_friends_id = friends.friends_id) AS hobbies"
  //       )
  //     )
  //     .select(
  //       db.raw(
  //         "(SELECT GROUP_CONCAT(hobbies.hobbies_id) FROM friends_has_hobbies JOIN hobbies ON friends_has_hobbies.hobbies_hobbies_id = hobbies.hobbies_id WHERE friends_has_hobbies.friends_friends_id = friends.friends_id) AS hobbies_ids"
  //       )
  //     );

  const friendsData = await db("friends_has_hobbies")
    .join("friends", "friends.id", "friends_has_hobbies.friends_id")
    .join("hobbies", "hobbies.id", "friends_has_hobbies.hobbies_id")
    .select(
      "friends.id",
      "friends.name",
      "friends.age",
      "friends.image",
      "hobbies.hobby",
      "hobbies.id AS hobbyId"
    );

  const friendsDefinition = [
    {
      id: { column: "id", type: "NUMBER" },
      name: "name",
      age: { column: "age", type: "NUMBER" },
      image: "image",
      hobbies: [
        {
          id: { column: "hobbyId", type: "NUMBER" },
          name: "hobby",
        },
      ],
    },
  ];

  const friends = nest(friendsData, friendsDefinition);
  return { props: { friends }, revalidate: 60 };
}
