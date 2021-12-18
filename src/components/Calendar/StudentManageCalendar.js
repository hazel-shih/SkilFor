import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import StudentReadTaskCard from "./StudentReadTaskCard";
import AlertCard from "../AlertCard";
import { getCalendarMonthEvents } from "../../WebAPI";
import LoaderSpining from "../../components/LoaderSpining";
import { CalendarContainer, LoadingSquare } from "./TeacherManageCalendar";
import { MONTH_EVENTS } from "./constants";

function StudentManageCalendar() {
  const localizer = momentLocalizer(moment);
  const [alertShow, setAlertShow] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(false);
  const [currentPage, setCurrentPage] = useState(new Date());
  const [apiError, setApiError] = useState(false);
  const [loading, setLoading] = useState(false);
  //拿當月的行程資料
  useEffect(() => {
    setLoading(true);
    // getCalendarMonthEvents(setApiError, currentPage.getMonth() + 1).then(
    //   (json) => {
    //     if (!json || !json.success) {
    //       setLoading(false);
    //       return setApiError("發生了一點錯誤，請稍後再試");
    //     }
    //     let data = json.data.map((event) => {
    //       event.start = new Date(event.start);
    //       event.end = new Date(event.end);
    //       return event;
    //     });
    //     setAllEvents(data);
    //     setLoading(false);
    //   }
    // );
    setAllEvents(MONTH_EVENTS);
    setLoading(false);
  }, [currentPage]);
  const handleEventClick = (e) => {
    setAlertShow("read");
    setSelectedEvent(e);
  };
  const handlePageChange = (currentMonthPage) => {
    setCurrentPage(currentMonthPage);
  };
  const handleAlertOkClick = () => {
    return setApiError(false);
  };
  const eventStyleGetter = (event) => {
    var eventColor = event.resource.eventColor;
    let style;
    if (new Date(event.start).getTime() < new Date().getTime()) {
      style = {
        border: `2px solid #e6e6e6`,
        backgroundColor: "#e6e6e6",
        color: "#AAAAAA",
        fontSize: "12px",
      };
    } else {
      style = {
        border: `2px solid ${eventColor}`,
        backgroundColor: eventColor,
        color: "white",
        fontSize: "14px",
      };
    }
    return {
      style: style,
    };
  };
  return (
    <CalendarContainer>
      {loading && (
        <>
          <LoadingSquare />
          <LoaderSpining />
        </>
      )}
      {apiError && (
        <AlertCard
          color="#A45D5D"
          title="錯誤"
          content={apiError}
          handleAlertOkClick={handleAlertOkClick}
        />
      )}
      <Calendar
        onSelectEvent={handleEventClick}
        selectable
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100vh" }}
        events={allEvents}
        views={["month", "day", "week"]}
        onNavigate={handlePageChange}
        date={currentPage}
        eventPropGetter={eventStyleGetter}
      />
      {alertShow === "read" && (
        <StudentReadTaskCard
          setAllEvents={setAllEvents}
          allEvents={allEvents}
          alertShow={alertShow}
          setAlertShow={setAlertShow}
          selectedEvent={selectedEvent}
          setApiError={setApiError}
        />
      )}
    </CalendarContainer>
  );
}

export default StudentManageCalendar;
