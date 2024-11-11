import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function IdleTimeout({ timeout, onIdle, isLogin, children }) {
  const chatStatus = useSelector(
    (state) => state?.chat?.onlineUsers[state?.auth?.userData?.id],
  );
  const updatedStatus = JSON.parse(
    localStorage.getItem("online_status") ?? null,
  )?.status;

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isLogin) {
      let activityTimer;

      function resetTimer() {
        clearTimeout(activityTimer);
        activityTimer = setTimeout(() => {
          setIsActive(false);
          if (
            !updatedStatus ||
            (updatedStatus && updatedStatus?.status === "online")
          ) {
            onIdle("inactive");
          }
        }, timeout);
      }

      function handleActivity() {
        if (!isActive && chatStatus !== "online" && !updatedStatus) {
          onIdle("active");
          if (!isActive) {
            setIsActive(true);
            clearTimeout(activityTimer);
          }
        }

        resetTimer();
      }

      window.addEventListener("mousemove", handleActivity);
      window.addEventListener("keydown", handleActivity);
      window.addEventListener("touchstart", handleActivity);

      resetTimer();

      if (chatStatus === "away") {
        clearTimeout(activityTimer);
      }

      return () => {
        window.removeEventListener("mousemove", handleActivity);
        window.removeEventListener("keydown", handleActivity);
        window.removeEventListener("touchstart", handleActivity);
        clearTimeout(activityTimer);
      };
    }
  }, [timeout, isActive, onIdle]);

  return children;
}

export default IdleTimeout;
