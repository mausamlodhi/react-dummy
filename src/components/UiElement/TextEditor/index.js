import React from "react";
import ReactSummernote from "react-summernote";
// import "react-summernote/dist/react-summernote.css";
import "react-summernote/lang/summernote-ru-RU";
import { Form } from "antd";
import { useField } from "formik";

import $ from "jquery";

export default function TextEditor({ name, ...rest }) {
  const [field, meta, helper] = useField(name);
  const config = { ...field, ...rest };

  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }

  const onChange = (content) => {
    helper.setValue(content);
    helper.setError("");
    helper.setTouched(false);
  };
  setTimeout(() => {
    $("button.close").removeAttr("data-dismiss");
    $("button.close").attr("data-bs-dismiss", "modal");
  }, 1000);
  $(document).on("click", function () {
    if ($(".note-btn.dropdown-toggle").parent().hasClass("open")) {
      $(".note-btn-group").removeClass("open");
    }
  });
  $(document).on("click", ".note-btn.dropdown-toggle", function (e) {
    e.stopPropagation();
  });
  $(document).on("click", ".note-btn.dropdown-toggle", function () {
    if ($(".note-btn.dropdown-toggle").parent().hasClass("open")) {
      $(".note-btn-group").removeClass("open");
    }
    $(this).parent().addClass("open");
  });
  return (
    <>
      <div className="summernote-basic">
        <Form.Item
          className="mb-0"
          help={meta.error && meta?.error && meta?.touched ? meta.error : ""}
          validateStatus={config.error ? "error" : "success"}
          style={{ color: "white" }}
        >
          <ReactSummernote
            {...field}
            {...rest}
            options={{
              lang: "en-US",
              height: 250,
              dialogsInBody: true,
              tabsize: 2,
              toolbar: [
                ["style", ["style"]],
                ["font", ["bold", "underline", "strikethrough", "clear"]],
                ["font", ["superscript", "subscript"]],
                ["color", ["color"]],
                ["fontsize", ["fontsize", "height"]],
                ["para", ["ul", "ol", "paragraph"]],
                // ["table", ["table"]],
                // ["insert", ["link"]],
                ["view", ["fullscreen", "codeview", "help"]],
              ],
            }}
            onChange={onChange}
          />
        </Form.Item>
      </div>
    </>
  );
}
