import styles from "./entry-header.module.css";

export default function EntryHeader({ title, date, author }) {
  return (
    <div className={styles.entry}>
      {title && <h2 className={styles.title}>{title}</h2>}

      {date && author && (
        <div className={styles.meta}>
          By {author} on <time>{new Date(date).toDateString()}</time>
        </div>
      )}
    </div>
  );
}
