import MonthTable from "./table/MonthTable";
import ReportGroups from "./groups/ReportGroups";
import DayTable from "./table/DayTable";

const Reports = ({
  isMonthTable,
  setIsMonthTable,
  selectedGroup,
  setSelectedGroup,
}) => {
  return (
    <div className='flex items-start gap-20'>
      <ReportGroups
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
      />
      {isMonthTable ? (
        <MonthTable selectedGroup={selectedGroup} />
      ) : (
        <DayTable selectedGroup={selectedGroup} />
      )}
    </div>
  );
};

export default Reports;
