import { useEffect, useState } from "react";
import { getAll } from "./services/entries";
import type { DiaryEntry } from "./types";
import DiaryEntries from "./components/DiaryEntries";
import DiaryForm from "./components/DiaryForm";

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAll().then((data) => setDiaryEntries(data));
  }, []);

  const handleEntryAdded = (newEntry: DiaryEntry) => {
    setDiaryEntries([...diaryEntries, newEntry]);
  };

  return (
    <div>
      <DiaryForm onEntryAdded={handleEntryAdded} />
      <DiaryEntries entries={diaryEntries} />
    </div>
  );
};

export default App;