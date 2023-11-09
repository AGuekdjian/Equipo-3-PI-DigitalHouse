import React from 'react'
import Pagination from 'react-bootstrap/Pagination';
import { useState, useEffect } from 'react';

const PaginationComponent = ({ items}) => {

  return (
    <div>
      <Pagination>

        <Pagination.Prev />

          {items.map((item) => {
            return item
          })}

        <Pagination.Next />

      </Pagination>
    </div>
  )
}

export default PaginationComponent