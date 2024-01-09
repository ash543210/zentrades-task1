import Table from "react-bootstrap/Table";
import React, { useCallback, useMemo, useState } from "react";
import TablePage from "./TablePage";

const TableData = (props) => {
  const [page, setPage] = useState(1);

  const updateTableData = useCallback(
    (newPage) => {
      setPage(newPage);
    },
    [setPage]
  );
  const col_name = useMemo(() => {
    return ["title", "price", "popularity"];
  }, []);

  return (
    <React.Fragment>
      {props.data.length > 0 && (
        <div className="d-inline w-75 mt-4">
          <Table striped bordered hover responsive className="border">
            <thead>
              <tr>
                <th>Product Rank</th>
                {col_name.map((col, id) => (
                  <th key={id}>
                    {col.charAt(0).toUpperCase() + col.substring(1)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {new Array(6).fill(0).map((_, id) => {
                const rowId = (page - 1) * 6 + id;
                if (rowId < props.data.length)
                  return (
                    <tr key={id}>
                      <td>{(page - 1) * 6 + id + 1}</td>
                      {col_name.map((col, id) => (
                        <td key={id}>{props.data[rowId][col]}</td>
                      ))}
                    </tr>
                  );
              })}
            </tbody>
          </Table>
          <TablePage
            dataPerPage={6}
            pagesPerWindow={6}
            dataSize={props.data.length}
            setPage={updateTableData}
          />
        </div>
      )}
      {!props.data.length && <h2 className="ms-2 mt-2">No data</h2>}
    </React.Fragment>
  );
};

export default TableData;
