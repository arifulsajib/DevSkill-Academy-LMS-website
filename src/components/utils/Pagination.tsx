interface Props {
  pageHandler: (number: number) => void;
  nextPage: string | null | undefined;
  prevPage: string | null | undefined;
  currentPage: number;
}

const Pagination = ({ pageHandler, nextPage, prevPage, currentPage }: Props) => {
  const pageNextHandler = () => {
    if (nextPage !== null) pageHandler(++currentPage);
  };

  const pagePrevHandler = () => {
    if (prevPage !== null) pageHandler(--currentPage);
  };
  return (
    <div className="flex align-items-center justify-content-center">
      <button className="btn btn-info me-2" disabled={prevPage === null ? true : false} onClick={pagePrevHandler}>
        Prev
      </button>
      <button className="btn btn-info" disabled={nextPage === null ? true : false} onClick={pageNextHandler}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
