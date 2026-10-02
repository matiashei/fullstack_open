import type { DiaryEntry } from "../types";

interface DiaryEntriesProps {
  entries: DiaryEntry[];
}

const DiaryEntries = ({ entries }: DiaryEntriesProps) => {
  return (
    <div>
      <h1>Diary entries</h1>
      {entries.map((entry) => (
        <div key={entry.id}>
          <h2>{entry.date}</h2>
          <p>
            visibility: {entry.visibility}
            <br />
            weather: {entry.weather}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DiaryEntries;
