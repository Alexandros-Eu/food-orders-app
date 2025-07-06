import { useState, useEffect, useCallback } from 'react';

async function sendHttpRequest(url, config)
{
    const res = await fetch(url, config);
    const resData = res.json();

    if(!res.ok)
    {
        throw new Error(resData.message || "Something went wrong, failed to send request!");
    }

    return resData;
}

export default function useHttp(url, config, initialData)
{
    const [isLoading, setLoading] = useState();
    const [data, setData] = useState(initialData);
    const [error, setError] = useState();

    const sendRequest = useCallback(async function sendRequest()
    {
        setLoading(true);

        try
        {
            const resData = await sendHttpRequest(url, config);
            setData(resData);
        }
        catch(e)
        {
            setError(e.message || "Something went wrong!");
        }

        setLoading(false);

    }, [url, config])

    useEffect(() => {
        if((config && (config.method === 'GET' || !config.method)) || !config)
        {
            sendRequest();
        }

    }, [sendRequest, config])

    return {
        isLoading,
        data,
        error,
        sendRequest
    }
}