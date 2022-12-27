import { useEffect, useState } from 'react'
import {
  getDatabase,
  ref,
  query,
  orderByKey,
  get,
  startAt,
  limitToFirst,
} from 'firebase/database'

const useVideoList = (page) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [videos, setVideos] = useState([])
  const [hasMore, setHasMore] = useState(true)

  // useEffect(() => {
  //   console.log('rendered')
  // }, [])

  useEffect(() => {
    const fetchVideos = async () => {
      //database related works
      const db = getDatabase()
      const videosRef = ref(db, 'videos')
      const videoQuery = query(
        videosRef,
        orderByKey(),
        startAt('' + page),
        limitToFirst(8)
      )

      try {
        setError('')
        setLoading(true)
        //req firebase
        const snapshot = await get(videoQuery)

        if (snapshot.exists()) {
          setVideos((videos) => {
            return [...videos, ...Object.values(snapshot.val())]
          })
        } else {
          setHasMore(false)
        }
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
        setError('failed to fetch videos')
      }
    }

    fetchVideos()
  }, [page])

  return { loading, error, videos, hasMore }
}

export default useVideoList
