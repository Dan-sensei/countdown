export const isOpened = (dateUTC: number): boolean => {
    const now = new Date().getTime();
    return now > dateUTC;
};