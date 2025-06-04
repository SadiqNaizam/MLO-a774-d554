import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle, ListFilter, FileDown } from 'lucide-react'; // Example icons
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataGridToolbarProps {
  onSearch?: (searchTerm: string) => void;
  onAddNew?: () => void;
  onExport?: () => void;
  // Props for filter options - can be expanded
  filterOptions?: { label: string; value: string; checked: boolean }[];
  onFilterChange?: (value: string, checked: boolean) => void;
  searchPlaceholder?: string;
  showAddNewButton?: boolean;
  showExportButton?: boolean;
  showFilterButton?: boolean;
}

const DataGridToolbar: React.FC<DataGridToolbarProps> = ({
  onSearch,
  onAddNew,
  onExport,
  filterOptions,
  onFilterChange,
  searchPlaceholder = "Search...",
  showAddNewButton = true,
  showExportButton = false,
  showFilterButton = false,
}) => {
  console.log("Rendering DataGridToolbar");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(event.target.value);
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 py-4">
      <div className="flex flex-1 items-center gap-2">
        {onSearch && (
          <Input
            placeholder={searchPlaceholder}
            onChange={handleSearchChange}
            className="h-9 max-w-sm md:w-1/2 lg:w-1/3"
          />
        )}
        {showFilterButton && filterOptions && onFilterChange && (
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {filterOptions.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option.value}
                  checked={option.checked}
                  onCheckedChange={(checked) => onFilterChange(option.value, Boolean(checked))}
                >
                  {option.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <div className="flex items-center gap-2">
        {showExportButton && onExport && (
          <Button variant="outline" size="sm" onClick={onExport} className="h-9 gap-1">
            <FileDown className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
        )}
        {showAddNewButton && onAddNew && (
          <Button size="sm" onClick={onAddNew} className="h-9 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add New
            </span>
          </Button>
        )}
      </div>
    </div>
  );
}
export default DataGridToolbar;