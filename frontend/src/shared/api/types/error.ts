export interface IError {
    statusCode?: number;
    message?: string;
    errors?: Array<ValidationErrorItem>;
    timestamp?: number;
}

export interface ValidationErrorItem {
    property: string;
    constraints?: Record<string, string>;
    value?: string;
    children?: ValidationErrorItem[];
}
