import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import React, { useRef, useState } from "react";
import { createEventId, INITIAL_EVENTS } from "./event.utils";
import { Button, DatePicker, DatePickerProps, Form, Input, Modal } from "antd";

import styles from "./index.module.scss";
import moment from "moment";
import { PrivateLayout } from "@/privateLayout/PrivateLayout";

const calander = () => {
  const [currentEvents, setCurrentEvents] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState<string | null>(null);
  const [count, setCount] = useState<number>(0);
  const [startDate, setStart] = useState<string | moment.Moment | null>(null);
  const [endDate, setEnd] = useState<string | moment.Moment | null>(null);
  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsModalOpen(false);
    setTitle(null)
    setStart(null)
    setEnd(null)
    form.resetFields();
  };

  const handleonFinish = () => {
    setCount(count + 1)
    setCurrentEvents([...currentEvents, {
      id: createEventId(),
      title: title,
      start: startDate,
      end: endDate
    }]);
    setTitle(null)
    setIsModalOpen(false);
    setStart(null)
    setEnd(null)
    form.resetFields();
  };

  const handleStartDateChange: DatePickerProps["onChange"] = (date: any) => {
    setStart(moment(date).format('YYYY-MM-DD'));
  };

  const handleEndDateChange: DatePickerProps["onChange"] = (date: any) => {
    setEnd(moment(date).format('YYYY-MM-DD'));
  };

  const handleEventClick = (clickInfo: any) => {
    console.log('clickInfo', clickInfo);
    console.log('currentEvents', currentEvents);
    setTitle(clickInfo.event.title)
    setIsModalOpen(true);
    setStart(clickInfo.event.startStr)
    setEnd(clickInfo.event.endStr)
    // if (
    //   confirm(
    //     `Are you sure you want to delete the event '${clickInfo.event.title}' event start date '${clickInfo.event.startStr}'`
    //   )
    // ) {
    //   clickInfo.event.remove();
    // }
  };

  return (
    <PrivateLayout>
      <Dashboard>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        events={currentEvents}
        editable={true}
        selectable={true}

        select={(e) => {
          console.log('event check', e);
          setStart(e.startStr)
          setEnd(e.endStr)
          setIsModalOpen(true);
        }}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
      // eventsSet={() => handleEvents()}
      />
      <Modal
        key={count}
        title="Basic Modal"
        open={isModalOpen}
        footer={false}
        onCancel={() => handleCancel()}
      >
        <Form
          key={count}
          name="basic"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}

          autoComplete="off"
        >
          <Form.Item
            key={count}
            label="Title"
            className={styles.labelClr}
            name="title"
            rules={[{ required: true, message: "Please input your title!" }]}
          >
            <Input onChange={(e: any) => setTitle(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="start Date"
            className={styles.labelClr}
            name="start"
          // rules={[{ required: true, message: "Please select start date" }]}
          >
            <DatePicker
              //@ts-ignore
              defaultValue={moment(startDate, 'YYYY-MM-DD')}
              format="MM-DD-YYYY"
              className={styles.datePicker}
              onChange={handleStartDateChange}
            />
          </Form.Item>

          <Form.Item
            label="End Date"
            name="end"
            className={styles.labelClr}
          // rules={[{ required: true, message: "Please select end date" }]}
          >
            <DatePicker
              //@ts-ignore
              defaultValue={moment(endDate, 'YYYY-MM-DD').subtract(1, 'days')}
              className={styles.datePicker}
              format="MM-DD-YYYY"
              onChange={handleEndDateChange}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button onClick={handleonFinish} type="primary" htmlType="button">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      </Dashboard>
    </PrivateLayout>
  );
};

export default calander;

function renderEventContent(eventInfo: any) {
  return (
    <>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
