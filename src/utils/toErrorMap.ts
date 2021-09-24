import { ErrorType } from "../generated/graphql";




export const toErrorMap = (errors: ErrorType[]) => {
    const errorMap: Record<string, string> = {}
    errors.forEach(({ fieldName, errorMessage }) => {
        errorMap[fieldName] = errorMessage
    })
    return errorMap
}