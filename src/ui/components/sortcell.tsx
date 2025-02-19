import { useMemo } from "react";

export interface SortCellProps {
  value: string;
  field: string;
  order: string;
  onSort: (key: string) => void;
}

const SortCell: React.FC<SortCellProps> = ({ field, value, order, onSort }) => {
  const icon = useMemo(() => {
    return (
      field.toLowerCase() === value.toLowerCase() &&
      (order.toLowerCase() === "asc" ? "▲" : "▼")
    );
  }, [field, value, order]);

  return (
    <th
      aria-label={value}
      className="border p-2 cursor-pointer"
      onClick={() => onSort("author")}
    >
      {value}
      {icon}
    </th>
  );
};

export default SortCell;
