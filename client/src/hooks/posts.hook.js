import { useMemo } from "react"

export const usePosts = (posts) => {
    const memoPosts = useMemo(() => {
        return posts
    }, [posts])
    return memoPosts
}