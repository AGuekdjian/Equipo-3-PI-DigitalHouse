import React from "react";
import Pagination from "react-bootstrap/Pagination";
import { useState, useEffect } from "react";

const PaginationComponent = ({ items }) => {
  return (
    <div className="mb-8">
      <Pagination>
        <Pagination.Prev />

        {items.map((item, index) => {
          return <div key={index}>{item}</div>;
        })}

        <Pagination.Next />
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
