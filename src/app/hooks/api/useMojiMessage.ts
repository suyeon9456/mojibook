import { useMutation, UseMutationResult, UseMutationOptions } from '@tanstack/react-query';
import { fetchMojiMessage } from '@/remotes/chat-direct';
import { useCallback, useTransition } from 'react';

type MojiMessageResponse = string;
type UseMojiMessageResult = UseMutationResult<MojiMessageResponse, Error, void, unknown>;

type UseMojiMessageOptions = UseMutationOptions<MojiMessageResponse, Error, void>;

type UseMojiMessageCustomResult = {
    mutateWithTransition: () => Promise<void>;
    isTransitioning: boolean;
};

const useMojiMessage = (
    options: UseMojiMessageOptions = {},
): UseMojiMessageResult & UseMojiMessageCustomResult => {
    const [isPending, startTransition] = useTransition();
    const { mutateAsync, ...mutationResult } = useMutation<MojiMessageResponse, Error, void>({
        mutationFn: fetchMojiMessage,
        ...options,
    });

    const mutateWithTransition = useCallback(async () => {
        startTransition(async () => {
            await mutateAsync();
        });
    }, [mutateAsync]);
    return { ...mutationResult, mutateAsync, mutateWithTransition, isTransitioning: isPending };
};

export default useMojiMessage;
