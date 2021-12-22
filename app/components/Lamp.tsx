import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import lampMutation from "app/mutations/lampMutation";
import lampQuery from "app/queries/lampQuery";
import { useMutation, useQuery } from "blitz";

export const Lamp = () => {
  const [lampStatus, { setQueryData }] = useQuery(lampQuery, null);
  const [toggleLamp] = useMutation(lampMutation);

  return (
    <>
      current lamp status : {lampStatus}
      <ButtonGroup color="primary" size="large" variant="outlined">
        <Button
          onClick={async () => {
            setQueryData(await toggleLamp(true));
          }}
        >
          ON
        </Button>
        <Button
          onClick={async () => {
            setQueryData(await toggleLamp(false));
          }}
        >
          OFF
        </Button>
      </ButtonGroup>
    </>
  );
};
