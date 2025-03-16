'use client'

import { useState } from "react";

export default function JokeGenerator() {
  const [topic, setTopic] = useState("random");
  const [tone, setTone] = useState("silly");
  const [type, setType] = useState("pun");
  const [temperature, setTemperature] = useState(0.7);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6">AI Joke Generator 🤖😂</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <p className="text-gray-400 mb-4">Select joke parameters below:</p>

        {/* Topic Selection */}
        <label className="block text-sm mb-2">Choose a Topic:</label>
        <select
          className="w-full p-2 rounded bg-gray-700 text-white"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        >
          <option value="random">Random</option>
          <option value="work">Work</option>
          <option value="people">People</option>
          <option value="animals">Animals</option>
          <option value="food">Food</option>
          <option value="television">Television</option>
        </select>

        {/* Tone Selection */}
        <label className="block text-sm mt-4 mb-2">Choose a Tone:</label>
        <select
          className="w-full p-2 rounded bg-gray-700 text-white"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        >
          <option value="silly">Silly</option>
          <option value="sarcastic">Sarcastic</option>
          <option value="witty">Witty</option>
          <option value="dark">Dark</option>
          <option value="goofy">Goofy</option>
        </select>

        {/* Joke Type Selection */}
        <label className="block text-sm mt-4 mb-2">Choose Joke Type:</label>
        <select
          className="w-full p-2 rounded bg-gray-700 text-white"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="pun">Pun</option>
          <option value="knock-knock">Knock-Knock</option>
          <option value="story">Story</option>
        </select>

        {/* Temperature Slider */}
        <label className="block text-sm mt-4 mb-2">Creativity Level:</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={temperature}
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
          className="w-full"
        />
        <p className="text-sm text-gray-400">Current: {temperature}</p>

        {/* Generate Joke Button */}
        <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Generate Joke
        </button>
      </div>
    </div>
  );
}
