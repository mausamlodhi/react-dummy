import React, { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Upload, Form } from "antd";
import { useSelector } from "react-redux";
import { useField } from "formik";
import ImgCrop from "antd-img-crop";
import { useTranslation } from "react-i18next";
import {
  // getLocalStorageToken,
  modalNotification,
  removeSessionStorageToken,
} from "../../../utils";

import { selectUserData } from "../../../redux/AuthSlice/index.slice";

function UploadInput({
  applyImageCropper = true,
  label = "",
  apiEndPoints,
  name,
  defaultImageUrl,
  aspect,
  children,
  formItem,
  ...rest
}) {
  const { t } = useTranslation();
  const userData = useSelector(selectUserData);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [field, meta, helpers] = useField(name);
  const config = { ...field, ...rest };
  // const apiToken = getLocalStorageToken();

  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }

  useEffect(() => {
    if (defaultImageUrl) {
      setImageUrl(defaultImageUrl);
    }
  }, [defaultImageUrl]);

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

    if (!isJpgOrPng) {
      modalNotification({
        type: "error",
        message: t("text.common.imageOnlyMessgae"),
      });
    }

    const isLt2M = file.size / 1024 / 1024 < 5;

    if (!isLt2M) {
      modalNotification({
        type: "error",
        message: t("text.common.imageSizeExceedingMessage"),
      });
    }

    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
    } else {
      const { status, response } = info.file;
      if (status === "done") {
        getBase64(info.file.originFileObj, (url) => {
          setLoading(false);
          setImageUrl(url);
        });
        modalNotification({
          type: "success",
          message: "Image uploaded successfully",
          // description: `${info.file.name} file uploaded successfully.`,
        });
        // onFileUploaded(response.data.basePath)
        helpers.setValue(response.data.basePath);
      } else if (status === "error") {
        setLoading(false);
        modalNotification({
          type: "error",
          message: info?.fileList[0]?.response?.message,
          description: `${info.file.name} file upload failed. ${info.file.response?.detail}`,
        });
        if (response.detail.search("authenticated") !== -1) {
          removeSessionStorageToken();
        }
      }
    }
  };

  // const uploadButton = (
  //   <div>
  //     {loading ? <LoadingOutlined /> : <PlusOutlined />}
  //     <div
  //       style={{
  //         marginTop: 8,
  //       }}
  //     >
  //       <div className="my-auto text-center">
  //         <span className="icon-camera" />
  //         <div className="font-sm txt">+ Upload Image</div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return applyImageCropper ? (
    !formItem ? (
      <ImgCrop quality={1} aspect={aspect}>
        <Upload
          name="file"
          type="file"
          listType="picture-circle"
          // className="avatar-uploader"
          showUploadList={false}
          action={apiEndPoints}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          disabled={loading}
          {...rest}
          // headers={{
          //   "Access-Control-Allow-Origin": "*",
          //   Authorization: `Bearer ${apiToken}`,
          // }}
        >
          {imageUrl ? (
            loading ? (
              <LoadingOutlined />
            ) : (
              <img
                src={`${imageUrl}`}
                alt=""
                className="img-fluid"
                style={{
                  // width: '100%',
                  height: "100%",
                }}
              />
            )
          ) : (
            <></>
            // uploadButton
          )}
          {children}
        </Upload>
      </ImgCrop>
    ) : (
      <Form.Item
        label={label}
        className="flex-col"
        name={name}
        help={meta.error && meta?.error && meta?.touched ? meta.error : ""}
        validateStatus={config.error ? "error" : "success"}
      >
        <ImgCrop quality={1} aspect={aspect}>
          <Upload
            name="file"
            type="file"
            listType="picture-circle"
            // className="avatar-uploader"
            showUploadList={false}
            action={apiEndPoints}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            disabled={loading}
            {...rest}
            // headers={{
            //   "Access-Control-Allow-Origin": "*",
            //   Authorization: `Bearer ${apiToken}`,
            // }}
          >
            {imageUrl ? (
              loading ? (
                <LoadingOutlined />
              ) : (
                <img
                  src={`${imageUrl}`}
                  alt=""
                  className="img-fluid"
                  style={{
                    // width: '100%',
                    height: "100%",
                  }}
                />
              )
            ) : (
              <></>
              // uploadButton
            )}
            {children}
          </Upload>
        </ImgCrop>
      </Form.Item>
    )
  ) : (
    <Form.Item
      label={label}
      className="flex-col"
      name={name}
      help={meta.error && meta?.error && meta?.touched ? meta.error : ""}
      validateStatus={config.error ? "error" : "success"}
    >
      <Upload
        name="file"
        type="file"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        action={apiEndPoints}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        {...rest}
        // headers={{
        //   "Access-Control-Allow-Origin": "*",
        //   Authorization: `Bearer ${apiToken}`,
        // }}
      >
        {imageUrl ? (
          loading ? (
            userData.userRole === "admin" ? (
              <LoadingOutlined />
            ) : (
              <LoadingOutlined className="text-white" />
            )
          ) : (
            <img
              src={imageUrl}
              alt="avatar"
              style={{
                // width: '100%',
                height: "100%",
              }}
            />
          )
        ) : (
          "uploadButton"
        )}
        {children}
      </Upload>
    </Form.Item>
  );
}

export default UploadInput;
