"use client";

import { StaffProvider } from "./_store/StaffContext";
import StaffFilter from "./StaffFilter";
import StaffTable from "./StaffTable";

export default function Staff() {
  return (
    <StaffProvider>
      <StaffFilter />
      <StaffTable />
    </StaffProvider>
  );
}
