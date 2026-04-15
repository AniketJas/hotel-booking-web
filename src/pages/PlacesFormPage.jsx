// import { useEffect, useState } from "react";
// import axios from "axios";
// import Perks from "../PerksLabel";
// import PhotosUploader from "../PhotosUploader";
// import AccountNav from "../AccountNav";
// import { Navigate, useParams } from "react-router-dom";

// export default function PlacesFormPage() {
//   const { id } = useParams();

//   const [title, setTitle] = useState("");
//   const [address, setAddress] = useState("");
//   const [addedPhotos, setAddedPhotos] = useState([]);
//   const [description, setDescription] = useState("");
//   const [perks, setPerks] = useState([]);
//   const [extraInfo, setExtraInfo] = useState("");
//   const [checkIn, setCheckIn] = useState("");
//   const [checkOut, setCheckOut] = useState("");
//   const [maxGuests, setMaxGuests] = useState(1);
//   const [price, setPrice] = useState(100);
//   const [redirect, setRedirect] = useState(false);

//   useEffect(() => {
//     //for editing values
//     if (!id) {
//       return;
//     } else {
//       axios.get("/places/" + id).then((response) => {
//         const { data } = response;
//         setTitle(data.title);
//         setAddress(data.address);
//         setAddedPhotos(data.photos);
//         setDescription(data.description);
//         setPerks(data.perks);
//         setExtraInfo(data.extraInfo);
//         setCheckIn(data.checkIn);
//         setCheckOut(data.checkOut);
//         setMaxGuests(data.maxGuests);
//         setPrice(data.price);
//       });
//     }
//   }, [id]);

//   function inputHeader(text) {
//     return <h2 className="text-2xl mt-4">{text}</h2>;
//   }

//   function inputDesc(text) {
//     return <p className="text-gray-500 text-sm">{text}</p>;
//   }

//   function preInput(header, desc) {
//     return (
//       <>
//         {inputHeader(header)}
//         {inputDesc(desc)}
//       </>
//     );
//   }

//   async function savePlace(e) {
//     e.preventDefault();

//     const placeData = {
//       title,
//       address,
//       addedPhotos,
//       description,
//       perks,
//       extraInfo,
//       checkIn,
//       checkOut,
//       maxGuests,
//       price,
//     };
//     if (id) {
//       await axios.put("/places", { id, ...placeData });
//     } else {
//       await axios.post("/places", placeData);
//     }
//     setRedirect(true);
//   }

//   if (redirect) {
//     return <Navigate to={"/account/places"} />;
//   }

//   return (
//     <div>
//       <AccountNav />
//       <form onSubmit={savePlace}>
//         {preInput(
//           "Title",
//           "title for your place. should be short and catchy as in advertisement."
//         )}
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="title, for example: My lovely apt"
//         />

//         {preInput("Address", "Address to this place.")}
//         <input
//           type="text"
//           placeholder="address"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//         />

//         {preInput("Photos", "more = better")}
//         <PhotosUploader
//           addedPhotos={addedPhotos}
//           onChange={(ev) => setAddedPhotos(ev)}
//         />

//         {preInput("Description", "description of the place")}
//         <textarea
//           className="h-32"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />

//         {preInput("Perks", "select all the perks of your place")}
//         <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
//           <Perks selected={perks} onChange={setPerks} />
//         </div>

//         {preInput("Extra Info", "house rules, etc..")}
//         <textarea
//           className="h-32"
//           value={extraInfo}
//           onChange={(e) => setExtraInfo(e.target.value)}
//         />

//         {preInput(
//           "Check In & Out times",
//           "add check in and out times, remember to have some window for cleaning the room between guests"
//         )}
//         <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
//           <div>
//             <h3 className="mt-2 -mb-1">Check in time</h3>
//             <input
//               type="text"
//               placeholder="14:00"
//               value={checkIn}
//               onChange={(e) => setCheckIn(e.target.value)}
//             />
//           </div>
//           <div>
//             <h3 className="mt-2 -mb-1">Check out time</h3>
//             <input
//               type="text"
//               placeholder="11:00"
//               value={checkOut}
//               onChange={(e) => setCheckOut(e.target.value)}
//             />
//           </div>
//           <div>
//             <h3 className="mt-2 -mb-1">Max number of guests</h3>
//             <input
//               type="number"
//               placeholder="1"
//               value={maxGuests}
//               onChange={(e) => setMaxGuests(e.target.value)}
//             />
//           </div>
//           <div>
//             <h3 className="mt-2 -mb-1">Price</h3>
//             <input
//               type="number"
//               placeholder="1"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//             />
//           </div>
//         </div>
//         <button className="primary my-4">Save</button>
//       </form>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";
import Perks from "../PerksLabel";
import PhotosUploader from "../PhotosUploader";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [price, setPrice] = useState("");
  const [redirect, setRedirect] = useState(false);

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (!id) return;

    axios.get("/places/" + id).then(({ data }) => {
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  function validate() {
    const newErrors = {};

    if (!title) newErrors.title = "Title is required";
    else if (title.length < 5)
      newErrors.title = "Title must be at least 5 characters";

    if (!address) newErrors.address = "Address is required";

    if (!addedPhotos || addedPhotos.length === 0)
      newErrors.photos = "At least one photo is required";

    if (!checkIn) newErrors.checkIn = "Check-in time required";

    if (!checkOut) newErrors.checkOut = "Check-out time required";

    if (checkIn && checkOut && checkIn >= checkOut)
      newErrors.checkOut = "Check-out must be after check-in";

    if (!maxGuests || maxGuests < 1)
      newErrors.maxGuests = "At least 1 guest required";

    if (!price || price <= 0)
      newErrors.price = "Price must be greater than 0";

    return newErrors;
  }

  async function savePlace(e) {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    setTouched({
      title: true,
      address: true,
      photos: true,
      checkIn: true,
      checkOut: true,
      maxGuests: true,
      price: true,
    });

    if (Object.keys(validationErrors).length > 0) return;

    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };

    console.log("Submitting place data:", placeData);
    if (id) {
      await axios.put("/places", { id, ...placeData });
    } else {
      await axios.post("/places", placeData);
    }

    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDesc(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, desc) {
    return (
      <>
        {inputHeader(header)}
        {inputDesc(desc)}
      </>
    );
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {/* Title */}
        {preInput("Title", "Short and catchy title")}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => setTouched(p => ({ ...p, title: true }))}
          className={`w-full border px-3 py-2 rounded-md ${errors.title && touched.title ? "border-red-500" : "border-gray-300"
            }`}
        />
        {errors.title && touched.title && (
          <p className="text-red-500 text-xs">{errors.title}</p>
        )}

        {/* Address */}
        {preInput("Address", "Address of the place")}
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onBlur={() => setTouched(p => ({ ...p, address: true }))}
          className={`w-full border px-3 py-2 rounded-md ${errors.address && touched.address
            ? "border-red-500"
            : "border-gray-300"
            }`}
        />
        {errors.address && touched.address && (
          <p className="text-red-500 text-xs">{errors.address}</p>
        )}

        {/* Photos */}
        {preInput("Photos", "Upload photos")}
        <PhotosUploader
          addedPhotos={addedPhotos}
          onChange={(ev) => {
            setAddedPhotos(ev);
            setTouched(p => ({ ...p, photos: true }));
          }}
        />
        {errors.photos && touched.photos && (
          <p className="text-red-500 text-xs">{errors.photos}</p>
        )}

        {/* Description */}
        {preInput("Description", "Describe the place")}
        <textarea
          className="h-32 w-full border rounded-md px-3 py-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Perks */}
        {preInput("Perks", "Select perks")}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>

        {/* Extra Info */}
        {preInput("Extra Info", "Rules etc.")}
        <textarea
          className="h-32 w-full border rounded-md px-3 py-2"
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />

        {/* Time + Guests + Price */}
        {preInput("Check In & Out", "Set timings and limits")}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          {/* Check In */}
          <div>
            <h3>Check-in</h3>
            <input
              type="time"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              onBlur={() => setTouched(p => ({ ...p, checkIn: true }))}
              className={`w-full border px-2 py-2 rounded-2xl ${errors.checkIn && touched.checkIn
                ? "border-red-500"
                : "border-gray-300"
                }`}
            />
            {errors.checkIn && touched.checkIn && (
              <p className="text-red-500 text-xs">{errors.checkIn}</p>
            )}
          </div>

          {/* Check Out */}
          <div>
            <h3>Check-out</h3>
            <input
              type="time"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              onBlur={() => setTouched(p => ({ ...p, checkOut: true }))}
              className={`w-full border px-2 py-2 rounded-2xl ${errors.checkOut && touched.checkOut
                ? "border-red-500"
                : "border-gray-300"
                }`}
            />
            {errors.checkOut && touched.checkOut && (
              <p className="text-red-500 text-xs">{errors.checkOut}</p>
            )}
          </div>

          {/* Guests */}
          <div>
            <h3>Guests</h3>
            <input
              type="number"
              value={maxGuests}
              placeholder="1"
              onChange={(e) => setMaxGuests(Number(e.target.value))}
              onBlur={() => setTouched(p => ({ ...p, maxGuests: true }))}
              className={`w-full border px-2 py-1 rounded-md ${errors.maxGuests && touched.maxGuests
                ? "border-red-500"
                : "border-gray-300"
                }`}
            />
            {errors.maxGuests && touched.maxGuests && (
              <p className="text-red-500 text-xs">{errors.maxGuests}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <h3>Price</h3>
            <input
              type="number"
              placeholder="100"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              onBlur={() => setTouched(p => ({ ...p, price: true }))}
              className={`w-full border px-2 py-1 rounded-md ${errors.price && touched.price
                ? "border-red-500"
                : "border-gray-300"
                }`}
            />
            {errors.price && touched.price && (
              <p className="text-red-500 text-xs">{errors.price}</p>
            )}
          </div>
        </div>

        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}