const ENABLE_LOG = true

export const log = (message?: any, ...optionalParams: any[]): void => {
  if(ENABLE_LOG) {
    console.log(message, optionalParams)
  }
}