import type { ValidationErrorItem } from "@shared/api";

export const createMessageBaseQueryError = (data: unknown): string | null => {
    if (!data) {
        return null;
    }

    const error = data as ValidationErrorItem | ValidationErrorItem[];

    if (Array.isArray(error)) {
        const messages = error
            .map(err => createMessageBaseQueryError(err))
            .filter(Boolean);
        return messages.length ? messages.join(', ') : null;
    }



    if (error && typeof error === 'object' && 'constraints' in error && error.constraints) {
        const messages = Object.values(error.constraints);
        const errorMessage = messages.find(msg => msg);

        if (!errorMessage) {
            return null;
        }

        if ('property' in error && error.property) {
            if ('value' in error && error.value !== undefined) {
                return `(${error.property}: ${error.value}): ${errorMessage}`;
            }
            return `(${error.property}): ${errorMessage}`;
        }

        return errorMessage;
    }

    return null;
}