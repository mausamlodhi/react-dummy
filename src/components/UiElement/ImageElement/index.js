import React from "react";
import config from "../../../config";

function ImageElement({
  previewSource = "",
  source,
  imageFor = "user",
  alt = "image",
  origin = "anonymous",
  ...rest
}) {
  const imagePath = {
    user: config.IMAGE_URL,
    admin: config.ADMIN_IMAGE_URL,
  };
  return (
    <>
      {previewSource ? (
        <img crossOrigin={origin} src={previewSource} alt={alt} {...rest} />
      ) : (
        <>
          {source ? (
            <img
              src={`${imagePath[imageFor]}/${source}`}
              crossOrigin={origin}
              alt={alt}
              {...rest}
            />
          ) : (
            <img
              src={`${imagePath[imageFor]}/profile-img.jpg`}
              alt="userImage"
            />
          )}
        </>
      )}
    </>
  );
}

export default ImageElement;
