import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../api/axiosInterceptor.js'
import { Pagination, Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { setReportData } from '../../../store/slices/reportSlice.js'
import { exportToExcel } from '../../Export/Export.js'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Имя',
    dataIndex: 'first_name',
  },
  {
    title: 'Фамилия',
    dataIndex: 'last_name',
  },
  {
    title: 'Группа',
    dataIndex: 'group',
    render: (_, rec) => rec.group.name,
  },
  {
    title: 'Пришёл',
    dataIndex: 'report',
    render: (_, rec) => rec.report.arrival_days,
  },
  {
    title: 'Отсуствовал',
    dataIndex: 'report',
    render: (_, rec) => rec.report.absent_days,
  },
  {
    title: 'Всего дней',
    dataIndex: 'report',
    render: (_, rec) => rec.report.total_days,
  },
]

const MonthTable = ({ selectedGroup }) => {
  const { year, month, day } = useSelector((s) => s.date)
  const [data, setData] = useState([])
  const [dataForExport, setDataForExport] = useState([])
  const [page, setPage] = useState(1)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    axiosInstance
      .get(
        `/newreport/month?${
          year && month && `time=${year + '-' + month}&`
        }kindergarten_id=2&limit=10&page=${page}${
          selectedGroup ? `&group_id=${selectedGroup}` : ''
        }`,
      )
      .then((res) => setData(res.data))
      .finally(() => setIsLoading(false))
  }, [selectedGroup, page, year, month, day])

  useEffect(() => {
    axiosInstance
      .get(
        `/newreport/month?${
          year && month && `time=${year + '-' + month}&`
        }kindergarten_id=2&limit=100000&page=${page}${
          selectedGroup ? `&group_id=${selectedGroup}` : ''
        }`,
      )
      .then((res) => setDataForExport(res.data.data))
  }, [selectedGroup, page, year, month, day])

  return (
    <Table
      loading={isLoading}
      scroll={{ x: true }}
      columns={columns}
      rowKey={(el) => el.id}
      dataSource={data?.data}
      style={{
        width: '100%',
        background: 'white',
        borderRadius: '10px',
        flex: 2,
      }}
      pagination={false}
      footer={() => (
        <div className="flex items-center justify-between">
          <button
            onClick={() => exportToExcel(dataForExport)}
            className="bg-[#007bff] text-white border-none p-3 rounded-sm cursor-pointer hover:bg-[#0056b3]"
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
  )
}

export default MonthTable
