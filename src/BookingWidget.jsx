import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [noOfGuests, setNoOfGuests] = useState(1);

  const [name, setName] = useState("");
  const [phno, setPhno] = useState("");
  const [redirect, setRedirect] = useState(false);

  const [bookingId, setBookingId] = useState("");

  const [errors, setErrors] = useState({});

  const { user } = useContext(UserContext);

  const today = new Date();
  const localDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  let noOfNights = 0;

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  if (checkIn && checkOut) {
    noOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  function validate() {
    const newErrors = {};
    console.log(place);

    if (!checkIn) newErrors.checkIn = "Check-in required";
    if (!checkOut) newErrors.checkOut = "Check-out required";

    if (checkIn && checkOut && noOfNights <= 0) {
      newErrors.checkOut = "Must be after check-in";
    }

    if (!noOfGuests || noOfGuests < 1) {
      newErrors.noOfGuests = "Minimum 1 guest required";
    }
    if (noOfGuests > place?.maxGuests) {
      newErrors.noOfGuests = `Maximum ${place?.maxGuests} guests allowed`;
    }

    if (noOfNights > 0) {
      if (!name) newErrors.name = "Name required";
      if (!phno) newErrors.phno = "Phone required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function bookThisPlace() {
    if (!validate()) return;
    const totalPrice = noOfNights * place.price;

    const bookindData = {
      place: place._id,
      checkIn,
      checkOut,
      noOfGuests,
      name,
      phno,
      price: totalPrice,
    };
    const res = await axios.post("/bookings", bookindData);
    // console.log(res);
    setBookingId(res.data._id);
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/account/bookings/" + bookingId} />;
  }

  return (
    <div className="bg-gray-100 shadow p-4 rounded-2xl ">
      <div className="text-2xl text-center mb-4">
        Price: <span className="font-semibold">₹{place.price}</span>/per night
      </div>

      <div className="border border-gray-300 rounded-2xl">
        <div className="flex">
          <div className="p-3 w-1/2">
            <label>Check In: </label>
            <input
              type="date"
              value={checkIn}
              min={localDate}
              onChange={(e) => {
                setCheckIn(e.target.value);
                setErrors((prev) => ({ ...prev, checkIn: "" }));
              }}
              className={`border rounded-2xl px-3 py-2 w-full ${errors.checkIn ? "border-red-500" : ""
                }`}
            />
            {errors.checkIn && (
              <p className="text-red-500 text-sm mt-0.5 ml-1">{errors.checkIn}</p>
            )}
          </div>
          <div className=" p-3 border-l ">
            <label>Check Out: </label>
            <input
              type="date"
              value={checkOut}
              min={checkIn || localDate}
              onChange={(e) => {
                setCheckOut(e.target.value);
                setErrors((prev) => ({ ...prev, checkOut: "" }));
              }}
              className={`border rounded-2xl px-3 py-2 w-full ${errors.checkOut ? "border-red-500" : ""
                }`}
            />
            {errors.checkOut && (
              <p className="text-red-500 text-sm mt-0.5 ml-1">{errors.checkOut}</p>
            )}
          </div>
        </div>

        <div className=" p-3 border-t">
          <label>No of guests: </label>
          <input
            type="number"
            value={noOfGuests}
            onChange={(e) => {
              setNoOfGuests(e.target.value);
              setErrors((prev) => ({ ...prev, noOfGuests: "" }));
            }}
            className={`border rounded px-2 ${errors.noOfGuests ? "border-red-500" : ""
              }`}
          />
          {errors.noOfGuests && (
            <p className="text-red-500 text-sm mt-0.5 ml-1">{errors.noOfGuests}</p>
          )}
        </div>
        {noOfNights > 0 && (
          <div className=" p-3 border-t">
            <label>Your full name: </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((prev) => ({ ...prev, name: "" }));
              }}
              className={`${errors.name ? "border-red-500 border" : ""}`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-0.5 ml-1">{errors.name}</p>
            )}

            <label>Your phone number: </label>
            <input
              type="tel"
              value={phno}
              onChange={(e) => {
                setPhno(e.target.value);
                setErrors((prev) => ({ ...prev, phno: "" }));
              }}
              className={`${errors.phno ? "border-red-500 border" : ""}`}
            />
            {errors.phno && (
              <p className="text-red-500 text-sm mt-0.5 ml-1">{errors.phno}</p>
            )}

          </div>
        )}
      </div>

      <button className="primary mt-4" onClick={bookThisPlace}>
        Book this place
        {noOfNights > 0 && <span> ₹{noOfNights * place.price}</span>}
      </button>
    </div>
  );
}
