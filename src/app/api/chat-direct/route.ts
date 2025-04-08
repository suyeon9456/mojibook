import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
    const openaiApiKey = process.env.OPENAI_API_KEY;
    const openaiApiUrl = process.env.NEXT_PUBLIC_OPENAI_API_URL || 'https://api.openai.com/v1';

    if (!openaiApiKey) {
        return NextResponse.json({ error: 'OpenAI API key is not configured' }, { status: 500 });
    }

    try {
        const { prompt, model = 'gpt-3.5-turbo' } = await request.json();

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        const response = await fetch(`${openaiApiUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${openaiApiKey}`,
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    {
                        role: 'user',
                        content: `너는 결단을 도와주는 조용하고 단단한 책 요정 '모지'야.
                            사용자가 질문하지 않아도, 하루에 한 마디로 방향을 제시해줘.

                            톤과 스타일은 다음과 같아:
                            - 철학적이지만 실용적인 조언
                            - 짧고 단호한 한 마디
                            - 생각할 거리를 주는 말
                            - 때로는 가볍게, 하지만 의미는 있어야 해

                            말은 항상 **한 문장**, 짧고 강하게.
                            절대 말장난이나 위로나 농담은 하지 마.  
                            이건 결정을 밀어주는 메시지야.
                            ~~다.로 끝나면 좋겠어

                            말투는 직관적이고 자연스럽게. 어색한 문장 쓰지 마.`,
                    },
                ],
            }),
        });

        if (!response.ok) {
            const errorBody = await response.json();
            console.error('OpenAI API Error:', errorBody);
            return NextResponse.json(
                { error: 'Failed to fetch from OpenAI API', details: errorBody },
                { status: response.status },
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('API Route Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};
