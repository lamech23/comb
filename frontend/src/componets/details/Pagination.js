import React from "react";
import "../../css/pagination.css";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  const totalPages =Math.ceil(totalPosts / postsPerPage)

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} className="page-link ">
              {number}
            </a>
          </li>
        ))}
    
      </ul>
    </nav>
  );
};

export default Pagination;
