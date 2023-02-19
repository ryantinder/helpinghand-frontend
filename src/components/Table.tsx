import React from 'react';
import Project from './Project';
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
            <div className="flex flex-col justify-center items-center">
                <form onSubmit={handleSubmit} className="bg-white rounded-lg mt-auto">
                    <label htmlFor="zipCode" className="flex justify-center block font-inter text-lg font-medium text-gray-800 mb-4">Filter by zip code:</label>
                    <input
                        type="text"
                        id="zipCode"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        className="block w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                </form>
            </div>

            <div className="mt-8">
                {addresses.map((address, index) => {
                    return (
                        <div key={index} >
                            <Project address={address} id={id} zipCode={zipCode} />
                        </div>
                    )
                })
                }
            </div>
        </div>
    );
};

export default Table;
