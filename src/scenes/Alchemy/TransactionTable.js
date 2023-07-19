import React from 'react';
import { useTable } from 'react-table';

const TransactionTable = ({ data }) => {
  // Define the columns for your table
  const columns = React.useMemo(
    () => [
      {
        Header: 'Block Number',
        accessor: 'blockNum', // accessor is the "key" in your data object
      },
      {
        Header: 'Hash',
        accessor: 'hash',
        Cell: ({ value }) => <a href={`https://goerli.etherscan.io/tx/${value}`} target="_blank" rel="noreferrer">{value}</a>,
      },
      {
        Header: 'From',
        accessor: 'from',
      },
      {
        Header: "To",
        accessor: "to",
      },
      {
        Header: "Value",
        accessor: "value",
      },
    ],
    []
  );

  // Create an instance of the table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} className="table">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TransactionTable;
