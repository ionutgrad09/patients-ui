export const timestampDateToString = (timestamp: number): string => {
    const date = new Date(timestamp);

    return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;

}

export const getMidnightTimestampUTC = (date: Date) => {

    const midnightUTC = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0));

    return midnightUTC.getTime();
}