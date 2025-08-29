import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  events: [],
  allEvents: [],
  event: null,
  success: false,
  error: null,
  message: null,
};

export const eventReducer = createReducer(initialState, {
  // Create event
  eventCreateRequest: (state) => {
    state.isLoading = true;
  },
  eventCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.event = action.payload;
    state.success = true;
  },
  eventCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // Get all events of shop
  getAllEventsShopRequest: (state) => {
    state.isLoading = true;
  },
  getAllEventsShopSuccess: (state, action) => {
    state.isLoading = false;
    state.events = action.payload;
  },
  getAllEventsShopFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // Delete event of a shop
  deleteEventRequest: (state) => {
    state.isLoading = true;
  },
  deleteEventSuccess: (state, action) => {
    state.isLoading = false;
    state.message = "Event deleted successfully!";
    state.events = state.events.filter((event) => event._id !== action.payload);
    state.allEvents = state.allEvents.filter((event) => event._id !== action.payload);
  },
  deleteEventFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // Get all events
  getAllEventsRequest: (state) => {
    state.isLoading = true;
  },
  getAllEventsSuccess: (state, action) => {
    state.isLoading = false;
    state.allEvents = action.payload;
  },
  getAllEventsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  clearError: (state) => {
    state.error = null;
  },
});