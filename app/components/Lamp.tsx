import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { BASE_URL } from "app/constants";
import { useEffect, useState } from "react";

export const Lamp = () => {
  const [lampStatus, setLampStatus] = useState("");

  const led = async (status: "on" | "off") => {
    const result = await fetch(`${BASE_URL}/api/lamp?${status}=1`);
    setLampStatus(await result.text());
  };

  useEffect(() => {
    led("on");
  }, []);

  return (
    <>
      current lamp status : {lampStatus}
      <ButtonGroup color="primary" size="large" variant="outlined">
        <Button onClick={() => led("on")}>ON</Button>
        <Button onClick={() => led("off")}>OFF</Button>
      </ButtonGroup>
    </>
  );
};
