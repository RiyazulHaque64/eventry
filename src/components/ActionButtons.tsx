"use client";
import { addInterestedEvent } from "@/actions";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const ActionButtons = ({
  fromDetails,
  eventId,
  interested_ids,
  going_ids,
}: {
  fromDetails?: boolean;
  eventId: string;
  interested_ids: string[];
  going_ids: string[];
}) => {
  const authContext = useAuth();
  const isInterested = interested_ids?.find(
    (id: string) => id === authContext?.auth.id
  );
  const isGoing = going_ids?.find((id: string) => id === authContext?.auth.id);
  const [interested, setInterested] = useState(!!isInterested);
  const [going, setGoing] = useState(!!isGoing);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const toggleInterest = async () => {
    if (authContext?.auth?.id) {
      await addInterestedEvent(eventId, authContext?.auth?.id);
      setInterested(!interested);
    } else {
      router.push("/login");
    }
  };

  const markGoing = () => {
    if (authContext?.auth?.id) {
      router.push(`/payment/${eventId}`);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className={`w-full flex gap-4 mt-4 ${fromDetails && "flex-1"}`}>
      <button
        onClick={() =>
          startTransition(() => {
            toggleInterest();
          })
        }
        className={`w-full ${
          interested && "bg-indigo-600 hover:bg-indigo-800"
        }`}
      >
        {interested ? "Uninterested" : "Interested"}
      </button>
      <button
        disabled={authContext?.auth && going}
        onClick={markGoing}
        className="text-center w-full bg-[#464849] px-2 py-2 rounded-md border border-[#5f5f5f]/50 shadow-sm cursor-pointer hover:bg-[#3c3d3d] transition-colors active:translate-y-1"
      >
        Going
      </button>
    </div>
  );
};

export default ActionButtons;
