import dayjs from "dayjs";
import {
  Button,
  Col,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
} from "antd";
import type { Dayjs } from "dayjs";
import { toast } from "react-toastify";
import { Event } from "@/types/event.type";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import React, { useEffect, useState } from "react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useDispatch, useSelector } from "react-redux";
import interactionPlugin from "@fullcalendar/interaction";

import {
  deleteEventApi,
  editEventApi,
  getEventApi,
  setEventApi,
} from "@/store/calanderSlice";
import Header from "@/component/header";
import { AppDispatch } from "@/store/Index";
import { createEventId } from "../../utils/event.calander";
import RenderEventContent from "@/component/renderEventContent";

import styles from "./index.module.scss";

const calander = () => {
  const dispatch: AppDispatch = useDispatch();
  const getEventData = useSelector((state: any) => state.event.eventData);
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);
  const [count, setCount] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState<string | null>(null);
  const [endDate, setEnd] = useState<string | null | any>(null);
  const [startDate, setStart] = useState<string | null>(null);
  const [currentEvents, setCurrentEvents] = useState<Array<Event>>(
    getEventData || []
  );
  const [editRemoveId, setEditRemoveId] = useState<number | null>(null);
  const logInUserRole = useSelector(
    (state: any) => state.user.logInUserData.role
  );

  useEffect(() => {
    dispatch(getEventApi(logInUserRole));
  }, []);

  useEffect(() => {
    setCurrentEvents(getEventData);
  }, [getEventData]);

  const handleCancel = () => {
    setCount(count + 1);
    setIsModalOpen(false);
    form.resetFields();
    setTitle(null);
    setStart(null);
    setEnd(null);
  };

  const handleonFinish = () => {
    const onSuccessCallback = (res: any) => {
      if (res.status === 200) {
        setTitle(null);
        setIsModalOpen(false);
        setStart(null);
        setEnd(null);
        form.resetFields();
      } else {
        toast.error(res.message);
      }
    };
    if (isEdit) {
      setCurrentEvents([...currentEvents]);
      setIsEdit(false);
      setTitle(null);
      setIsModalOpen(false);
      setStart(null);
      setEnd(null);
      form.resetFields();
      dispatch(
        editEventApi(
          { title: title, start: startDate, end: endDate },
          editRemoveId,
          onSuccessCallback
        )
      );
    } else {
      if (title) {
        setCount(count + 1);
        setCurrentEvents([
          ...currentEvents,
          {
            id: createEventId(),
            title: title,
            start: startDate,
            end: endDate,
          },
        ]);

        dispatch(
          setEventApi(
            { title: title, start: startDate, end: endDate },
            onSuccessCallback
          )
        );
      }
    }
  };

  const handleonDelete = () => {
    if (isEdit) {
      setTitle(null);
      setIsEdit(false);
      setIsModalOpen(false);
      setStart(null);
      setEnd(null);
      form.resetFields();
      dispatch(deleteEventApi(editRemoveId));
    }
  };

  const handleStartDateChange: DatePickerProps["onChange"] = (
    date: Dayjs | null
  ) => {
    const start = dayjs(date).format("YYYY-MM-DD");
    setStart(start);
  };

  const handleEndDateChange: DatePickerProps["onChange"] = (
    date: Dayjs | null
  ) => {
    const end = dayjs(date);
    const endDate = end.add(1, "d").format("YYYY-MM-DD");
    setEnd(endDate);
  };

  return (
    <>
      <Row justify="center">
        <Col xxl={24}>
          <Header />
        </Col>
        <Col xxl={22}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth",
            }}
            initialView="dayGridMonth"
            // @ts-ignore
            events={currentEvents}
            editable={logInUserRole === "admin" ? false : true}
            selectable={logInUserRole === "admin" ? false : true}
            select={(e) => {
              setStart(e.startStr);
              setEnd(e.endStr);
              setIsModalOpen(true);
            }}
            eventContent={(e) => <RenderEventContent eventInfo={e} />}
            eventClick={(e) => {
              setEditRemoveId(Number(e.event.id));
              form.setFieldsValue({
                title: e.event.title,
              });
              setTitle(e.event.title);
              setStart(e.event.startStr);
              setEnd(e.event.endStr);

              setIsModalOpen(logInUserRole === "admin" ? false : true);
              setIsEdit(true);
            }}
          />
        </Col>
      </Row>

      <Modal
        key={count}
        title={isEdit ? "Edit Event" : "Add Event"}
        open={isModalOpen}
        footer={false}
        onCancel={handleCancel}
      >
        {startDate}
        {"\r"}
        {endDate}
        <Form
          key={count}
          name="basic"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
        >
          <Form.Item
            key={count}
            label="Title"
            className={styles.labelClr}
            name="title"
            rules={[{ required: true, message: "Please input your title!" }]}
          >
            <Input
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setTitle((e.target as HTMLInputElement).value)
              }
            />
          </Form.Item>
          <Form.Item
            label="start Date"
            className={styles.labelClr}
            name="start"
          >
            <DatePicker
              name="start"
              //@ts-ignore
              defaultValue={dayjs(startDate, "YYYY-MM-DD")}
              format="YYYY-MM-DD"
              className={styles.datePicker}
              onChange={handleStartDateChange}
            />
          </Form.Item>
          <Form.Item label="End Date" name="end" className={styles.labelClr}>
            <DatePicker
              name="end"
              defaultValue={dayjs(endDate, "YYYY-MM-DD").add(-1, "d")}
              format="YYYY-MM-DD"
              className={styles.datePicker}
              onChange={handleEndDateChange}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button onClick={handleonFinish} type="primary" htmlType="button">
              {isEdit ? "Update" : "Add"}
            </Button>
            {isEdit && (
              <Popconfirm
                placement="top"
                title="Are your sure, you want to delete this event?"
                onConfirm={handleonDelete}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  type="primary"
                  danger
                  htmlType="button"
                  style={{ marginLeft: "15px" }}
                >
                  Delete
                </Button>
              </Popconfirm>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default calander;
