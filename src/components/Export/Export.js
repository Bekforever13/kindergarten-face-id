import * as XLSX from 'xlsx'

const flattenObject = (obj, parentKey = '') => {
  return Object.keys(obj).reduce((acc, key) => {
    const newKey = parentKey ? `${key}` : key
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(acc, flattenObject(obj[key], newKey))
    } else {
      acc[newKey] = obj[key]
    }
    return acc
  }, {})
}

export const exportToExcel = (data) => {
  // Flatten the deep objects
  const flattenedData = data?.map((el) => flattenObject(el))

  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.json_to_sheet(flattenedData)
  XLSX.utils.book_append_sheet(wb, ws, 'Страница 1')
  XLSX.writeFile(wb, 'export.xlsx')
}
