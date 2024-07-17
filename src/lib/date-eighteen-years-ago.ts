import { subYears, subDays } from "date-fns";

const dateEighteenYearsAgo = () => subYears(subDays(new Date(), 1), 18);

export default dateEighteenYearsAgo;
