import React from "react";
import { Col, Row, Skeleton } from "antd";

function SkeletonLoader({
  scaling,
  imageBox = false,
  order = 0,
  avatar = false,
  rows = 0,
  defaultSkeleton = false,
  column = 1,
  profile,
  button,
  ...rest
}) {
  return (
    <>
      {scaling === "horizontal" ? (
        <Row gutter={30} className="mb-4">
          <Col span={7} order={order}>
            <Skeleton.Image
              className="d-flex"
              active
              style={{ "max-width": "100%", width: "100%", height: "250px" }}
            />
          </Col>
          <Col span={17} order={0}>
            <Skeleton
              active
              avatar={avatar}
              paragraph={{
                rows,
              }}
              {...rest}
            />
            <Skeleton.Button active style={{ width: "160px" }} />
            <Skeleton.Button
              active
              style={{ width: "160px", marginLeft: "15px" }}
            />
          </Col>
        </Row>
      ) : scaling === "vertical" ? (
        <div>
          <Skeleton.Image
            className="d-flex mb-3"
            span={8}
            active
            style={{ "max-width": "100%", width: "100%", height: "250px" }}
          />
          <Skeleton
            active
            avatar={avatar}
            paragraph={{
              rows,
            }}
            {...rest}
          />
          <Skeleton.Button active style={{ width: "120px" }} />
          <Skeleton.Button
            active
            style={{ width: "120px", marginLeft: "15px" }}
          />
        </div>
      ) : null}

      {defaultSkeleton
        ? [...Array(column)].map((i) => (
            <Skeleton
              key={i}
              active
              avatar={avatar}
              paragraph={{
                rows,
              }}
              {...rest}
            />
          ))
        : null}

      {imageBox ? (
        <Row gutter={30} className="mb-4">
          {[...Array(column)].map((i) => (
            <Col span={6} order={order}>
              <Skeleton.Image
                className="d-flex mb-3"
                key={i}
                active
                style={{
                  "max-width": "100%",
                  width: "100%",
                  height: "250px",
                }}
                paragraph={{
                  rows,
                }}
              />
            </Col>
          ))}
        </Row>
      ) : null}

      {profile && (
        <Row gutter={30} className="mb-4 w-100">
          <Col span={3} order={order}>
            <Skeleton.Avatar
              active
              style={{ width: "100px", height: "100px" }}
              shape="circle"
              {...rest}
            />
          </Col>
          <Col span={21} order={order}>
            <Skeleton.Button
              active
              className="mb-2"
              style={{ width: "120px" }}
            />
            <Skeleton
              active
              avatar={avatar}
              paragraph={{
                rows,
              }}
              {...rest}
            />
          </Col>
        </Row>
      )}

      {button && <Skeleton.Button active style={{ width: "120px" }} />}
    </>
  );
}

export default SkeletonLoader;
