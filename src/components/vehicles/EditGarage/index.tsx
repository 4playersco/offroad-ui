import { useCallback } from "react";
import get from "lodash/get";
import { useQuery, useMutation } from "@apollo/client";

import USER_RIG from "./userRig.graphql";
import USER_UPDATE_RIG_MUTATION from "./updateRig.graphql";

import ErrorMessage from "@/components/utility/ErrorMessage";
import RigForm from "@/components/vehicles/RigForm";
import RigUploader from "@/components/vehicles/RigUploader";

const EditGarage = () => {
  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useQuery(USER_RIG);
  const [
    userUpdateRig,
    { error: mutationError, loading: mutationLoading, data: mutationData },
  ] = useMutation(USER_UPDATE_RIG_MUTATION);

  const handleSubmit = useCallback(
    async (
      { id, ...vehicleValues }: FormValues,
      setSubmitting: (value: boolean) => void,
      userUpdateRig: (value: object) => void
    ) => {
      setSubmitting(true);

      const { year, mods, outfitLevel, ...restVehicles } = vehicleValues;

      userUpdateRig({
        variables: {
          id,
          outfitLevel: outfitLevel === "0" ? null : outfitLevel,
          year: Number.parseInt(year, 10),
          mods: mods ? mods.split(", ") : "",
          ...restVehicles,
        },
      });

      setSubmitting(false);
    },
    []
  );

  if (queryLoading) {
    return <div>Loading...</div>;
  }
  if (queryError) {
    return <ErrorMessage error={queryError} />;
  }

  const { vehicle } = queryData.user;
  const { user } = queryData;
  const isGuest =
    user.accountType === AccountType.GUEST ||
    (user.accountStatus !== AccountStatus.ACTIVE &&
      user.accountStatus !== AccountStatus.PAST_DUE);

  const initialValues: FormValues = {
    id: get(vehicle, "id", 0),
    year: String(get(vehicle, "year")),
    make: get(vehicle, "make", ""),
    model: get(vehicle, "model", ""),
    trim: get(vehicle, "trim", ""),
    name: get(vehicle, "name", ""),
    outfitLevel: get(vehicle, "outfitLevel", 0),
    mods: get(vehicle, "mods", []).join(", "),
  };

  const successMessage = get(mutationData, "updateVehicle.message");

  return (
    <>
      <RigUploader image={get(queryData, "user.rig.image")} isGuest={isGuest} />

      <RigForm
        initialValues={initialValues}
        onSubmit={(values, setSubmitting) =>
          handleSubmit(values, setSubmitting, userUpdateRig)
        }
        loading={Boolean(mutationLoading)}
        error={mutationError}
        successMessage={successMessage}
      />
    </>
  );
};

export default EditGarage;
