import React, { Component } from 'react'

const TableHeader  = ({columns}) => (
  <thead>
    <tr>
      { columns.map(column => {
        column = column.replace( /([A-Z])/g, " $1" );
        column = column.charAt(0).toUpperCase() + column.slice(1);
        return (
          <th key={column}>{column}</th>)
        })
      }
    </tr>
  </thead>
)

export default TableHeader
