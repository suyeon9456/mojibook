'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const QueryProvider = ({ children }: React.PropsWithChildren) => {
    const [client] = React.useState(new QueryClient());

    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default QueryProvider;
