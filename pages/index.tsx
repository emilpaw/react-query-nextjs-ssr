import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { dehydrate, QueryClient, useQuery } from "react-query";

async function getPosts() {
  return {
    title: "Hello World",
    description: `Quisquam ratione vitae praesentium enim. Repellendus quo voluptas ea hic sed. Velit labore dolores ut rerum dignissimos dolorem. 
Excepturi veniam pariatur nostrum porro distinctio aut dicta quia. Commodi repudiandae esse consectetur nisi. Dolores rerum illum molestiae. Quam a sapiente at tempora. 
Iste sint eos consequuntur praesentium consequatur modi voluptatem vero. Dolorem id debitis minima ipsum dolor aliquam quia. Sapiente qui ex voluptas voluptatibus. 
Alias aut dolorem qui sint. Ut repellat eveniet beatae quam. Est eos velit molestiae quas. Provident dignissimos qui provident sit aut. Ut amet accusamus iure adipisci sint non.`,
  };
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("post", getPosts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
const Home: NextPage = () => {
  // This useQuery could just as well happen in some deeper child to

  // the "Posts"-page, data will be available immediately either way

  const { data } = useQuery("post", getPosts);

  // This query was not prefetched on the server and will not start

  // fetching until on the client, both patterns are fine to mix

  const { data: otherData } = useQuery("posts-2", getPosts);

  // ...
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main>
        <p>Some text in template</p>

        {JSON.stringify(data)}
      </main>
    </div>
  );
};

export default Home;
