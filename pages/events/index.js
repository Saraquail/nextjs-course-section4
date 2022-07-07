import Head from "next/head";
import { useRouter } from "next/router";

import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";

import { getAllEvents } from "../../helpers/api-util";
import { Fragment } from "react";

function AllEventsPage(props) {
  const { events } = props;
  const router = useRouter();

  function onSearch(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta name="description" content="Find a lot of events" />
      </Head>
      <EventsSearch onSearch={onSearch} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: { events },
    revalidate: 60,
  };
}

export default AllEventsPage;
