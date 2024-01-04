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
import { ImCancelCircle } from "react-icons/im";

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
    ? { backgroundColor: "#8ac7db", color: "white" }
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

export default function Calendar({
  dates,
  setHasLoggedIn,
  todayReward,
  continueDay,
}: {
  dates: any;
  setHasLoggedIn: any;
  todayReward: any;
  continueDay: any;
}) {
  const requestAbortController = React.useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState();
  const [couponName, setCouponName] = React.useState("");
  React.useEffect(() => {
    if (!dates) return;
    let daysToHighlight: number[] = [];
    dates.forEach((date) => {
      daysToHighlight.push(date.day);
    });
    console.log("daysToHighlight", daysToHighlight);

    setHighlightedDays(daysToHighlight);
  }, [dates]);

  React.useEffect(() => {
    if (!todayReward) return;
    console.log("todayReward value", todayReward[0].value);

    setCouponName(`${todayReward[0].value}.png`);
  }, [todayReward]);
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
        transform: "translate(-50%, -55%)",
        zIndex: 1000,
        fontFamily: "Island Moments, cursive",
        // 模糊效果
      }}
    >
      {todayReward && couponName && (
        <div
          className="fixed text-2xl text-white"
          style={{
            fontFamily: "sans-serif",
            right: "-15%",
            top: "16%",
            rotate: "8deg",
          }}
        >
          <div className="mb-3 glow-effect">
            <img
              src={`/assets/images/coupons/${couponName}`}
              className="w-72"
              alt=""
            />
          </div>
        </div>
      )}
      <div className="flex">
        <div className="relative w-full mb-40 overflow-hidden font-normal text-white text-8xl animate-scale-width">
          <span style={{ whiteSpace: "nowrap" }}>Daily Check In</span>
        </div>{" "}
        <button
          style={{
            fontFamily: "sans-serif",
            right: "-50px",
            top: "-5%",
            fontWeight: "100",
          }}
          className="absolute text-3xl text-white"
          onClick={() => {
            setHasLoggedIn(true);
          }}
        >
          x
        </button>
      </div>
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
            transform: "scale(1.5) !important ",
            // marginTop: "100px",
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
      <div
        className="fixed z-50 flex flex-col items-center justify-center w-full text-xl text-3xl text-black"
        style={{
          fontFamily: "sans-serif",
          top: "98%",
        }}
      >
        <div className="mb-2">
          連續登入 <span className="text-3xl">{continueDay}</span> 天
        </div>

        <div>
          獲得 <span className="text-3xl">{todayReward[0].value}</span> 元折價券
        </div>
      </div>{" "}
    </div>
    // </ThemeProvider>
  );
}
