import { PORT } from "app/constants";
import { BlitzPage, GetServerSideProps } from "blitz";
import { useEffect } from "react";

const Cam: BlitzPage = () => {
  useEffect(() => {
    const main = async () => {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      const PEER_SERVER_ID = await (await fetch("/id")).text();
      const { default: Peer } = await import("peerjs");

      const peer = new Peer(PEER_SERVER_ID);

      peer.on("connection", (conn) => {
        const clientId = conn.metadata.id;
        console.log("clientId received:", clientId);

        if (!clientId) {
          return conn.close();
        }

        peer.call(clientId, mediaStream);
      });
    };

    main();
  }, []);

  return <>webcam</>;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (req.headers.host !== `localhost:${PORT}`) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
};

export default Cam;
