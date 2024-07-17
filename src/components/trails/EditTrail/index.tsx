import { useState, useCallback, useEffect, FC } from "react";
import { useQuery, useMutation } from "@apollo/client";
import get from "lodash/get";
import { Link } from "react-router-dom";

import EXISTING_TRAIL_QUERY from "./trail.graphql";
import EDIT_TRAIL_MUTATION from "./editTrail.graphql";

import TrailForm from "../TrailForm";
import TrailImageUploader from "../TrailImageUploader";
import ErrorMessage from "../../utility/ErrorMessage";
import SuccessMessage from "../../utility/SuccessMessage";
import { filter } from "lodash";

interface EditTrailProps {
  slug: string;
}

const EditTrail: FC<EditTrailProps> = ({ slug: existingTrailSlug }) => {
  const {
    loading: queryLoading,
    error: queryError,
    data: queryData,
  } = useQuery(EXISTING_TRAIL_QUERY, {
    variables: {
      trailSlug: existingTrailSlug,
    },
  });
  const [
    updateTrail,
    { error: mutationError, loading: mutationLoading, data: mutationData },
  ] = useMutation(EDIT_TRAIL_MUTATION);
  const [image, setImage] = useState({
    publicId: null,
    url: null,
    smallUrl: null,
  });
  const [slug, setSlug] = useState(existingTrailSlug);
  const handleSubmit = useCallback(
    async (
      { id, ...filteredValues }: any,
      setSubmitting: (value: boolean) => void
    ) => {
      if (filteredValues.slug !== slug) {
        setSlug(filteredValues.slug);
      }

      setSubmitting(true);

      updateTrail({
        variables: {
          id,
          trail: filteredValues,
        },
      });

      setSubmitting(false);
    },
    [slug, setSlug, updateTrail]
  );

  useEffect(() => {
    if (
      queryData &&
      queryData.trail &&
      queryData.trail.featuredImage &&
      queryData.trail.featuredImage.url
    ) {
      setImage({
        publicId: null,
        url: queryData.trail.featuredImage.url,
        smallUrl: null,
      });
    }
  }, [queryData]);

  if (queryLoading) {
    return <div>Loading...</div>;
  }
  if (queryError) {
    return <ErrorMessage error={queryError} />;
  }

  const { trail } = queryData;

  if (!trail) {
    return (
      <div>
        <p>
          No trail found at this URL.{" "}
          <Link to="/admin/trails">View all trails</Link>
        </p>
      </div>
    );
  }

  const initialValues = {
    id: trail.id,
    name: trail.name,
    slug: existingTrailSlug,
    description: trail.description || "",
    trailheadCoords: trail.trailheadCoords || "",
    address: trail.address || "",
  };

  const successMessage = get(mutationData, "updateTrail.message");

  return (
    <>
      <h3>Edit Trail</h3>
      <TrailImageUploader image={image.url} trailId={trail.id} />
      <TrailForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        loading={mutationLoading}
        error={mutationError}
        submitLabel="Edit Trail"
      />
      {successMessage && (
        <p>
          <SuccessMessage message={successMessage} />
          <Link to="/admin/trails">View trails</Link>.
        </p>
      )}
    </>
  );
};

export default EditTrail;
