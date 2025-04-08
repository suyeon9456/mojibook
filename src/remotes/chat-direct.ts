import { OpenAPI } from '@/models/chat-direct';
import axios from 'axios';

export const getMojiMessage = async (): Promise<string> => {
    const { data } = await axios.post<OpenAPI>(
        '/api/chat-direct',
        {
            prompt: '모지 응답!',
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );
    const message = data.choices?.[0]?.message?.content || JSON.stringify(data);
    return message;
};
