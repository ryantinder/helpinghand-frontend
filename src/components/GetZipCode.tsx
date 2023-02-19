import { useState } from 'react';

function ZipCodePage() {
  const [zipCode, setZipCode] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here, you can do something with the user's zip code,
    // such as passing it as a parameter to the page's URL.
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="zipCode">Enter your zip code:</label>
      <input
        type="text"
        id="zipCode"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      />
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Submit
      </button>
    </form>
  );
}

export default ZipCodePage;
