'use client';
import { $Enums } from '@prisma/client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

interface Ticket {
    _id: string;
    userId: string | null;
    paymentId: string | null;
    soldBy: string | null;
    scannedBy: string | null;
    type: "physical" | null;
    isPaid: boolean;
    isUsed: boolean;
}

interface FilterState {
    _id: string;
    userId: string;
    paymentId: string;
    soldBy: string;
    scannedBy: string;
    type: "physical";
    isPaid: boolean;
    isUsed: boolean;
}

function TicketTable() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [filters, setFilters] = useState<FilterState>({
        _id: '',
        userId: '',
        paymentId: '',
        soldBy: '',
        scannedBy: '',
        type: "physical",
        isPaid: false,
        isUsed: false,
    });

    const loadData = async () => {
        try {
            const response = await axios.post('/api/getPtickets');
            console.log(response.data);
            setTickets(response.data.data); // Assuming the data you want is in response.data.data
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const filteredTickets = tickets.filter((ticket) => {
        return (
            (filters._id ? ticket._id.includes(filters._id) : true) &&
            (filters.userId ? ticket.userId?.includes(filters.userId) : true) &&
            (filters.paymentId ? ticket.paymentId?.includes(filters.paymentId) : true) &&
            (filters.soldBy ? ticket.soldBy?.includes(filters.soldBy) : true) &&
            (filters.scannedBy ? ticket.scannedBy?.includes(filters.scannedBy) : true) &&
            (filters.type ? ticket.type === filters.type : true) &&
            (filters.isPaid !== null ? ticket.isPaid === filters.isPaid : true) &&
            (filters.isUsed !== null ? ticket.isUsed === filters.isUsed : true)
        );
    });

    return (
        <>
            <form>
                <input
                    type="text"
                    placeholder="Ticket ID"
                    value={filters._id}
                    onChange={(e) => setFilters({ ...filters, _id: e.target.value })}
                />
                {/* Repeat for other filters */}
                <input
        type="text"
        placeholder="User ID"
        value={filters.userId}
        onChange={(e) => setFilters({ ...filters, userId: e.target.value })}
    />
    <input
        type="text"
        placeholder="Payment ID"
        value={filters.paymentId}
        onChange={(e) => setFilters({ ...filters, paymentId: e.target.value })}
    />
    <input
        type="text"
        placeholder="Sold By"
        value={filters.soldBy}
        onChange={(e) => setFilters({ ...filters, soldBy: e.target.value })}
    />
    <input
        type="text"
        placeholder="Scanned By"
        value={filters.scannedBy}
        onChange={(e) => setFilters({ ...filters, scannedBy: e.target.value })}
    />

    <select
        value={filters.isPaid ? 'Yes' : 'No'}
        onChange={(e) => setFilters({ ...filters, isPaid: e.target.value === 'Yes' })}
    >
        <option value="">Select Paid Status</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
    </select>
    <select
        value={filters.isUsed ? 'Yes' : 'No'}
        onChange={(e) => setFilters({ ...filters, isUsed: e.target.value === 'Yes' })}
    >
        <option value="">Select Used Status</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
    </select>
            </form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Ticket ID</th>
                        <th>User ID</th>
                        <th>Payment ID</th>
                        <th>Sold By</th>
                        <th>Scanned By</th>
                        <th>Type</th>
                        <th>Is Paid</th>
                        <th>Is Used</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTickets.map((ticket, index) => (
                        <tr key={ticket._id}>
                            <td>{ticket._id}</td>
                            <td>{ticket.userId}</td>
                            <td>{ticket.paymentId}</td>
                            <td>{ticket.soldBy}</td>
                            <td>{ticket.scannedBy}</td>
                            <td>{ticket.type}</td>
                            <td>{ticket.isPaid ? 'Yes' : 'No'}</td>
                            <td>{ticket.isUsed ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default TicketTable;