import { Lamp } from "app/components/Lamp";
import { BlitzPage, Head } from "blitz";
import { Suspense } from "react";

const Home: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Lamp Delivery Network</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Suspense fallback="loading...">
        <Lamp />
      </Suspense>
    </>
  );
};

export default Home;
