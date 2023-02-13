import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, handlePageClick }) => {
  return (
    <ReactPaginate
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      pageCount={pageCount}
      previousLabel="<"
      pageClassName="px-2"
      pageLinkClassName="page-link waves-effect"
      previousClassName="px-2"
      previousLinkClassName="page-link"
      nextClassName="px-2"
      nextLinkClassName="page-link"
      breakLabel="..."
      breakClassName="px-2"
      breakLinkClassName="page-link"
      containerClassName="flex justify-center"
      activeClassName="bg-gray-600 text-white"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
