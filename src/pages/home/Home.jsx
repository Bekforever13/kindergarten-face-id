import React, { useState } from 'react'
import Month from '../../components/month/Month'
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux'
import { setYear } from '../../store/slices/dateSlice'

const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
].map((month, index) => ({
  label: month,
  value: String(index + 1).padStart(2, '0'),
}))
const Home = () => {
  const date = useSelector((s) => s.date)
  const dispatch = useDispatch()

  const incrementYear = () => dispatch(setYear(date.year + 1))
  const decrementYear = () => dispatch(setYear(date.year - 1))

  return (
    <div className='py-10'>
      <div className="flex items-center justify-center gap-10 min-h-[100px]">
        <button onClick={decrementYear} className="text-3xl">
          <GrLinkPrevious />
        </button>
        <h1 className="text-5xl">{date.year}</h1>
        <button onClick={incrementYear} className="text-3xl">
          <GrLinkNext />
        </button>
      </div>
      <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 grid-rows-3 place-items-center min-h-[80vh]">
        {months.map((month) => (
          <Month key={month.value} title={month.label} value={month.value} />
        ))}
      </div>
    </div>
  )
}

export default Home
