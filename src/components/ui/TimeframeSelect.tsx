import { Dropdown, DropdownItem } from "@tremor/react";

export default function ChartDropdown() {
  return (
    <Dropdown
      className="mt-2 w-min"
      placeholder="Range"
      defaultValue="7days"
      // onValueChange={}
    >
      <DropdownItem value="24hours" text="Last 24 hours" />
      <DropdownItem value="7days" text="Last 7 days" />
    </Dropdown>
  );
}
