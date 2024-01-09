import Pagination from "react-bootstrap/Pagination";
import { PageItem } from "react-bootstrap";
import { useEffect, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "initial": {
      return {
        totalPages: Math.ceil(action.dataSize / action.dataPerPage),
        currentPage: 1,
        pageWindow: 1,
      };
    }
    case "setPageActive":
      return {
        ...state,
        currentPage: action.page,
        pageWindow: Math.ceil(action.page / action.pagesPerWindow),
      };
    case "prevPage":
      if (state.currentPage === 1) return state;
      return {
        ...state,
        currentPage: state.currentPage - 1,
        pageWindow: Math.ceil((state.currentPage - 1) / action.pagesPerWindow),
      };
    case "nextPage":
      if (state.currentPage === action.total) return state;
      return {
        ...state,
        currentPage: state.currentPage + 1,
        pageWindow: Math.ceil((state.currentPage + 1) / action.pagesPerWindow),
      };
    case "firstPage":
      return { ...state, currentPage: 1, pageWindow: 1 };
    case "lastPage":
      return {
        ...state,
        currentPage: action.page,
        pageWindow: Math.ceil(action.page / action.pagesPerWindow),
      };
    default:
  }
};

const TablePage = ({ setPage, dataSize, dataPerPage, pagesPerWindow }) => {
  const [state, dispatch] = useReducer(reducer, {
    totalPages: Math.ceil(dataSize / dataPerPage),
    currentPage: 1,
    pageWindow: 1,
  });

  useEffect(() => {
    setPage(state.currentPage);
  }, [setPage, state]);

  useEffect(() => {
    dispatch({ type: "initial", dataPerPage: dataPerPage, dataSize: dataSize });
    // console.log(dataSize, dataPerPage, pagesPerWindow, "tablepage");
  }, [dataSize, dataPerPage]);

  return (
    <Pagination className="mt-3">
      <Pagination.First
        onClick={() => {
          dispatch({ type: "firstPage" });
        }}
      />
      <Pagination.Prev
        onClick={() => {
          dispatch({ type: "prevPage", pagesPerWindow: pagesPerWindow });
        }}
      />
      {new Array(pagesPerWindow).fill(0).map((_, i) => {
        if (pagesPerWindow * (state.pageWindow - 1) + 1 + i <= state.totalPages)
          return (
            <PageItem
              onClick={() => {
                dispatch({
                  type: "setPageActive",
                  page: pagesPerWindow * (state.pageWindow - 1) + 1 + i,
                  pagesPerWindow: pagesPerWindow,
                });
              }}
              active={state.currentPage === 6 * (state.pageWindow - 1) + 1 + i}
              key={i}>
              {pagesPerWindow * (state.pageWindow - 1) + 1 + i}
            </PageItem>
          );
      })}
      <Pagination.Next
        onClick={() => {
          dispatch({
            type: "nextPage",
            total: state.totalPages,
            pagesPerWindow: pagesPerWindow,
          });
        }}
      />
      <Pagination.Last
        onClick={() => {
          dispatch({
            type: "lastPage",
            window: state.totalPages,
            page: Math.ceil(state.totalPages),
            pagesPerWindow: pagesPerWindow,
          });
        }}
      />
    </Pagination>
  );
};
export default TablePage;
