import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import PostItem from './PostItem'
import useInfiniteScroll from 'hooks/useInfiniteScroll'

type PostProps = {
  selectedTag: string
  posts: PostItemProps[]
}

type PostItemProps = {
  node: {
    fields: { slug: string }
    frontmatter: {
      title: string
      date: string
      tags: string[]
      summary: string
    }
  }
}

const PostListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  row-gap: 30px;
  padding: 15px 0 50px;
`

const PostList: FunctionComponent<PostProps> = function ({
  selectedTag,
  posts,
}) {
  const { containerRef, postList } = useInfiniteScroll(selectedTag, posts)

  return (
    <PostListWrapper ref={containerRef}>
      {postList.map(
        (
          {
            node: {
              fields: { slug },
              frontmatter,
            },
          }: PostItemProps,
          i: number,
        ) => (
          <PostItem key={i} {...frontmatter} link={slug} />
        ),
      )}
    </PostListWrapper>
  )
}

export default PostList
