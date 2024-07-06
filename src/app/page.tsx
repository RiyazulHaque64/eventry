import Loading from "@/components/Loading";
import EventList from "@/components/landing/EventList";
import Header from "@/components/landing/Header";
import { Suspense } from "react";

export default function Home({
  searchParams: { query },
}: {
  searchParams: Record<string, any>;
}) {
  return (
    <section className="container">
      <Header />
      <Suspense key={query} fallback={<Loading />}>
        <EventList query={query} />
      </Suspense>
    </section>
  );
}
