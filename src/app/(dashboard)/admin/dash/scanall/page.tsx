"use client";
import React, { useEffect, useRef, useState } from "react";
import { useZxing } from 'react-zxing';

const ScanBarcodePage = () => {
    const [data, setData] = React.useState("Not Found");
    const [ticketId, setTicketId] = React.useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch('/api/ScanTicket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ticketId }),
        });
        const result = await response.json();
        setData(result.message);
        alert(result.message);
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-4xl font-bold mb-8">JOUR J SCANN</h1>
                <form onSubmit={handleSubmit} className="w-full max-w-md">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ticketId">
                            Enter Barcode / Ticket ID
                        </label><br />
                        <input
                            id="ticketId"
                            type="text"
                            value={ticketId}
                            onChange={(e) => setTicketId(e.target.value)}
                            placeholder="Barcode"
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Scan
                        </button>
                    </div>
                </form>
                <p className="text-left mt-4 text-lg font-semibold text-blue-600">{data}</p>
            </div>
        </>
    );
};

export default ScanBarcodePage;