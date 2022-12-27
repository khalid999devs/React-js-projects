import Video from './Video'
import { Link } from 'react-router-dom'
import useVideoList from '../hooks/useVideoList'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

const Videos = () => {
  const [page, setPage] = useState(1)
  const { loading, error, videos, hasMore } = useVideoList(page)

  return (
    <div>
      {videos.length > 0 && (
        <InfiniteScroll
          dataLength={videos.length}
          hasMore={hasMore}
          next={() => setPage(page + 8)}
          loader={<h4>Loading...</h4>}
        >
          {videos.map((video, key) => {
            return video.noq > 0 ? (
              <Link
                key={video.youtubeID}
                to={`/quiz/${video.youtubeID}`}
                state={{ videoTitle: video.title }}
              >
                <Video
                  title={video.title}
                  id={video.youtubeID}
                  noq={video.noq}
                />
              </Link>
            ) : (
              <Video
                key={video.youtubeID}
                title={video.title}
                id={video.youtubeID}
                noq={video.noq}
              />
            )
          })}
        </InfiniteScroll>
      )}
      {!loading && videos.length === 0 && <div>No data found</div>}
      {error && <div>{error || 'There was an error'}</div>}
      {loading && 'loading!'}
    </div>
  )
}

export default Videos
