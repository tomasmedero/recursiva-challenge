export const getDayOfWeek = (date: Date) => {
  const daysOfWeek = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ]
  return daysOfWeek[date.getDay()]
}

export const getFormattedDate = (date: Date) => {
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const dayAbbreviations = [
  'Dom',
  'Lun',
  'Mar',
  'Mié',
  'Jue',
  'Vie',
  'Sáb',
]

export const getNextDayDate = (daysAhead: number) => {
  const today = new Date()
  const nextDay = new Date(today)
  nextDay.setDate(today.getDate() + daysAhead)
  return nextDay
}
