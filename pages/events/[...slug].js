import Head from "next/head";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function FilteredEventsPage() {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();

  const filteredData = router.query.slug;

  if (!filteredData) {
    return <p className="center">Loading...</p>;
  }

  const { data, error } = useSWR(
    "https://nextjs-course-sectionsix-default-rtdb.firebaseio.com/Events.json"
  );

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setLoadedEvents(events);
    }
  }, [data]);

  // if (!loadedEvents) {
  //   return <p className="center">Loading...</p>;
  // }

  const filteredYear = filteredData && filteredData[0];
  const filteredMonth = filteredData && filteredData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  const pageHeadData = (
    <Head>
      <title>Search results</title>
      <meta
        name="description"
        content={`All events for ${numMonth}/${numYear}`}
      />
    </Head>
  );

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents =
    loadedEvents &&
    loadedEvents.filter((event) => {
      const eventDate = new Date(event.date);

      return (
        eventDate.getFullYear() === numYear &&
        eventDate.getMonth() === numMonth - 1
      );
    });

  // if (props.hasError) {
  //   return (
  //     <Fragment>
  //       <ErrorAlert>
  //         <p>Invalid filter! Please adjust your values</p>
  //       </ErrorAlert>
  //       <div className="center">
  //         <Button link="/events">Show All Events</Button>
  //       </div>
  //     </Fragment>
  //   );
  // }

  // if (!props.filteredEvents.length && !props.hasError) {
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const { params } = context;

//   const filteredData = params.slug;

//   const filteredYear = filteredData[0];
//   const filteredMonth = filteredData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: { hasError: true },
//       // notFound: true
//     };
//   }

//   return {
//     props: {
//       filteredEvents,
//       date: {
//         numYear,
//         numMonth,
//       },
//     },
//   };
// }

export default FilteredEventsPage;
