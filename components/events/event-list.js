import EventItem from "./event-item";
import styles from "./event-list.module.css";

function EventList(props) {
  const { items } = props;
  return (
    <ul className={styles.list}>
      {items.map((i) => {
        return (
          <EventItem
            key={i.id}
            id={i.id}
            title={i.title}
            location={i.location}
            date={i.date}
            image={i.image}
          />
        );
      })}
    </ul>
  );
}
export default EventList;
