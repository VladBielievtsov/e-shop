"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { useDisclosure } from "@nextui-org/react";
import EditAccountModal from "@/components/EditAccountModal";
import { LiaEdit } from "react-icons/lia";

export default function page() {
  const { userInfo } = useAppSelector((state: RootState) => state.auth);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="uppercase font-bold text-2xl">User details</h2>
        <button
          onClick={onOpen}
          className="flex items-center text-xl hover:underline"
        >
          <LiaEdit />
          <span className="text-base">Edit details</span>
        </button>
      </div>
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
              <h3 className="text-lg">{userInfo?.name}</h3>
            </TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell className="px-0">
              <h3 className="text-lg">Phone</h3>
            </TableCell>
            <TableCell>
              <h3 className="text-lg">{userInfo?.phone || "-"}</h3>
            </TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell className="px-0">
              <h3 className="text-lg">Email</h3>
            </TableCell>
            <TableCell>
              <h3 className="text-lg">{userInfo?.email}</h3>
            </TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell className="px-0">
              <h3 className="text-lg">Region</h3>
            </TableCell>
            <TableCell>
              <h3 className="text-lg">{userInfo?.region || "-"}</h3>
            </TableCell>
          </TableRow>
          <TableRow key="5">
            <TableCell className="px-0">
              <h3 className="text-lg">City</h3>
            </TableCell>
            <TableCell>
              <h3 className="text-lg">{userInfo?.city || "-"}</h3>
            </TableCell>
          </TableRow>
          <TableRow key="6">
            <TableCell className="px-0">
              <h3 className="text-lg">Post office</h3>
            </TableCell>
            <TableCell>
              <h3 className="text-lg">{userInfo?.postOffice || "-"}</h3>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <EditAccountModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        userInfo={userInfo}
      />
    </div>
  );
}
