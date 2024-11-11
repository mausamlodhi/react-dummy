import React, { useContext } from "react"
import * as yup from "yup"
import i18next from "i18next"
import { Form, Formik } from "formik"

import { Button, Col, Row } from "react-bootstrap"

import { SocketContext } from "context/socket.context"
import { LoopService } from "services"
import { modalNotification } from "utils"
import { AntTextArea, ModalComponent, Input as TextInput } from "components"

function CreateChannelModel(props) {
  const { socket } = useContext(SocketContext)
  const {
    title,
    onClose,
    onSubmit,
    channelLoopId,
    channel,
    getChannelInformation,
    setChannel
  } = props

  const handleSubmit = async (formValues) => {
    const response = channel?.id
      ? await LoopService.updateChannelService(
          channel?.loopId || channel?.chatRoom?.loop?.id,
          channel?.chatRoom
            ? channel?.channelId || channelLoopId?.chatRoom?.id
            : channel?.id,
          formValues
        )
      : await LoopService.postCreateChannelService(
          channelLoopId?.id,
          formValues
        )
    if (response?.success) {
      if (!channel?.id && response?.data?.id) {
        socket?.emit("join_single_room", response?.data?.id)
      }
      modalNotification({
        type: "success",
        message: response?.message
      })
      setChannel(false)
      onSubmit(response?.data)
      if (channel?.id) {
        getChannelInformation(
          getChannelInformation?.loopId || channelLoopId?.chatRoom?.loop?.id,
          channel?.chatRoom
            ? channel?.channelId || channelLoopId?.chatRoom?.id
            : channel?.id
        )
      }
    }
  }

  return (
    <ModalComponent
      backdrop
      show
      onHandleCancel={onClose}
      size="md"
      title={title === "add" ? "Create Channel" : "Edit Channel"}
      extraClassName="createChannel"
    >
      <>
        <Formik
          initialValues={{
            roomName:
              title === "edit"
                ? channelLoopId?.roomName || channelLoopId?.chatRoom?.roomName
                : "",
            description:
              title === "edit"
                ? channelLoopId?.description ||
                  channelLoopId?.chatRoom?.description
                : ""
          }}
          validationSchema={() =>
            yup.object().shape({
              roomName: yup
                .string()
                .test(
                  "onlySpace",
                  i18next.t("validation.common.onlySpaces"),
                  (value) => value.trim().length
                )
                .required(i18next.t("validation.loops.channelName")),
              description: yup
                .string()
                .required(i18next.t("validation.loops.channelDescription"))
                .max(500)
            })
          }
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <Form>
              <Row>
                <Col sm="12">
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="name">
                        Channel name
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <TextInput
                        id="roomName"
                        className="form-control form-control-lg"
                        name="roomName"
                        disabled={false}
                        variant="standard"
                        type="name"
                        placeholder="Enter Channel name"
                        setFieldValue={formikProps.handleChange}
                        icon=""
                      />
                    </div>
                  </div>
                </Col>
                <Col sm="12">
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="description">
                        Description
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <AntTextArea
                        id="description"
                        className="form-control form-control-lg"
                        name="description"
                        disabled={false}
                        variant="standard"
                        type="description"
                        placeholder="Description"
                        setFieldValue={formikProps.handleChange}
                        icon=""
                        length={500}
                      />
                    </div>
                  </div>
                </Col>
                <Col sm="12 text-end mt-lg-3">
                  <Button type="submit" className="btn btn-primary">
                    {channel ? "Save" : "Next"}
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </>
    </ModalComponent>
  )
}

export default CreateChannelModel
