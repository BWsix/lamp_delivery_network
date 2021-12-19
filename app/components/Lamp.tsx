import lampMutation from "app/mutations/lampMutation";
import lampQuery from "app/queries/lampQuery";
import { useMutation, useQuery } from "blitz";

export const Lamp = () => {
  const [lampStatus, { setQueryData }] = useQuery(lampQuery, null);
  const [toggleLamp] = useMutation(lampMutation);

  return (
    <>
      lamp status: {lampStatus}
      <div>
        <button
          onClick={async () => {
            setQueryData(await toggleLamp(true));
          }}
        >
          on
        </button>
        <button
          onClick={async () => {
            setQueryData(await toggleLamp(false));
          }}
        >
          off
        </button>
      </div>
    </>
  );
};
