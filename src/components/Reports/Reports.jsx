import MonthTable from './table/MonthTable'
import ReportGroups from './groups/ReportGroups'
import { useState } from 'react'
import DayTable from './table/DayTable'

const Reports = ({ isMonthTable, setIsMonthTable }) => {
  const [selectedGroup, setSelectedGroup] = useState(0)
  return (
    <div className="flex items-start gap-20">
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
  )
}

export default Reports
