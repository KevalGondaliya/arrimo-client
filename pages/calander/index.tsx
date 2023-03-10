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
import { createEventId } from "../../utils/calander.constant";
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

  // For Get Event Loader
  const loader = useSelector((state: any) => state.event.isLoading);
  useEffect(() => {
    dispatch(getEventApi(logInUserRole));
  }, []);

  useEffect(() => {
    setCurrentEvents(getEventData);
  }, [getEventData]);

  // For Cancel Form And Close Modal
  const handleCancel = () => {
    setCount(count + 1);
    setIsModalOpen(false);
    form.resetFields();
    setTitle(null);
    setStart(null);
    setEnd(null);
  };

  // For Submit Form And Dispatch Add Event Action
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

  // For Delete Event And Reset Event Form And Close Modal
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

  // For Get Event Start Event
  const handleStartDateChange: DatePickerProps["onChange"] = (
    date: Dayjs | null
  ) => {
    const start = dayjs(date).format("YYYY-MM-DD");
    setStart(start);
  };

  // For Get Event End Event
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
            editable={false}
            selectable={logInUserRole === "admin" ? false : true}
            select={(e) => {
              setStart(e.startStr);
              setEnd(e.endStr);
              setCount(count + 1);
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
              setCount(count + 1);
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
            <Button
              onClick={handleonFinish}
              type="primary"
              loading={loader}
              htmlType="button"
            >
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
                  loading={loader}
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
