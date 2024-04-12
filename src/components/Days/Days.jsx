import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setYear, setDay, setMonth } from '../../store/slices/dateSlice'
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr'

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

function Days({ isMonthTable, setIsMonthTable }) {
  const [isHiddenCalendar, setIsHiddenCalendar] = useState(false)
  const date = useSelector((s) => s.date)
  const dispatch = useDispatch()

  // Функция для определения дней в месяце
  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate()
  }

  // Функция для определения дня недели первого числа месяца
  const firstDayOfMonth = (month, year) => {
    return new Date(year, month - 1, 1).getDay()
  }

  // Функция для отрисовки календаря
  const renderCalendar = () => {
    const days = []
    const totalDays = daysInMonth(date?.month, date?.year)
    const firstDayIndex = firstDayOfMonth(date?.month, date?.year)

    // Добавляем пустые ячейки для дней предыдущего месяца
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(
        <div
          onClick={() => setIsMonthTable(true)}
          className="w-10 h-10 flex items-center justify-center border border-solid border-black bg-[#f2f2f2] hover:bg-[#f0f0f0] rounded-sm"
          key={-i}
        ></div>,
      )
    }

    // Добавляем дни текущего месяца
    for (let i = 1; i <= totalDays; i++) {
      days.push(
        <div
          onClick={() => {
            setIsMonthTable(false)
            dispatch(setDay(i < 10 ? '0' + i : i))
          }}
          className={`w-10 h-10 flex items-center justify-center border border-solid border-black rounded-sm cursor-pointer hover:bg-slate-200 ${
            date?.day === (i < 10 ? '0' + i : i) ? 'bg-slate-200' : ''
          }`}
          key={i}
        >
          {i}
        </div>,
      )
    }

    return days
  }

  return (
    <div className="flex flex-col gap-5">
      {/* <button
        className="bg-[#007bff] text-white border-none py-[5px] px-2.5 rounded-sm cursor-pointer hover:bg-[#0056b3]"
        onClick={() => setIsHiddenCalendar((s) => !s)}
      >
        {isHiddenCalendar ? 'Показать календарь' : 'Скрыть календарь'}
      </button> */}
      {!isHiddenCalendar && (
        <div className="w-[350px] zIndex-[999] border border-solid border-black p-2.5 bg-white">
          <div className="flex flex-col gap-5 mb-5">
            <div className="flex justify-center gap-5 items-center">
              <button
                className="bg-[#007bff] text-white border-none py-[5px] px-2.5 rounded-sm cursor-pointer hover:bg-[#0056b3]"
                onClick={() => dispatch(setYear(date?.year - 1))}
              >
                <GrLinkPrevious />
              </button>
              <span className="text-lg">{date?.year}</span>
              <button
                className="bg-[#007bff] text-white border-none py-[5px] px-2.5 rounded-sm cursor-pointer hover:bg-[#0056b3]"
                onClick={() => dispatch(setYear(date?.year + 1))}
              >
                <GrLinkNext />
              </button>
            </div>
            <select
              className="p-[5px] text-base border border-solid border-black rounded-sm"
              value={date?.month < 10 ? Number('0' + date?.month) : date?.month}
              onChange={(e) => {
                dispatch(
                  setMonth(
                    e.target.value < 10 ? '0' + e.target.value : e.target.value,
                  ),
                )
              }}
            >
              {months.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.name}
                </option>
              ))}
            </select>
          </div>
          <ul className="flex items-center gap-8">
            <li className="text-red-500">Вс</li>
            <li className="text-blue-500">Пн</li>
            <li className="text-blue-500">Вт</li>
            <li className="text-blue-500">Ср</li>
            <li className="text-blue-500">Чт</li>
            <li className="text-blue-500">Пт</li>
            <li className="text-red-500">Сб</li>
          </ul>
          <div className="flex items-center gap-2 flex-wrap">
            {renderCalendar()}
          </div>
          <div className="py-3 flex justify-center">
            <button
              onClick={() => dispatch(setDay(undefined))}
              className="bg-blue-200 py-2 px-4 rounded-lg border border-solid border-black"
            >
              {months?.find((el) => +el.id === +date?.month)?.name} айы есабаты
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Days
