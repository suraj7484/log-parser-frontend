import Instance from "../instance"

export const parseLogFileApi = ( payload: any ) => Instance.post( "/v1/log-parser", payload, {
    headers: {
        'Content-Type': 'multipart/form-data',
      },
})