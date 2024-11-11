import React from "react";
import { DatePicker as AntDatePicker, Form } from "antd";
import { useField } from "formik";
import moment from "moment";
import { dateFormatterDayJs } from "../../../utils";

function DatePicker({
  name,
  icon,
  setFieldValue,
  onSelectChange,
  extraClassName,
  placeholder,
  requiredDateTimeFormat,
  allowClear = true,
  hasEvent = false,
  validation = false,
  dateFormate = "DD-MM-YYYY",
  suffixIcon = null,
  showToday = false,
  ...rest
}) {
  const [field, meta, helpers] = useField(name);
  // const [field, meta] = useField(name);

  const config = { ...field, ...rest };
  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }

  const handleChangeDate = (value) => {
    helpers.setValue(
      value !== null
        ? dateFormatterDayJs(value, requiredDateTimeFormat || dateFormate)
        : ""
    );
    helpers.setError("");
    helpers.setTouched(false);
  };

  return (
    <>
      {validation ? (
        <Form.Item
          className="mb-0"
          label={rest?.label}
          help={meta.error && meta?.error && meta?.touched ? meta.error : ""}
          validateStatus={config.error ? "error" : "success"}
        >
          {hasEvent ? (
            <AntDatePicker
              format={dateFormate}
              allowClear={allowClear}
              showToday={showToday}
              {...rest}
              placeholder={placeholder}
              suffixIcon={suffixIcon}
              disabledDate={(current) =>
                current.isBefore(moment().subtract(1, "day"))
              }
            />
          ) : (
            <AntDatePicker
              format={dateFormate}
              allowClear={allowClear}
              showToday={showToday}
              {...rest}
              placeholder={placeholder}
              onChange={onSelectChange || handleChangeDate}
              suffixIcon={suffixIcon}
              // disabledDate={(current) =>
              //   current.isBefore(moment().subtract(1, "day"))
              // }
              // suffixIcon={null}
            />
          )}
        </Form.Item>
      ) : hasEvent ? (
        <AntDatePicker
          format={dateFormate}
          allowClear={allowClear}
          showToday={showToday}
          {...rest}
          placeholder={placeholder}
          suffixIcon={suffixIcon}
          disabledDate={(current) =>
            current.isBefore(moment().subtract(1, "day"))
          }
        />
      ) : (
        <AntDatePicker
          format={dateFormate}
          allowClear={allowClear}
          showToday={showToday}
          {...rest}
          placeholder={placeholder}
          onChange={handleChangeDate}
          // disabledDate={(current) =>
          //   current.isBefore(moment().subtract(1, "day"))
          // }
          // suffixIcon={null}
        />
      )}
    </>
  );
}

export default DatePicker;
