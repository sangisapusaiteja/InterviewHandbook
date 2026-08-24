/* eslint-disable @next/next/no-img-element */

/**
 * User avatar: shows the Google profile picture when available,
 * otherwise falls back to initials.
 */
export default function Avatar({
  src,
  name,
  className = "",
}: {
  src?: string | null;
  name?: string;
  className?: string;
}) {
  if (src) {
    return (
      <img
        src={src}
        alt={name ? `${name}'s avatar` : "avatar"}
        referrerPolicy="no-referrer"
        className={`${className} object-cover`}
      />
    );
  }

  return <span className={className}>{name ? getInitials(name) : "?"}</span>;
}

function getInitials(username: string): string {
  const parts = username.split(/[^a-zA-Z0-9]+/).filter(Boolean).slice(0, 2);
  if (parts.length > 0) {
    return parts.map((part) => part[0]?.toUpperCase() || "").join("");
  }
  return username.slice(0, 2).toUpperCase();
}
