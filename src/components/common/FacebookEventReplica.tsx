"use client"; // Ensure this component is client-side rendered

import React, { useState } from 'react';

// Define the type for event details
interface EventDetails {
  title: string;
  date: string;
  time: string;
  description: string;
  coverImage: string;
  eventUrl: string;
}

const FacebookEventReplica: React.FC = () => {
  // Event details
  const eventDetails: EventDetails = {
    title: "Spectacle Megyes - مڨيــــاس ",
    date: "Saturday, January 25, 2025 ",
    time: "6 PM",
    description:
      "",
    coverImage: "https://scontent.ftun6-1.fna.fbcdn.net/v/t39.30808-6/473240722_909394031349019_7396731374277524064_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=75d36f&_nc_ohc=MCl4Odde2TIQ7kNvgF5usYY&_nc_oc=AdjYFuhVXn4x-8VWNGhykUFQt-YlsdBIXTIQqSEw2Xn-R7PqKDuB4Mv5CScqX_uC0SDDQ1UVSWuasmoaATYF0j3V&_nc_zt=23&_nc_ht=scontent.ftun6-1.fna&_nc_gid=A0U8CrXLPkGUeOKKgMzMCts&oh=00_AYAtqghx1Cql2HsP_igCeyqAUVOv4r3rWUkIunbLrcZ3XA&oe=678F3D2E", // Replace with your event cover image URL
    eventUrl: "https://www.facebook.com/share/18T7X9FoLL/", // Replace with your event URL
  };

  // State for hover effect on the button
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="border rounded shadow-sm"
      style={{ maxWidth: '500px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}
    >
      {/* Event Cover Image */}
      <img
        src={eventDetails.coverImage}
        alt="Event Cover"
        className="img-fluid rounded-top"
        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
      />

      {/* Event Details */}
      <div className="p-3">
        {/* Event Title */}
        <h2
          className="mb-2"
          style={{ fontSize: '20px', fontWeight: 'bold', color: '#1d2129' }}
        >
          {eventDetails.title}
        </h2>

        {/* Event Date and Time */}
        <p
          className="mb-1"
          style={{ fontSize: '14px', color: '#606770' }}
        >
          <strong>Date:</strong> {eventDetails.date}
        </p>
        <p
          className="mb-1"
          style={{ fontSize: '14px', color: '#606770' }}
        >
          <strong>Time:</strong> {eventDetails.time}
        </p>

   

        {/* Event Description */}
        <p
          className="mb-3"
          style={{ fontSize: '14px', color: '#1d2129' }}
        >
          {eventDetails.description}
        </p>

        {/* Link to Event */}
        <a
          href={eventDetails.eventUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="d-block text-center text-decoration-none"
          style={{
            backgroundColor: isHovered ? '#3578e5' : '#1877f2',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          View Event on Facebook
        </a>
      </div>
    </div>
  );
};

export default FacebookEventReplica;