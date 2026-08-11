import React from 'react';

/**
 * convert the date array to the format including time day and date
 * @param dateArray 
 * @returns 
 */
const DateConversion = (dateArray:any) => {
    if (!dateArray || !Array.isArray(dateArray) || dateArray.length < 5 || dateArray.length > 6) {
        return "Invalid date";
      }
    
      const [year, month, day, hours, minutes, seconds = 0] = dateArray;
      const date = new Date(year, month - 1, day, hours, minutes, seconds);
    
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }
    
      const yearShort = date.getFullYear().toString().slice(-2);
      const monthPadded = `0${date.getMonth() + 1}`.slice(-2);
      const dayPadded = `0${date.getDate()}`.slice(-2);
      const hoursPadded = `0${date.getHours()}`.slice(-2);
      const minutesPadded = `0${date.getMinutes()}`.slice(-2);
      const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()];
    
      return `${yearShort}/${monthPadded}/${dayPadded}(${dayOfWeek}) ${hoursPadded}:${minutesPadded}`;

  
};

export default DateConversion;
