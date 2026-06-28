import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Underdog City — Now Accepting Tenants";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0A0B",
          backgroundImage:
            "radial-gradient(circle at 50% 38%, rgba(168,119,46,0.18), transparent 60%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            letterSpacing: 12,
            color: "#A8772E",
            textTransform: "uppercase",
          }}
        >
          Now Accepting Tenants
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 18,
            fontSize: 118,
            fontWeight: 800,
            letterSpacing: 4,
            color: "#E3DCCB",
            textTransform: "uppercase",
          }}
        >
          Underdog City
        </div>
        <div
          style={{
            display: "flex",
            width: 520,
            height: 2,
            marginTop: 30,
            background:
              "linear-gradient(90deg, transparent, #C9A227 50%, transparent)",
          }}
        />
        <div
          style={{
            display: "flex",
            marginTop: 30,
            fontSize: 30,
            color: "#A9A192",
          }}
        >
          We all rule down here.
        </div>
      </div>
    ),
    { ...size }
  );
}
