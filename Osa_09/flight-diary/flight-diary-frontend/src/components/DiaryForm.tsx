import { useState } from "react";
import { create } from "../services/entries";
import type { NewDiaryEntry, DiaryEntry } from "../types";

interface DiaryFormProps {
  onEntryAdded: (entry: DiaryEntry) => void;
}

const DiaryForm = ({ onEntryAdded }: DiaryFormProps) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState<"great" | "good" | "ok" | "poor">("great");
  const [weather, setWeather] = useState<"sunny" | "rainy" | "cloudy" | "stormy" | "windy">("sunny");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newEntry: NewDiaryEntry = {
      date,
      visibility,
      weather,
      comment,
    };

    try {
      const addedEntry = await create(newEntry);
      onEntryAdded(addedEntry);
      setDate("");
      setVisibility("great");
      setWeather("sunny");
      setComment("");
    } catch (error) {
      console.error("Failed to add entry", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        Visibility:
        <input type="radio" id="great" name="visibility" value="great" checked={visibility === "great"} onChange={() => setVisibility("great")} />
        <label htmlFor="great">great</label>
        <input type="radio" id="good" name="visibility" value="good" checked={visibility === "good"} onChange={() => setVisibility("good")} />
        <label htmlFor="good">good</label>
        <input type="radio" id="ok" name="visibility" value="ok" checked={visibility === "ok"} onChange={() => setVisibility("ok")} />
        <label htmlFor="ok">ok</label>
        <input type="radio" id="poor" name="visibility" value="poor" checked={visibility === "poor"} onChange={() => setVisibility("poor")} />
        <label htmlFor="poor">poor</label>
      </div>
      <div>
        Weather:
        <input type="radio" id="sunny" name="weather" value="sunny" checked={weather === "sunny"} onChange={() => setWeather("sunny")} />
        <label htmlFor="sunny">sunny</label>
        <input type="radio" id="rainy" name="weather" value="rainy" checked={weather === "rainy"} onChange={() => setWeather("rainy")} />
        <label htmlFor="rainy">rainy</label>
        <input type="radio" id="cloudy" name="weather" value="cloudy" checked={weather === "cloudy"} onChange={() => setWeather("cloudy")} />
        <label htmlFor="cloudy">cloudy</label>
        <input type="radio" id="stormy" name="weather" value="stormy" checked={weather === "stormy"} onChange={() => setWeather("stormy")} />
        <label htmlFor="stormy">stormy</label>
        <input type="radio" id="windy" name="weather" value="windy" checked={weather === "windy"} onChange={() => setWeather("windy")} />
        <label htmlFor="windy">windy</label>
      </div>
      <div>
        <label>
          Comment:
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default DiaryForm;