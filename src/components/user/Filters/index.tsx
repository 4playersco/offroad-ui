import { FC } from "react";
import Select from "react-select";

import { formatFilterSelect, formatFilterSelected } from "@/lib";

import "./filters.module.scss";
import { Filter } from "../Roster";

interface FiltersProps {
  activeFilters: Filter;
  onFilterUpdate: (e: any, filter: string) => void;
}

const Filters: FC<FiltersProps> = ({ activeFilters, onFilterUpdate }) => {
  return (
    <div className="filters">
      Roles
      <Select
        value={formatFilterSelected(activeFilters.role, Roles)}
        placeholder="Select role"
        isMulti={true}
        options={formatFilterSelect(Roles)}
        onChange={(e) => onFilterUpdate(e, "role")}
      />
      Account Status
      <Select
        value={formatFilterSelected(
          activeFilters.accountStatus,
          AccountStatuses
        )}
        placeholder="Select account status"
        isMulti={true}
        options={formatFilterSelect(AccountStatuses)}
        onChange={(e) => onFilterUpdate(e, "accountStatus")}
      />
      Account Types
      <Select
        value={formatFilterSelected(activeFilters.accountType, AccountTypes)}
        placeholder="Select account type"
        isMulti={true}
        options={formatFilterSelect(AccountTypes)}
        onChange={(e) => onFilterUpdate(e, "accountType")}
      />
      Offices
      <Select
        value={formatFilterSelected(activeFilters.office, Office)}
        placeholder="Select office"
        isMulti={true}
        options={formatFilterSelect(Office)}
        onChange={(e) => onFilterUpdate(e, "office")}
      />
      Titles
      <Select
        value={formatFilterSelected(activeFilters.title, Title)}
        placeholder="Select title"
        isMulti={true}
        options={formatFilterSelect(Title)}
        onChange={(e) => onFilterUpdate(e, "title")}
      />
      {/* <fieldset>
        <div>
          <label htmlFor="">
            <input checked type="radio" name="filterInclusion" value="AND" />{' '}
            AND - Search will find instances that match all filters
          </label>
        </div>
        <div>
          <label htmlFor="">
            <input type="radio" name="filterInclusion" value="OR" />{' '}
            OR - Search will find instances that match any filters
          </label>
        </div>
      </fieldset> */}
    </div>
  );
};

export default Filters;
