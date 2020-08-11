import React, { useContext, createContext } from 'react';

const DateContext = createContext();
const useDate = () => useContext(DateContext);

const DateProvider = ({children}) => {
    const getDates = (index) => {
        let result = [];

        for (let i = 0; i < index; i++) {
            let d = new Date();
            d.setDate(d.getDate() - i);
            const date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`.toString();

            result.push(date);
        };

        return result;
    };

    const splitDate = (date) => {
        return date.split("/");
    };

    const arraySplittedDates = (dates) => {
        let result = [];

        for (let i = 0; i < dates.length; i++) {
            const date = splitDate(dates[i]);

            let day;
            let month;

            if (date[0].toString().length === 1 ) {
                day = "0" + date[0].toString();
            } else {
                day = date[0].toString();
            };

            if (date[1].toString().length === 1 ) {
                month = "0" + date[1].toString();
            } else {
                month = date[1].toString();
            };

            const date_array = [day, month];
            result.push(date_array);
        };

        return result;
    };

    const getDateCodes = (dates) => {
        let result = [];

        for (let i = 0; i < dates.length; i++) {
            const date = splitDate(dates[i]);

            let day;
            let month;

            if (date[0].toString().length === 1 ) {
                day = "0" + date[0].toString();
            } else {
                day = date[0].toString();
            };

            if (date[1].toString().length === 1 ) {
                month = "0" + date[1].toString();
            } else {
                month = date[1].toString();
            };

            const date_array = `${day}-${month}`;
            result.push(date_array);
        };

        return result;
    };

    const plusIndex = (index) => {
        index += 4;

        return index;
    };

    return (
        <DateContext.Provider value={{ 
            getDates,
            splitDate,
            arraySplittedDates,
            plusIndex,
            getDateCodes,
         }}>
            { children }
        </DateContext.Provider>
    )
};

export {
    DateContext,
    DateProvider,
    useDate,
};