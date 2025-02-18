import React, { JSX } from "react";

export interface CustomInputProps {
  searchTerm: string;
  onChangeTerm: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  searchTerm,
  onChangeTerm,
}): JSX.Element => {
  return (
    <input
      type="text"
      placeholder="Search by author"
      value={searchTerm}
      onChange={onChangeTerm}
      className="border p-2 w-full"
    />
  );
};

export default CustomInput;
