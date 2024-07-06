import EventDetails from "@/components/details/EventDetails";
import EventVanue from "@/components/details/EventVanue";
import HeroSection from "@/components/details/HeroSection";
import { getSingleEvent } from "@/db/queries";

export const generateMetadata = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const eventInfo = (await getSingleEvent(id)) as any;

  return {
    title: `Eventry - ${eventInfo?.name}`,
    description: eventInfo?.details,
    openGraph: {
      images: [eventInfo?.imageUrl],
    },
  };
};

const detailsPage = async ({ params: { id } }: { params: { id: string } }) => {
  const eventInfo = await getSingleEvent(id);

  return (
    <>
      <HeroSection eventInfo={eventInfo} />
      <section className="container">
        <div className="grid grid-cols-5 gap-12 my-12">
          <EventDetails eventInfo={eventInfo} />
          <EventVanue eventInfo={eventInfo} />
        </div>
      </section>
    </>
  );
};

export default detailsPage;
