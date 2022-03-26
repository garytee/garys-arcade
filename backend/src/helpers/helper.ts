import * as express from 'express';

const getNewId = (array: any) => {
    if (array.length > 0) {
        return array.map((obj: { id: any; }) => obj.id)
            .sort((a: any, b: any) => a-b)[array.length -1] + 1;
    } else {
        return 1
    }
}

const newDate = () => new Date().toString()


const  generateLogMessage = (req: express.Request) => {
    return `an error occurred.  METHOD: ${req.method} URL: ${req.baseUrl}${req.url} IP: ${req.ip}`
}


export {
    getNewId,
    newDate,
    generateLogMessage
}