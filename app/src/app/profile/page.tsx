"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export default function page() {
  return (
    <div>
      <h2 className="uppercase font-bold text-2xl">User details</h2>
      <Table
        hideHeader
        removeWrapper
        aria-label="Example static collection table"
        className="mt-10"
      >
        <TableHeader>
          <TableColumn>Info</TableColumn>
          <TableColumn>Value</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell className="px-0">
              <h3 className="text-lg">Name</h3>
            </TableCell>
            <TableCell>
              <h3 className="text-lg">Vlad Bielievtsov</h3>
            </TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell className="px-0">
              <h3 className="text-lg">Phone</h3>
            </TableCell>
            <TableCell>
              <h3 className="text-lg">38098765432</h3>
            </TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell className="px-0">
              <h3 className="text-lg">Email</h3>
            </TableCell>
            <TableCell>
              <h3 className="text-lg">vladbieleivtsov@gmail.com</h3>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
