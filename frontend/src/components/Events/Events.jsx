import styles from "../../styles/styles";
import EventCard from "./EventCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Lottie from "react-lottie";
import animationData from "../../assets/animation/no-event.json";
import { getAllEvents } from "../../redux/actions/event";

const Events = () => {
  const dispatch = useDispatch();
  const { allEvents, isLoading } = useSelector((state) => state.events);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>Popular Event</h1>
          </div>
          <div className="w-full grid">
            {allEvents?.length > 0 ? (
              <EventCard data={allEvents[0]} />
            ) : (
              <div className="text-center w-full pb-[110px] text-[20px]">
                <Lottie options={defaultOptions} width={50} height={50} />
                <h1 className="text-center mb-14 text-[25px] text-[#000000a1]">
                  There is No Event
                </h1>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;