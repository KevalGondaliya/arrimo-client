import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useState } from "react";
import { Modal, Button, Form, Input, DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import styles from "./index.module.scss";
import moment from "moment";
import { createEventId, INITIAL_EVENTS } from "./event.utils";

const calander = () => {
  const [weekendsVisible, setWeekendsVisible] = useState<Boolean>(true);
  const [currentEvents, setCurrentEvents] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState();
  const [startDate, setStart] = useState<string | moment.Moment | null>(null);
  const [endDate, setEnd] = useState<string | moment.Moment | null>(null);
  const [form] = Form.useForm();
  const handleDateSelect = (info: any) => {
    // setIsModalOpen(true);
    // let title = prompt("Please enter a new title for your event");

    setIsModalOpen(true);
    // calendarApi.unselect() // clear date selection
    const { start, end } = info;
    console.log(info);

    if (title) {
      setCurrentEvents([
        ...currentEvents,
        {
          start,
          end,
          title: title,
          id: createEventId(),
        },
      ]);
    }
    // console.log(selectedDates.startStr);
    // setStart(selectedDates.startStr)
    // setStart(selectedDates.endStr)
    // form.resetFields();
  };
  console.log(currentEvents);

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  const handleonFinish = (values: any) => {
    values.start = moment(startDate);
    values.end = endDate;
    setIsModalOpen(false);
    setCurrentEvents(values);
    form.resetFields();
  };
  function handleOnClick(selectedDates: any) {
    setIsModalOpen(true);
    console.log(selectedDates.startStr);
    setStart(selectedDates.startStr);
    setStart(selectedDates.endStr);
    form.resetFields();
  }
  const handleStartDateChange: DatePickerProps["onChange"] = (date: any) => {
    setStart(date);
  };

  const handleEndDateChange: DatePickerProps["onChange"] = (date: any) => {
    setEnd(date);
  };

  const handleEventClick = (clickInfo: any) => {
    // var title = prompt("Edit Event Content:", clickInfo.event.title);
    // clickInfo.event.title = title;
    // console.log(clickInfo);

    console.log(clickInfo);
    console.log(clickInfo.event.startStr);
    console.log(clickInfo.event.endStr);
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}' event start date '${clickInfo.event.startStr}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  return (
    <>
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
        selectMirror={true}
        dayMaxEvents={true}
        initialEvents={INITIAL_EVENTS}
        select={handleDateSelect}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
      />
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        footer={false}
        onCancel={() => handleCancel()}
      >
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={handleonFinish}
          autoComplete="off"
        >
          <Form.Item
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
            rules={[{ required: true, message: "Please select start date" }]}
          >
            <DatePicker
              //@ts-ignore
              value={startDate ? moment(startDate, "MM-DD-YYYY") : null}
              format="MM-DD-YYYY"
              className={styles.datePicker}
              onChange={handleStartDateChange}
            />
          </Form.Item>

          <Form.Item
            label="End Date"
            name="end"
            className={styles.labelClr}
            rules={[{ required: true, message: "Please select end date" }]}
          >
            <DatePicker
              //@ts-ignore
              value={endDate ? moment(endDate, "MM-DD-YYYY") : null}
              className={styles.datePicker}
              format="MM-DD-YYYY"
              onChange={handleEndDateChange}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
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
