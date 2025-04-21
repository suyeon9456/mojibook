export const createQueryKeyFactory = <T extends string>(base: T) => ({
    base: [base] as const,
    detail: (id?: string | number) => [...base, id] as const,
});

export const messageQueryKey = createQueryKeyFactory('message');
