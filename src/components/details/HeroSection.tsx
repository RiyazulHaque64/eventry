import { getBlurData } from "@/utils/blurGenerator";
import Image from "next/image";
import ActionButtons from "../ActionButtons";

const HeroSection = async ({ eventInfo }: { eventInfo: any }) => {
  const { base64 } = await getBlurData(eventInfo?.imageUrl);
  return (
    <section className="container">
      <div className="bg-gradient-to-b from-slate-200/20 to-slate-800/30">
        <Image
          src={eventInfo?.imageUrl}
          alt={eventInfo?.name}
          className="h-[450px] mx-auto"
          width={900}
          height={900}
          placeholder="blur"
          blurDataURL={base64}
        />
      </div>
      <div className="flex items-end">
        <div className="flex-auto py-4">
          <h1 className="font-bold text-2xl">{eventInfo?.name}</h1>
          <p className="text-[#9C9C9C] text-base mt-1">{eventInfo?.location}</p>
          <div className="text-[#737373] text-sm mt-1">
            <span>{eventInfo?.interested_ids?.length} Interested</span>
            <span>|</span>
            <span>{eventInfo?.going_ids?.length} Going</span>
          </div>
        </div>
        <ActionButtons
          fromDetails={true}
          eventId={eventInfo?.id}
          interested_ids={eventInfo?.interested_ids}
          going_ids={eventInfo?.going_ids}
        />
      </div>
    </section>
  );
};

export default HeroSection;
