import React, { useEffect, useRef } from "react";
import { logger } from "utils";

function DragDropzone({ formats, fileMaxCount, onUpload, children }) {
  const dropRef = useRef();

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer?.files;
    const filesLength = files?.length || 0;
    const arrFiles = [];

    let index = 0;

    while (index < filesLength) {
      const file = files?.item(index);
      arrFiles.push(file);
      index += index + 1;
    }

    // check if the provided count prop is less than uploaded count of files
    if (fileMaxCount && fileMaxCount < filesLength) {
      logger(
        `Only ${fileMaxCount} file${
          fileMaxCount !== 1 ? "s" : ""
        } can be uploaded at a time`,
      );
      return;
    }

    // check if some uploaded file is not in one of the allowed formats
    if (
      formats &&
      arrFiles.some(
        (file) =>
          !formats.some((format) =>
            file.name.toLowerCase().endsWith(format.toLowerCase()),
          ),
      )
    ) {
      //   toast.error(
      //     `Only following file formats are acceptable: ${formats.join(', ')}`
      //   )

      return;
    }

    if (files && files.length) {
      let fileList = Array.from(files);
      onUpload(fileList);
    }
  };

  useEffect(() => {
    dropRef.current?.addEventListener("dragover", handleDragOver);
    dropRef.current?.addEventListener("drop", handleDrop);

    return () => {
      dropRef.current?.removeEventListener("dragover", handleDragOver);
      dropRef.current?.removeEventListener("drop", handleDrop);
    };
  }, []);

  //   const handleUpload = (e) => {
  //     const { files } = e.currentTarget
  //     const filesLength = files?.length || 0
  //     const arrFiles = []

  //     let index = 0

  //     while (index < filesLength) {
  //       const file = files?.item(index)
  //       arrFiles.push(file)
  //       index += index + 1
  //     }

  //     // check if the provided count prop is less than uploaded count of files
  //     if (fileMaxCount && fileMaxCount < filesLength) {
  //       console.log(
  //         `Only ${fileMaxCount} file${
  //           fileMaxCount !== 1 ? 's' : ''
  //         } can be uploaded at a time`
  //       )
  //       return
  //     }

  //     // check if some uploaded file is not in one of the allowed formats
  //     if (
  //       formats &&
  //       arrFiles.some(
  //         (file) =>
  //           !formats.some((format) =>
  //             file.name.toLowerCase().endsWith(format.toLowerCase())
  //           )
  //       )
  //     ) {
  //       //   toast.error(
  //       //     `Only following file formats are acceptable: ${formats.join(', ')}`
  //       //   )
  //       return
  //     }

  //     if (files && files.length) {
  //       console.log('files', files)
  //     }
  //   }

  return <div ref={dropRef}>{children}</div>;
}

export default DragDropzone;
