import { useState, useCallback, useRef, FC } from "react";
import { useMutation } from "@apollo/client";

import UPDATE_RIG from "./updateRig.graphql";
// Refetch
import CURRENT_USER_QUERY from "../../../hooks/useUser/useUser.graphql";
import RIGBOOK_QUERY from "../../user/Rigbook/rigbook.graphql";
import PROFILE_HEADER_QUERY from "../../user/ProfileHeader/profileHeader.graphql";

import ErrorMessage from "../../utility/ErrorMessage";
import Loading from "../../utility/Loading";
import { getUploadLocation } from "../../../lib";
import Button from "../../common/Button";
import Icon from "../../common/Icon";

import Styles from "./rigUploader.module.scss";

const uploadImage = async (file: any) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", getUploadLocation("rigs"));

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/fourplayers/image/upload",
    {
      method: "POST",
      body: data,
    }
  );

  return res.json();
};

const defaultRig: RigImage = {
  id: null,
  publicId: null,
  url: null,
  smallUrl: null,
};

interface RigImage {
  id?: string | null;
  publicId: string | null;
  url: string | null;
  smallUrl: string | null;
}

interface RigUploaderProps {
  image: any;
  isGuest: boolean;
}

const RigUploader: FC<RigUploaderProps> = ({ image, isGuest }) => {
  const inputEl = useRef(null);
  const initialImage: RigImage = {
    id: (image && image.id) || defaultRig.id,
    publicId: (image && image.publicId) || defaultRig.publicId,
    url: (image && image.url) || defaultRig.url,
    smallUrl: (image && image.smallUrl) || defaultRig.smallUrl,
  };
  const [rig, setRig] = useState<RigImage>(initialImage);
  const [oldRig, setOldRig] = useState(image ? initialImage : null);
  const [uploading, setUploading] = useState(false);

  const [
    updateRig,
    { error: updateError, loading: updateLoading, data: updateData },
  ] = useMutation(UPDATE_RIG);
  // const [
  //   deleteRig,
  //   { error: deleteError, loading: deleteLoading },
  // ] = useMutation(DELETE_RIG);

  const handleFileUpload = useCallback(() => {
    // @ts-ignore
    inputEl.current.click();
  }, [inputEl]);

  const uploadFile = useCallback(
    async (e: any, callback: (value: any) => void) => {
      const files = e.target.files;
      setUploading(true);
      const uploadResults = await uploadImage(files[0]);
      const newRig: RigImage = {
        publicId: uploadResults.public_id,
        url: uploadResults.secure_url,
        smallUrl: uploadResults.eager[0].secure_url,
      };

      const refetchQueries = [
        {
          query: CURRENT_USER_QUERY,
        },
        {
          query: PROFILE_HEADER_QUERY,
          variables: {
            username: "self",
          },
        },
      ];

      if (!isGuest) {
        refetchQueries.push({
          query: RIGBOOK_QUERY,
        });
      }

      callback({
        variables: {
          data: {
            old: oldRig,
            new: newRig,
          },
        },
        refetchQueries,
      });

      setRig(newRig);
      setOldRig(newRig);
      setUploading(false);
    },
    [oldRig, setRig, setOldRig, isGuest, setUploading]
  );

  const deleteFile = useCallback(
    async (callback: (value: any) => void) => {
      callback({
        variables: {
          rig: oldRig,
        },
      });

      setRig(defaultRig);
      setOldRig(null);
    },
    [oldRig, setRig, setOldRig]
  );

  return (
    <div className={Styles["uploader"]}>
      <div className={Styles["uploader-contents"]}>
        <img
          className={Styles["img"]}
          width="330"
          src={rig.url || "/img/default-vehicle.jpg"}
          alt="Rig"
        />
        <div className={Styles["uploader-input"]}>
          <div>
            <h4>Change Your Rig Photo</h4>
            <Button
              className={Styles["upload-button"]}
              onClick={handleFileUpload}
            >
              Choose File
            </Button>
            {(updateLoading || uploading) && (
              <Loading loading={updateLoading} />
            )}
            {rig.url && updateData && (
              <small>
                {updateData.updateRig.message}
                <Icon className={Styles["icon"]} icon="success" />
              </small>
            )}
            <input
              ref={inputEl}
              className={Styles["input"]}
              type="file"
              id="file"
              name="file"
              accept="image/png,image/jpeg,image/gif"
              placeholder="Upload an image"
              required
              onChange={(e) => uploadFile(e, updateRig)}
              key={Date.now()}
            />
          </div>
          <small className={Styles["reqs"]}>
            JPG, GIF, or PNG. At least 2640 x 1760.
            <br />
            Side profile preferred.
          </small>
          <ErrorMessage error={updateError} />
        </div>
      </div>
      {/* {rig.url && (
        <>
          <button
            disabled={deleteLoading}
            onClick={() => deleteFile(deleteRig)}
          >
            Delete image
          </button>
          {deleteLoading && <Loading loading={deleteLoading} />}
          {deleteError && <ErrorMessage error={deleteError} />}
        </>
      )} */}
    </div>
  );
};

export default RigUploader;
