import { FC, useState } from "react";

import Filters from "@/components/user/Filters";
import Roster, { type Filter } from "@/components/user/Roster";
import Button from "@/components/common/Button";

import Styles from "./membershipList.module.scss";

const MembershipList = () => {
  const [activeFilters, setActiveFilters] = useState<Filter>({
    accountStatus: [AccountStatus.ACTIVE, AccountStatus.PAST_DUE],
    accountType: [
      AccountType.FULL,
      AccountType.ASSOCIATE,
      AccountType.EMERITUS,
    ],
    role: [],
    office: [],
    title: [],
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterUpdate = (updatedVals: any, filter: string) => {
    setActiveFilters((currentActiveFilters) => ({
      ...currentActiveFilters,
      [filter]:
        updatedVals === null
          ? []
          : Object.values(updatedVals).map((obj: any) => obj.value),
    }));
  };

  const handleDefault = () => {
    setActiveFilters({
      accountStatus: [AccountStatus.ACTIVE],
      accountType: [
        AccountType.FULL,
        AccountType.ASSOCIATE,
        AccountType.EMERITUS,
      ],
      role: [],
      office: [],
      title: [],
    });
  };

  const handleActiveGuests = () => {
    setActiveFilters({
      accountStatus: [AccountStatus.ACTIVE],
      accountType: [AccountType.GUEST],
      role: [],
      office: [],
      title: [],
    });
  };

  const handleClear = () => {
    setActiveFilters({
      accountStatus: [],
      accountType: [],
      role: [],
      office: [],
      title: [],
    });
  };

  const handleShowPastDue = () => {
    setActiveFilters({
      accountStatus: [AccountStatus.PAST_DUE],
      accountType: [AccountType.FULL],
      role: [],
      office: [],
      title: [],
    });
  };

  const handleShowDelinquent = () => {
    setActiveFilters({
      accountStatus: [AccountStatus.DELINQUENT],
      accountType: [AccountType.FULL],
      role: [],
      office: [],
      title: [],
    });
  };

  const handleShowInactive = () => {
    setActiveFilters({
      accountStatus: [AccountStatus.INACTIVE],
      accountType: [AccountType.FULL],
      role: [],
      office: [],
      title: [],
    });
  };

  const handleShowNewRegs = () => {
    setActiveFilters({
      accountStatus: [AccountStatus.LOCKED],
      accountType: [],
      role: [],
      office: [],
      title: [],
    });
  };

  return (
    <div>
      <h2>Membership</h2>

      <aside>
        <h3>Filter Presets</h3>

        <ul className={Styles["button-list"]}>
          <li>
            <Button onClick={handleDefault}>Active Members</Button>
          </li>
          <li>
            <Button onClick={handleActiveGuests}>Active Guests</Button>
          </li>
          <li>
            <Button onClick={handleShowNewRegs}>
              Locked New Registrations
            </Button>
          </li>
          <li>
            <Button onClick={handleShowPastDue}>Past Due Full Members</Button>
          </li>
          <li>
            <Button onClick={handleShowDelinquent}>
              Delinquent Full Members
            </Button>
          </li>
          <li>
            <Button onClick={handleShowInactive}>Inactive Full Members</Button>
          </li>
          <li>
            <Button onClick={handleClear}>Clear Filters</Button>
          </li>
        </ul>
      </aside>

      <section>
        <h3>Filters</h3>
        <Filters
          activeFilters={activeFilters}
          onFilterUpdate={handleFilterUpdate}
        />
        {/* 1-25 of x results */}
        <Roster filters={activeFilters} />
      </section>
    </div>
  );
};

export default MembershipList;
