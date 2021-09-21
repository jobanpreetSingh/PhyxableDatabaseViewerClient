export const readPatientAction = (type, data) => {
    return {
        type: type,
        payload: {
            data
        }
    }

}