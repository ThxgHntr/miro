import { useSelf, useMutation } from "@liveblocks/react";

export const useDeleteLayers = () => {
    const slection = useSelf((me) => me.presence.selection)

    return useMutation(({ storage, setMyPresence }) => {
        const liveLayers = storage.get("layers")

        slection?.forEach((layerId) => {
            if (liveLayers.has(layerId)) liveLayers.delete(layerId)
        })

        setMyPresence({ selection: [] }, { addToHistory: true })
    }, [slection])
}