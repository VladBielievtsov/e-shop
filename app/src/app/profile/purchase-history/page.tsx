"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Pagination,
} from "@nextui-org/react";

export default function PurchaseHistory() {
  const rows = [
    {
      key: "1",
      title: "Tony Reichert",
      price: 2219,
      status: "Fulfilled",
    },
    {
      key: "2",
      title: "Zoey Lang",
      price: 376,
      status: "Canceled",
    },
    {
      key: "3",
      title: "Jane Fisher",
      price: 463,
      status: "Completed",
    },
    {
      key: "4",
      title: "William Howard",
      price: 1748,
      status: "Completed",
    },
  ];

  const columns = [
    {
      key: "title",
      label: "TITLE",
    },
    {
      key: "price",
      label: "PRICE",
    },
    {
      key: "status",
      label: "STATUS",
    },
  ];

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(rows.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return rows.slice(start, end);
  }, [page, rows]);

  return (
    <div>
      <h2 className="uppercase font-bold text-2xl">Purchase History</h2>
      <div className="mt-10">
        <Table
          aria-label="Example table with dynamic content"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                //@ts-ignore
                color="black"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={items} emptyContent={"No rows to display."}>
            {(item) => (
              <TableRow key={item.key}>
                <TableCell>{item.title}</TableCell>
                <TableCell>${item.price}.00</TableCell>
                <TableCell>
                  <span
                    className={`${
                      item.status === "Fulfilled" ? "bg-zinc-300" : ""
                    } ${item.status === "Canceled" ? "bg-red-400" : ""} ${
                      item.status === "Completed" ? "bg-green-400" : ""
                    } px-2 py-1 rounded-md`}
                  >
                    {item.status}
                  </span>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
