import React, { useState } from "react";
import Loader from "../components/Layout/Loader";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import EventCard from "../components/Events/EventCard";
import { useSelector } from "react-redux";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  const [open, setOpen] = useState(false);


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          <EventCard active={true} data={allEvents && allEvents[0]} />
          <Footer />
        </div>
      )}
    </>
  );
};

export default EventsPage;