export const getCharacterIdFromTheUrl = (str: string): number  => {
    const allNumbers = str.replace(/[^0-9]/g, ' ').trim().split(/\s+/);
    if (allNumbers?.length > 0 && allNumbers[0]) {
        return Number(allNumbers[0]); 
    }
    return 0;
};
