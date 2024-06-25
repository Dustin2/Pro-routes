const daysOfWeekMap = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export const getDaysOfWeek = (days) => {
  return days.map(day => daysOfWeekMap[day]).join(', ');
};
