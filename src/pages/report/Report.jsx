import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Days from "../../components/Days/Days";
import Reports from "../../components/Reports/Reports.jsx";

const Report = () => {
  const date = useSelector((s) => s.date);
  const navigate = useNavigate();
  const [isMonthTable, setIsMonthTable] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState({});

  useEffect(() => {
    if (!date.year) navigate("/");
    if (!date.month) navigate("/");
    if (!date.day) {
      setIsMonthTable(true);
    }
  }, [date.day]);

  console.log(Object.keys(selectedGroup).length);

  return (
    <div className='flex flex-col'>
      <h1 className='text-center py-5 text-3xl font-semibold'>
        Каракалпакстан Республикасы Нокис каласы <br /> 56 санлы бала бакша{" "}
        <br />
        {!date.day
          ? `${date.year}.${date.month} ${
              Object.keys(selectedGroup).length > 0 ? `${selectedGroup?.name} топар` : ""
            } есабаты`
          : `${date.year}.${date.month}.${date.day} ${
              Object.keys(selectedGroup).length > 0 ? `${selectedGroup?.name} топар` : ""
            } есабаты`}
      </h1>
      <div className='flex items-start p-5 gap-10'>
        <Days isMonthTable={isMonthTable} setIsMonthTable={setIsMonthTable} />
        <Reports
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
          isMonthTable={isMonthTable}
          setIsMonthTable={setIsMonthTable}
        />
      </div>
    </div>
  );
};

export default Report;
