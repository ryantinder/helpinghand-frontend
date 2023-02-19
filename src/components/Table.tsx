import React from 'react';
import Project from './Project';
import ZipCodePage from './GetZipCode';
import { useState } from 'react';
type ActualTableProps = {
    addresses: string[],
    id: number
}

const Table: React.FC<ActualTableProps> = ({ addresses, id }) => {
    const [zipCode, setZipCode] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
    <div className='w-2/3 mx-auto mt-8'>    
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
        <div className="mt-8">
        {addresses.map((address, index) => {
            return (
                <div key={index}>
                    <Project address={address} id={id} />
                </div>
            )
        })
        }
        </div>
    </div>
  );
};

export default Table;
