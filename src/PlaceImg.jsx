export default function PlaceImg({ place, index = 0, className }) {
  if (!place?.photos?.length) {
    return null;
  }

  const photo = place.photos[index];

  if (!photo?.url) {
    return null;
  }

  const optimizedUrl = photo.url.replace(
    "/upload/",
    "/upload/w_800,q_auto,f_auto/"
  );

  return (
    <img
      src={optimizedUrl}
      alt={place.title}
      className={className || "object-cover"}
    />
  );
}
