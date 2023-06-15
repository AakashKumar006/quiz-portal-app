import React from 'react';

type Props = {
    date:Date;
}

const DateFormat = (props:Props) => {
    const date = new Date(props.date);
    const month = date.toLocaleString('en-US',{ month:'long'});
    const day = date.toLocaleString('en-US',{ day: '2-digit'});
    const year = date.getFullYear();
    return(
        <>{day+" / "+month+" / "+year }</>
    );
}

export default DateFormat;