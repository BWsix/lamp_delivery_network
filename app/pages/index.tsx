import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Lamp } from "app/components/Lamp";
import { BlitzPage, Head } from "blitz";
import { Suspense, useEffect, useRef, useState } from "react";

const Home: BlitzPage = () => {
  const videoRef = useRef<HTMLVideoElement>({} as HTMLVideoElement);
  const [connection, setConnection] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const main = async () => {
      const { default: Peer } = await import("peerjs");
      const PEER_SERVER_ID = await (await fetch("/id")).text();

      const peer = new Peer();

      peer.on("open", (id) => {
        const conn = peer.connect(PEER_SERVER_ID, { metadata: { id } });

        conn.on("open", () => {
          setConnection(true);
        });
      });

      peer.on("call", (call) => {
        call.answer();
        call.on("stream", (stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        });

        call.on("error", (err) => {
          setError(JSON.stringify(JSON.parse(err), null, 2));
        });
      });

      peer.on("error", (err) => {
        setError(JSON.stringify(JSON.parse(err), null, 2));
      });
    };

    main();
  }, []);

  return (
    <>
      <Head>
        <title>Lamp Delivery Network</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Container component="main" maxWidth="md">
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {!connection && <div>camera unavailable right now</div>}
          <video muted ref={videoRef} style={{ width: "100%", height: "100%" }} />

          <Suspense fallback="loading...">
            <Lamp />
          </Suspense>
        </Box>

        {error}
      </Container>
    </>
  );
};

export default Home;
