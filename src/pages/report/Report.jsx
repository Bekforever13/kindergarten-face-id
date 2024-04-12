import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Days from '../../components/Days/Days'
import Reports from '../../components/Reports/Reports.jsx'

const months = [
  {
    id: 1,
    name: 'Январь',
  },
  {
    id: 2,
    name: 'Февраль',
  },
  {
    id: 3,
    name: 'Март',
  },
  {
    id: 4,
    name: 'Апрель',
  },
  {
    id: 5,
    name: 'Май',
  },
  {
    id: 6,
    name: 'Июнь',
  },
  {
    id: 7,
    name: 'Июль',
  },
  {
    id: 8,
    name: 'Август',
  },
  {
    id: 9,
    name: 'Сентябрь',
  },
  {
    id: 10,
    name: 'Октябрь',
  },
  {
    id: 11,
    name: 'Ноябрь',
  },
  {
    id: 12,
    name: 'Декабрь',
  },
]

const Report = () => {
  const date = useSelector((s) => s.date)
  const navigate = useNavigate()
  const [isMonthTable, setIsMonthTable] = useState(true)

  useEffect(() => {
    if (!date.year) navigate('/')
    if (!date.month) navigate('/')
    if (!date.day) {
      setIsMonthTable(true)
    }
  }, [date.day])

  return (
    <div className="flex flex-col">
      <h1 className="text-center py-5 text-3xl font-semibold">
        Каракалпакстан Республикасы Нокис каласы <br /> 56 санлы бала бакша{' '}
        <br />
        {!date.day
          ? `${date.year}.${date.month} есабаты`
          : `${date.year}.${date.month}.${date.day} есабаты`}
      </h1>
      <div className="flex items-start p-5 gap-10">
        <Days isMonthTable={isMonthTable} setIsMonthTable={setIsMonthTable} />
        <Reports
          isMonthTable={isMonthTable}
          setIsMonthTable={setIsMonthTable}
        />
      </div>
    </div>
  )
}

export default Report
