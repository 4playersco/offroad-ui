import { useState, useEffect } from "react";

const UploadImagePreview = ({ file }) => {
  const [loading, setLoading] = useState(false);
  const [thumb, setThumb] = useState();

  useEffect(() => {
    if (!file) {
      return;
    }

    setLoading(true);
    let reader = new FileReader();

    reader.onloadend = () => {
      setLoading(false);
      setThumb(reader.result);
    };

    reader.readAsDataURL(file);
  }, [file]);

  if (!file) {
    return null;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return <img src={thumb} alt={file.name} width={700} />;
};

export default UploadImagePreview;
