export const wait = async (ms = 500) =>
    new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
