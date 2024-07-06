const EventSchemaScript = ({ eventDetails }: { eventDetails: any }) => {
  const eventName = encodeURIComponent(eventDetails?.name);
  const formattedData = {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    name: eventName,
    startDate: new Date(),
    endDate: new Date(),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: eventDetails?.location,
    },
    image: [eventDetails?.imageUrl],
    description:
      "The Adventures of Kira and Morrison is coming to Snickertown in a can't miss performance.",
    organizer: {
      "@type": "Organization",
      name: "Tech Tong",
      url: "https://techtong.com.bd",
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(formattedData) }}
      ></script>
    </>
  );
};

export default EventSchemaScript;
