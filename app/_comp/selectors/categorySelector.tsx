import { categoryList } from "@/app/constants";
import { Select, SelectProps } from "antd";

const CategorySelector = ({ ...props }: SelectProps) => {
  return (
    <Select options={categoryList} placeholder="Select Category" {...props} />
  );
};

export default CategorySelector;
