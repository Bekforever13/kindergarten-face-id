import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../api/axiosInterceptor'

const ReportGroups = ({ selectedGroup, setSelectedGroup }) => {
  const [groups, setGroups] = useState()
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    axiosInstance
      .get('/groups?kindergarten_id=2')
      .then((res) => setGroups(res.data))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div className="flex flex-col gap-5">
      <div
        className={`text-xl py-3 px-6 bg-white rounded-3xl border border-solid border-black hover:bg-blue-200 cursor-pointer hover:-translate-y-1 ${
          selectedGroup === 0 ? 'bg-blue-300' : ''
        }`}
        onClick={() => setSelectedGroup(0)}
      >
        Все
      </div>
      {groups?.data?.map((el) => (
        <div
          key={el.id}
          className={`text-xl py-3 px-6 bg-white rounded-3xl border border-solid border-black hover:bg-blue-200 cursor-pointer hover:-translate-y-1 ${
            selectedGroup === el.id ? 'bg-blue-300' : ''
          }`}
          onClick={() => setSelectedGroup(el.id)}
        >
          {el.name}
        </div>
      ))}
    </div>
  )
}

export default ReportGroups
