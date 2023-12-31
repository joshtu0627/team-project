import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import "./index.css";

function getRandomNumber(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * Mimic fetch with abort controller https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
 * ⚠️ No IE11 support
 */
function fakeFetch(date: Dayjs, { signal }: { signal: AbortSignal }) {
  return new Promise<{ daysToHighlight: number[] }>((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      //   const daysToHighlight = [1, 2, 3].map(() =>
      //     getRandomNumber(1, daysInMonth)
      //   );

      const daysToHighlight = [2, 3, 4];

      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException("aborted", "AbortError"));
    };
  });
}

const initialValue = dayjs("2022-04-17");

function ServerDay(
  props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }
) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.indexOf(props.day.date()) >= 0;

  const dayStyle = isSelected
    ? { backgroundColor: "lightblue", color: "white" }
    : {};

  return (
    <PickersDay
      {...other}
      outsideCurrentMonth={outsideCurrentMonth}
      day={day}
      style={dayStyle}
      disabled
    />
  );
}

export default function Calendar({ dates }: { dates: any[] }) {
  const requestAbortController = React.useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState();
  React.useEffect(() => {
    if (!dates) return;
    let daysToHighlight: number[] = [];
    dates.forEach((date) => {
      daysToHighlight.push(date.day);
    });
    console.log("daysToHighlight", daysToHighlight);

    setHighlightedDays(daysToHighlight);
  }, [dates]);
  // const fetchHighlightedDays = (date: Dayjs) => {
  //   const controller = new AbortController();
  //   fakeFetch(date, {
  //     signal: controller.signal,
  //   })
  //     .then(({ daysToHighlight }) => {

  //       setHighlightedDays(daysToHighlight);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       // ignore the error if it's caused by `controller.abort`
  //       if (error.name !== "AbortError") {
  //         throw error;
  //       }
  //     });

  //   requestAbortController.current = controller;
  // };

  // React.useEffect(() => {
  //   // fetchHighlightedDays(initialValue);
  //   // abort request on unmount
  //   return () => requestAbortController.current?.abort();
  // }, []);

  // const handleMonthChange = (date: Dayjs) => {
  //   if (requestAbortController.current) {
  //     // make sure that you are aborting useless requests
  //     // because it is possible to switch between months pretty quickly
  //     requestAbortController.current.abort();
  //   }

  //   setIsLoading(true);
  //   // setHighlightedDays([1, 3]);
  //   fetchHighlightedDays(date);
  // };

  return (
    // <ThemeProvider theme={theme}>
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,

        // 模糊效果
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          // defaultValue={initialValue}
          loading={isLoading}
          // onMonthChange={handleMonthChange}
          renderLoading={() => <DayCalendarSkeleton />}
          slots={{
            day: ServerDay,
          }}
          slotProps={{
            day: {
              highlightedDays,
            } as any,
          }}
          sx={{
            backgroundColor: "white",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
            transform: "scale(2) translate(0px,0px) !important",
            maxHeight: "500px",
            minHeight: "380px",
            ".MuiPickersArrowSwitcher-root": {
              visibility: "hidden",
              width: "0px",
            },
            ".MuiPickersCalendarHeader-labelContainer": {
              display: "flex",
              justifyContent: "center",
              height: "5rem",
              fontSize: "1.5rem",
              width: "100%",
              pointerEvents: "none",
            },
            ".MuiPickersCalendarHeader-root": {
              display: "flex",
              justifyContent: "center",
              minHeight: "3rem",
            },
            ".MuiPickersCalendarHeader-switchViewButton": {
              visibility: "hidden",
              width: "0px",
              marginRight: "0px",
            },
            ".MuiPickersDay-today": {
              backgroundColor: "white",
              animation: "pulseAnimation 2s infinite", // 应用动画
            },
            "@keyframes pulseAnimation": {
              "0%": {
                transform: "scale(1)",
                backgroundColor: "white",
                borderColor: "white",
              },
              "50%": {
                transform: "scale(1.1)", // 放大效果
                backgroundColor: "lightblue",
                borderColor: "lightblue",
                // color: "white",
              },
              "100%": {
                transform: "scale(1)",
                backgroundColor: "white",
                borderColor: "white",
              },
            },
            // ".MuiDateCalendar-root": {
            //   marginBottom: "100px",
            //   height: "100%",
            // },
            // ".MuiDayCalendar-monthContainer": {
            //   marginBottom: "100px",
            // },
            // ".MuiPickersCalendarHeader-switchViewButton": {
            //   visibility: "hidden",
            // },
          }}
          className="rounded-3xl"
        />
      </LocalizationProvider>
    </div>
    // </ThemeProvider>
  );
}
