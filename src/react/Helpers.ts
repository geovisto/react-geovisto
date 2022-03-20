/**
 * Checks if id is present and valid
 */
export const validateId = (id: string | undefined) : void => {
    if(id === undefined || typeof id !== 'string') {
        throw Error(`Processed tool is missing 'id' property`);
    }
};