import React, { createContext, useContext, useReducer } from "react"

const TripContext = createContext()

const initialState = {
  user: { id: "u1", name: "Traveler", email: "demo@globe.trot" },
  trips: [
    {
      id: "t1",
      name: "Europe Explorer",
      startDate: "2026-02-10",
      endDate: "2026-02-20",
      description: "Paris → Berlin → Prague",
      coverUrl: "",
      stops: [
        { id: "s1", city: "Paris", country: "France", startDate: "2026-02-10", endDate: "2026-02-13",
          activities: [
            { id: "a1", title: "Louvre", time: "10:00", cost: 20, type: "Sightseeing", duration: 3 },
            { id: "a2", title: "Seine Cruise", time: "18:00", cost: 15, type: "Leisure", duration: 2 },
          ]
        },
        { id: "s2", city: "Berlin", country: "Germany", startDate: "2026-02-13", endDate: "2026-02-17",
          activities: [{ id: "a3", title: "Museum Island", time: "11:00", cost: 12, type: "Culture", duration: 4 }]
        },
      ],
      budget: { transport: 300, stay: 700, activities: 200, meals: 250 }
    },
  ],
  cities: [
    { id: "c1", name: "Paris", country: "France", costIndex: 4, popularity: 5 },
    { id: "c2", name: "Berlin", country: "Germany", costIndex: 3, popularity: 4 },
    { id: "c3", name: "Prague", country: "Czechia", costIndex: 2, popularity: 4 },
  ],
  activitiesCatalog: [
    { id: "ac1", city: "Paris", title: "Eiffel Tower", type: "Sightseeing", cost: 25, duration: 2 },
    { id: "ac2", city: "Berlin", title: "Brandenburg Gate", type: "Sightseeing", cost: 0, duration: 1 },
    { id: "ac3", city: "Prague", title: "Old Town Walk", type: "Culture", cost: 10, duration: 2 },
  ],
}

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload }
    case "LOGOUT":
      return { ...state, user: null }
    case "ADD_TRIP":
      return { ...state, trips: [...state.trips, action.payload] }
    case "UPDATE_TRIP":
      return { ...state, trips: state.trips.map(t => t.id === action.payload.id ? action.payload : t) }
    case "DELETE_TRIP":
      return { ...state, trips: state.trips.filter(t => t.id !== action.payload) }
    case "ADD_STOP": {
      const { tripId, stop } = action.payload
      return {
        ...state,
        trips: state.trips.map(t => t.id === tripId ? { ...t, stops: [...t.stops, stop] } : t)
      }
    }
    case "REORDER_STOPS": {
      const { tripId, stops } = action.payload
      return { ...state, trips: state.trips.map(t => t.id === tripId ? { ...t, stops } : t) }
    }
    case "ADD_ACTIVITY": {
      const { tripId, stopId, activity } = action.payload
      return {
        ...state,
        trips: state.trips.map(t => {
          if (t.id !== tripId) return t
          return {
            ...t,
            stops: t.stops.map(s => s.id === stopId ? { ...s, activities: [...s.activities, activity] } : s)
          }
        })
      }
    }
    case "UPDATE_BUDGET": {
      const { tripId, budget } = action.payload
      return {
        ...state,
        trips: state.trips.map(t => t.id === tripId ? { ...t, budget } : t)
      }
    }
    default:
      return state
      return state
  }
}

export function TripProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <TripContext.Provider value={{ state, dispatch }}>
      {children}
    </TripContext.Provider>
  )
}

export function useTrips() {
  const ctx = useContext(TripContext)
  if (!ctx) throw new Error("useTrips must be used within TripProvider")
  return ctx
}
