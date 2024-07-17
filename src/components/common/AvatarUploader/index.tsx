import { useState, useCallback, useRef } from "react";
import { Mutation } from "@apollo/react-components";

import { UPDATE_AVATAR, DELETE_AVATAR } from "./avatarUploader.graphql";
// Refetch
import { CURRENT_USER_QUERY } from "../../../hooks/useUser/useUser.graphql";
import { RIGBOOK_QUERY } from "../../user/Rigbook/rigbook.graphql";
import { PROFILE_HEADER_QUERY } from "../../user/ProfileHeader/profileHeader.graphql";

import ErrorMessage from "../../utility/ErrorMessage";
import Loading from "../../utility/Loading";
import { getUploadLocation } from "../../../lib/utils";
import Button from "../Button";
import Icon from "../Icon";

import Styles from "./avatarUploader.module.scss";

const uploadImage = async (file) => {
  console.log("heic", file);
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", getUploadLocation("avatars"));

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

const AvatarUploader = ({ image, isGuest }) => {
  const inputEl = useRef(null);
  const initialImage = {
    id: (image && image.id) || defaultImage.id,
    publicId: (image && image.publicId) || defaultImage.publicId,
    url: (image && image.url) || defaultImage.url,
    smallUrl: (image && image.smallUrl) || defaultImage.smallUrl,
  };
  const [avatar, setAvatar] = useState(initialImage);
  const [oldAvatar, setOldAvatar] = useState(image ? initialImage : null);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = useCallback(() => {
    inputEl.current.click();
  }, [inputEl]);

  const uploadFile = useCallback(
    async (e, callback) => {
      const files = e.target.files;
      setUploading(true);
      const uploadResults = await uploadImage(files[0]);
      const newAvatar = {
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
            old: oldAvatar,
            new: newAvatar,
          },
        },
        refetchQueries,
      });

      setAvatar(newAvatar);
      setOldAvatar(newAvatar);
      setUploading(false);
    },
    [oldAvatar, setAvatar, setOldAvatar, setUploading, isGuest]
  );

  const deleteFile = useCallback(
    async (callback) => {
      callback({
        variables: {
          avatar: oldAvatar,
        },
      });

      setAvatar(defaultImage);
      setOldAvatar();
    },
    [oldAvatar, setAvatar, setOldAvatar]
  );

  return (
    <div className={Styles["uploader"]}>
      <div className={Styles["uploader-contents"]}>
        <img
          className={Styles["img"]}
          width="100"
          src={avatar.url || "/img/default-user.jpg"}
          alt="Avatar"
        />

        <Mutation mutation={UPDATE_AVATAR}>
          {(updateAvatar, { error, loading, data }) => {
            return (
              <div className={Styles["uploader-input"]}>
                <div>
                  <h4>Change Your Avatar</h4>
                  <Button
                    className={Styles["upload-button"]}
                    onClick={handleFileUpload}
                  >
                    Choose File
                  </Button>
                  {(loading || uploading) && <Loading loading={loading} />}
                  {avatar.url && data && (
                    <small>
                      {data.updateAvatar.message}
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
                    onChange={(e) => uploadFile(e, updateAvatar)}
                    key={Date.now()}
                  />
                </div>
                <small className={Styles["reqs"]}>
                  JPG, GIF, or PNG. At least 400 x 400.
                </small>
                {error && <ErrorMessage error={error} />}
              </div>
            );
          }}
        </Mutation>
      </div>
      {/* {avatar.url && (
        <Mutation mutation={DELETE_AVATAR}>
          {(deleteAvatar, { error, loading, data }) => {
            return (
              <>
                <button
                  disabled={loading}
                  onClick={() => deleteFile(deleteAvatar)}
                >
                  Delete image
                </button>
                {loading && <Loading loading={loading} />}
                {error && <ErrorMessage error={error} />}
              </>
            );
          }}
        </Mutation>
      )} */}
    </div>
  );
};

export default AvatarUploader;
