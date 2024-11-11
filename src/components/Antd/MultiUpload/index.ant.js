// import React, { useState } from "react";
// import { LoadingOutlined } from "@ant-design/icons";
// import { Upload, Form } from "antd";
// import { useField } from "formik";
// import ImgCrop from "antd-img-crop";
// import { useTranslation } from "react-i18next";
// import { modalNotification } from "../../../utils";

// function MultiUpload({
//   applyImageCropper = true,
//   label = "",
//   apiEndPoints,
//   name,
//   mediaUrl,
//   uploadButtonHtml,
//   validateFileType,
//   aspect,
//   // imageLoading,
//   setImageLoading,
//   text = "Image Uploaded Successfully",
//   ...rest
// }) {
//   const { t } = useTranslation();
//   const [loading, setLoading] = useState(false);

//   const [field, meta, helpers] = useField(name);
//   const config = { ...field, ...rest };

//   if (meta && meta.touched && meta.error) {
//     config.error = true;
//     config.helperText = meta.error;
//   }

//   const beforeUpload = (file) => {
//     const isJpgOrPng = validateFileType.includes(file.type);

//     if (!isJpgOrPng) {
//       modalNotification({
//         type: "error",
//         message: t("text.common.imageOnlyMessgae"),
//       });
//     }

//     const isLt2M = file.size / 1024 / 1024 < 10;

//     if (!isLt2M) {
//       modalNotification({
//         type: "error",
//         message: t("text.common.imageSizeExceedingMessage"),
//       });
//     }

//     return isJpgOrPng && isLt2M;
//   };

//   const handleChange = (info) => {
//     if (info.file.status === "uploading") {
//       setLoading(true);
//       if (setImageLoading) {
//         setImageLoading(true);
//       }
//     } else {
//       const { status, response } = info.file;
//       if (status === "done") {
//         setLoading(false);
//         if (setImageLoading) {
//           setImageLoading(false);
//         }
//         modalNotification({
//           type: "success",
//           message: text,
//         });
//         mediaUrl(response.data);
//         helpers.setValue(response.data.image);
//       } else if (status === "error") {
//         setLoading(false);
//         modalNotification({
//           type: "error",
//           message: `${info.file.name} file upload failed. ${
//             info?.file?.response?.message ||
//             info?.file?.response?.error?.message
//           }`,
//         });
//         // if (response.detail.search("authenticated") !== -1) {
//         //   removeSessionStorageToken();
//         // }
//       }
//     }
//   };

//   const uploadButton = (
//     <>
//       {loading ? (
//         <LoadingOutlined />
//       ) : (
//         <>
//           {uploadButtonHtml || (
//             <label className="uploadStuff_upload d-flex flex-column align-items-center justify-content-center mb-0">
//               <div className="my-auto text-center">
//                 <em className="icon-upload" />
//                 <span className="d-block">{t("text.common.upload")}</span>
//               </div>
//             </label>
//           )}
//         </>
//       )}
//     </>
//   );
//   return applyImageCropper ? (
//     <Form.Item
//       label={label}
//       className="flex-col"
//       name={name}
//       help={meta.error && meta?.error && meta?.touched ? meta.error : ""}
//       validateStatus={config.error ? "error" : "success"}
//     >
//       <ImgCrop quality={1} aspect={aspect}>
//         <Upload
//           name={name}
//           type="file"
//           listType="picture-card"
//           className="uploadStuff_img position-relative"
//           showUploadList={false}
//           action={apiEndPoints}
//           beforeUpload={beforeUpload}
//           onChange={handleChange}
//           {...rest}
//           // headers={{
//           //   "Access-Control-Allow-Origin": "*",
//           //   Authorization: `Bearer ${apiToken}`,
//           // }}
//         >
//           {uploadButton}
//         </Upload>
//       </ImgCrop>
//     </Form.Item>
//   ) : (
//     <Form.Item
//       label={label}
//       className="flex-col"
//       name={name}
//       help={meta.error && meta?.error && meta?.touched ? meta.error : ""}
//       validateStatus={config.error ? "error" : "success"}
//     >
//       <Upload
//         name={name}
//         type="file"
//         listType="picture-card"
//         className="avatar-uploader icon ni ni-pen2"
//         showUploadList={false}
//         action={apiEndPoints}
//         beforeUpload={beforeUpload}
//         onChange={handleChange}
//         {...rest}
//         // headers={{
//         //   "Access-Control-Allow-Origin": "*",
//         //   Authorization: `Bearer ${apiToken}`,
//         // }}
//       >
//         {uploadButton}
//       </Upload>
//     </Form.Item>
//   );
// }

// export default MultiUpload;
