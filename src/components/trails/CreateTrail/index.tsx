import { useState, useCallback } from "react";
import { useMutation } from "@apollo/client";
import get from "lodash/get";
import { Link } from "react-router-dom";

import CREATE_TRAIL_MUTATION from "./createTrail.graphql";
import TrailImageUploader from "../TrailImageUploader";
import TrailForm from "../TrailForm";
// import ErrorMessage from '../../utility/ErrorMessage';

const CreateTrail = () => {
  const [image, setImage] = useState({
    publicId: null,
    url: null,
    smallUrl: null,
  });

  const [
    createTrail,
    { error: mutationError, loading: mutationLoading, data: mutationData },
  ] = useMutation(CREATE_TRAIL_MUTATION);

  const initialValues = {
    name: "",
    slug: "",
    description: "",
    trailheadCoords: "",
    address: "",
  };

  const handleSubmit = useCallback(
    (
      filteredValues: any,
      setSubmitting: (value: boolean) => void,
      createTrail: any
    ) => {
      setSubmitting(true);

      const trailValues = {
        ...Object.entries(filteredValues).reduce(
          (acc, value) => ({
            ...acc,
            [value[0]]: value[1] === "" ? null : value[1],
          }),
          {}
        ),
        featuredImage: null,
        newFeaturedImage: image,
      };

      createTrail({
        variables: {
          trail: trailValues,
        },
      });

      setSubmitting(false);
    },
    [image]
  );

  const successMessage = get(mutationData, "createTrail.message");

  return (
    <>
      <h3>Create New Trail</h3>
      <TrailImageUploader onUpload={setImage} />

      <TrailForm
        initialValues={initialValues}
        onSubmit={(values: any, setSubmitting: (value: boolean) => void) =>
          handleSubmit(values, setSubmitting, createTrail)
        }
        loading={mutationLoading}
        error={mutationError}
        submitLabel="Create Trail"
      />
      {successMessage && (
        <p>
          {successMessage}. <Link to="/admin/trails">View trails</Link>.
        </p>
      )}
    </>
  );
};

export default CreateTrail;
