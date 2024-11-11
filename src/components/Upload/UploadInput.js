import React from "react";
import { useTranslation } from "react-i18next";
import { modalNotification } from "utils";

function UploadInput({
  children,
  fileMaxCount = 1,
  maxFiles = 0,
  formats = [],
  multiple = false,
  accept = "*",
  onUpload,
  disabled = false,
  maxFileLength = 0,
}) {
  const { t } = useTranslation();

  const handleFileSelect = (e) => {
    const { files } = e.currentTarget;
    const filesLength = files?.length || 0;
    let arrFiles = [];

    let index = 0;
    while (index < filesLength) {
      const file = files.item(index);

      if (file.size > maxFileLength) {
        modalNotification({
          type: "error",
          message: t("validation.chat.largeFile"),
        });
      } else {
        arrFiles.push({ id: new Date().valueOf() + index, file });
      }
      index += 1;
    }

    if (maxFiles === fileMaxCount) {
      modalNotification({
        type: "error",
        message: `Only ${maxFiles} upload`,
      });
      return;
    } else if (
      maxFiles < fileMaxCount &&
      maxFiles + arrFiles.length > fileMaxCount
    ) {
      let maxNewFiles = arrFiles.slice(0, fileMaxCount - maxFiles);
      arrFiles = maxNewFiles;
    }

    // check if the provided count prop is less than uploaded count of files
    if (fileMaxCount && fileMaxCount < filesLength) {
      modalNotification({
        type: "error",
        message: `Only ${fileMaxCount} file${
          fileMaxCount !== 1 ? "s" : ""
        } can be uploaded at a time`,
      });
      arrFiles = arrFiles.slice(0, fileMaxCount);
    }
    // check if some uploaded file is not in one of the allowed formats
    if (
      formats?.length > 0 &&
      arrFiles.some(
        (fileItem) =>
          !formats.some((format) =>
            fileItem.file.name.toLowerCase().endsWith(format.toLowerCase()),
          ),
      )
    ) {
      modalNotification({
        type: "error",
        message: `Only following file formats are acceptable: ${formats.join(
          ", ",
        )}`,
      });
      return;
    }

    if (files && files.length) {
      onUpload(arrFiles);
    }
  };

  return (
    <label className="cursor-pointer">
      {children}
      <input
        type="file"
        onChange={handleFileSelect}
        onClick={(event) => {
          event.target.value = null;
        }}
        className="d-none"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
      />
    </label>
  );
}

export default UploadInput;
