import { useMemo } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Button, Input, Select } from '@chakra-ui/react';

const AirlineRevenueTable = ({ data = [] }) => {
    const columns = useMemo(
        () => [
            {
                Header: 'Airline Name',
                accessor: 'airlineName', // accessor is the "key" in the data
            },
            {
                Header: 'Revenue',
                accessor: 'revenue',
            },
            {
                Header: 'Revenue Start Date',
                accessor: 'revenueStartDate',
            },
            {
                Header: 'Last Revenue Date',
                accessor: 'lastRevenueDate',
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 10 }, // Set initial state for pageIndex and pageSize
        },
        useSortBy,
        usePagination
    );

    return (
        <div className="w-full bg-white rounded-lg py-6 px-2">
            <p className="text-2xl font-bold mx-5 pb-7">Airline All Time Revenue</p>
            <Table {...getTableProps()} width="full">
                <Thead>
                    {headerGroups.map((headerGroup) => (
                        <Tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    {/* Add a sort direction indicator */}
                                    <span>{column.isSorted ? (column.isSortedDesc ? ' ↓' : ' ↑') : ''}</span>
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        // use page instead of rows
                        prepareRow(row);
                        return (
                            <Tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                                ))}
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
            <Box className="pagination m-4 flex gap-4">
                <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </Button>
                <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </Button>
                <Button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </Button>
                <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </Button>
                <span className="">
                    Page{' '}
                    <div className="font-bold">
                        {pageIndex + 1} of {pageOptions.length}{' '}
                    </div>
                </span>
                <span className="">
                    | Go to page:{' '}
                    <Input
                        className="max-w-12"
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            gotoPage(page);
                        }}
                        style={{ width: '100px' }}
                    />
                </span>
                <div className="max-w-32">
                    <Select
                        className=""
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                        }}
                    >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </Select>
                </div>
            </Box>
        </div>
    );
};

export default AirlineRevenueTable;
