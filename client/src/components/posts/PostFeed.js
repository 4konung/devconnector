import React from 'react'
import PostItem from './PostItem'


export default ({posts}) => {
  return (
    posts.map(post => <PostItem key={post._id} post={post} />)
  )
}
