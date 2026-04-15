import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState({});

  function formatTime12h(time) {
    if (!time) return "";

    const [hour, minute] = time.split(":");
    let h = parseInt(hour, 10);

    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12; // convert 0 → 12

    return `${h}:${minute} ${ampm}`;
  }

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((res) => {
      setPlace(res.data);
    });
  }, [id]);

  return (
    <div className="mt-4 pt-8 bg-gray-200 -mx-8 px-8">
      <h1 className="text-2xl mr-48">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />
      <div className="mt-4 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          Check-In: {formatTime12h(place.checkIn)}
          <br />
          Check-out: {formatTime12h(place.checkOut)}
          <br />
          Max number of guests: {place.maxGuests}
        </div>

        <div>
          <BookingWidget place={place} />
        </div>
      </div>

      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="mt-2 font-semibold text-2xl">Extra Info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
}
