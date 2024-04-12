import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setMonth } from '../../store/slices/dateSlice'

const Month = ({ title, value }) => {
  const dispatch = useDispatch()

  const onClick = () => dispatch(setMonth(value))

  return (
    <Link to="/report">
      <div
        onClick={onClick}
        className="flex items-center justify-center border shadow-md border-solid border-blue-400 h-[200px] w-[300px] cursor-pointer hover:-translate-y-1 transition-all hover:shadow-lg bg-blue-200 text-3xl"
      >
        {title}
      </div>
    </Link>
  )
}

export default Month
