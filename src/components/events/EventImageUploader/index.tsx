import { useState, useCallback, FC } from "react";
import { useMutation } from "@apollo/client";

import ErrorMessage from "@/components/utility/ErrorMessage";
import Loading from "@/components/utility/Loading";
import { getUploadLocation } from "@/lib";

import UPDATE_EVENT_IMAGE from "./updateImage.graphql";
import DELETE_EVENT_IMAGE from "./deleteImage.graphql";

const uploadImage = async (file: Blob) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", getUploadLocation("events"));

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/fourplayers/image/upload",
    {
      method: "POST",
      body: data,
    }
  );

  return res.json();
};

const defaultImage = {
  id: null,
  publicId: null,
  url: null,
  smallUrl: null,
};

type Image = {
  id?: string | null;
  publicId: string | null;
  url: string | null;
  smallUrl: string | null;
};

interface EventImageUploaderProps {
  image: Image;
}

const EventImageUploader: FC<EventImageUploaderProps> = ({ image }) => {
  const initialImage: Image = {
    id: (image && image.id) || defaultImage.id,
    publicId: (image && image.publicId) || defaultImage.publicId,
    url: (image && image.url) || defaultImage.url,
    smallUrl: (image && image.smallUrl) || defaultImage.smallUrl,
  };
  const [eventImage, setEventImage] = useState(initialImage);
  const [oldEventImage, setOldEventImage] = useState(
    image ? initialImage : null
  );

  const [
    updateEventImage,
    { loading: updateLoading, error: updateError, data: updateData },
  ] = useMutation(UPDATE_EVENT_IMAGE);
  const [deleteEventImage, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_EVENT_IMAGE);

  const handleUploadFile = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;

      if (files !== null) {
        const uploadResults = await uploadImage(files[0]);
        const newEventImage: Image = {
          publicId: uploadResults.public_id,
          url: uploadResults.secure_url,
          smallUrl: uploadResults.eager[0].secure_url,
        };

        updateEventImage({
          variables: {
            data: {
              old: oldEventImage,
              new: newEventImage,
            },
          },
        });

        setEventImage(newEventImage);
        setOldEventImage(newEventImage);
      }
    },
    [oldEventImage, setEventImage, setOldEventImage, updateEventImage]
  );

  const handleDeleteFile = useCallback(async () => {
    deleteEventImage({
      variables: {
        eventImage: oldEventImage,
      },
    });

    setEventImage(defaultImage);
    setOldEventImage(null);
  }, [oldEventImage, setEventImage, setOldEventImage, deleteEventImage]);

  return (
    <>
      Upload event image (cropped to 1400 x 800)
      <>
        <input
          type="file"
          id="file"
          name="file"
          placeholder="Upload an image"
          required
          onChange={handleUploadFile}
          key={Date.now()}
        />
        {updateLoading && <Loading loading={updateLoading} />}
        {updateError && <ErrorMessage error={updateError} />}
        {eventImage.url && updateData && updateData.updateEventImage.message}
        {eventImage.url && <img width="200" src={eventImage.url} alt="Event" />}
      </>
      {eventImage.url && (
        <>
          <button disabled={deleteLoading} onClick={handleDeleteFile}>
            Delete image
          </button>
          {deleteLoading && <Loading loading={deleteLoading} />}
          {deleteError && <ErrorMessage error={deleteError} />}
        </>
      )}
    </>
  );
};

export default EventImageUploader;
