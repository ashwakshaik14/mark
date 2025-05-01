import React, { useRef, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";

const columnHelper = createColumnHelper();

const formatPhone = (phone) => {
  const match = phone?.match(/(\d{3})(\d{3})(\d{4})/);
  return match ? `+1-${match[1]}-${match[2]}-${match[3]}` : phone;
};

const UserTable = ({ data, sorting, setSorting, hasMore, setPage, debounceRef }) => {
  const tableContainerRef = useRef();

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: () => "🧍🏻Name",
        enableSorting: true,
      }),
      columnHelper.accessor("email", {
        header: () => "📧 Email",
        enableSorting: true,
      }),
      columnHelper.accessor((row) => formatPhone(row.phone), {
        id: "phone",
        header: () => "📱Phone",
      }),
      columnHelper.accessor(
        (row) => `${row.company?.name || ""} (${row.address?.city || ""})`,
        {
          id: "companyCity",
          header: () => "Company (City)",
        }
      ),
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 50,
    overscan: 10,
  });

  const items = rowVirtualizer.getVirtualItems();

  const handleScroll = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const { scrollTop, scrollHeight, clientHeight } = tableContainerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 100 && hasMore) {
        setPage((prev) => prev + 1);
      }
    }, 200);
  };

  const MemoRow = React.memo(({ row, style }) => (
    <tr
      key={row.id}
      style={{ ...style, position: "absolute", top: 0, width: "100%" }}
      className="row"
    >
      {row.getVisibleCells().map((cell) => (
        <MemoCell key={cell.id} cell={cell} />
      ))}
    </tr>
  ));

  const MemoCell = React.memo(({ cell }) => (
    <td className={`cell col-${cell.column.id}`}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  ));

  return (
    <div ref={tableContainerRef} className="table-container" onScroll={handleScroll}>
      <table className="user-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="header-row">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`header-cell col-${header.column.id}`}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {{
                    asc: " 🔼",
                    desc: " 🔽",
                  }[header.column.getIsSorted()] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: "relative",
          }}
        >
          {items.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="empty-state">
                No users found
              </td>
            </tr>
          )}
          {items.map((virtualRow) => {
            const row = table.getRowModel().rows[virtualRow.index];
            return (
              <MemoRow
                key={row.id}
                row={row}
                style={{ transform: `translateY(${virtualRow.start}px)` }}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
