import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInterceptor.js";
import { Pagination, Table } from "antd";
import { useSelector } from "react-redux";
import { exportToExcel } from "../../Export/Export.js";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Имя",
    dataIndex: "first_name",
  },
  {
    title: "Фамилия",
    dataIndex: "last_name",
  },
  {
    title: "Группа",
    dataIndex: "group",
    render: (_, rec) => rec.group.name,
  },
  {
    title: "Статус",
    dataIndex: "report",
    render: (_, rec) => (
      <div
        className={`${
          rec.report.status === 1
            ? "text-green-500 py-2 px-4 rounded-md"
            : "text-red-500 py-2 px-4 rounded-md"
        }`}
      >
        {rec.report.status === 1 ? "Пришёл" : "Отсуствовал"}
      </div>
    ),
  },
  {
    title: "Время прихода",
    dataIndex: "arrived_time",
    render: (_, rec) => rec.report.arrived_time,
  },
];

const DayTable = ({ selectedGroup }) => {
  const { year, month, day } = useSelector((s) => s.date);
  const [data, setData] = useState([]);
  const [dataForExport, setDataForExport] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axiosInstance
      .get(
        `/newreport/day?kindergarten_id=2&limit=10&page=${page}&group_id=${
          selectedGroup?.id ? selectedGroup?.id : 0
        }&time=${year + "-" + month + "-" + day}`
      )
      .then((res) => setData(res.data))
      .finally(() => setIsLoading(false));
  }, [selectedGroup?.id, day, page, year, month]);

  useEffect(() => {
    axiosInstance
      .get(
        `/newreport/day?kindergarten_id=2&limit=100000&page=1&group_id=${
          selectedGroup?.id > 0 ? selectedGroup?.id : 0
        }&time=${year + "-" + month + "-" + day}`
      )
      .then((res) => setDataForExport(res.data.data));
  }, [selectedGroup?.id, day, year, month]);

  return (
    <Table
      loading={isLoading}
      scroll={{ x: true }}
      columns={columns}
      rowKey={(el) => el.id}
      dataSource={data?.data}
      style={{
        width: "100%",
        background: "white",
        borderRadius: "10px",
        flex: 2,
      }}
      pagination={false}
      footer={() => (
        <div className='flex items-center justify-between'>
          <button
            onClick={() => exportToExcel(dataForExport)}
            className='bg-[#007bff] text-white border-none p-3 rounded-sm cursor-pointer hover:bg-[#0056b3]'
          >
            Экспорт
          </button>
          <Pagination
            total={data.total}
            current={page}
            showSizeChanger={false}
            onChange={(e) => setPage(e)}
          />
        </div>
      )}
    />
  );
};

export default DayTable;
