export const onCacheEntryAdded = async (
    arg,
    { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
) => {
    const ws = new WebSocket("ws://localhost:5000/");
    try {
        await cacheDataLoaded;
        const listener = (event) => {
            const data = JSON.parse(event.data);
            if (data.channel !== arg) return;

            updateCachedData((draft) => {
                draft.push(data)
            });
        };
        ws.addEventListener('message', listener);
    } catch {};
    await cacheEntryRemoved;
    ws.close();
};