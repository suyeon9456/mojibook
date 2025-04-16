import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { fetchMojiMessage } from '@/remotes/chat-direct';
import { useCallback, useTransition } from 'react';

type MojiMessageResponse = string;
type UseMojiMessageResult = UseMutationResult<MojiMessageResponse, Error, void, unknown>;

type UseMojiMessageCustomResult = {
    mutateWithTransition: () => Promise<void>;
    isTransitioning: boolean;
};

const useMojiMessage = (): UseMojiMessageResult & UseMojiMessageCustomResult => {
    const [isPending, startTransition] = useTransition();
    const { mutateAsync, ...mutationResult } = useMutation<MojiMessageResponse, Error, void>({
        mutationFn: fetchMojiMessage,
    });

    const mutateWithTransition = useCallback(async () => {
        startTransition(async () => {
            await mutateAsync();
        });
    }, [mutateAsync]);
    return { ...mutationResult, mutateAsync, mutateWithTransition, isTransitioning: isPending };
};

export default useMojiMessage;
