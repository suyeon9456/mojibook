export const createQueryKeyFactory = <T extends string>(base: T) => ({
    base: [base] as const,
});

export const mojiMessageQueryKey = createQueryKeyFactory('moji-message');
