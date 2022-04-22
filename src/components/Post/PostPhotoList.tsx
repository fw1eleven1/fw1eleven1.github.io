import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import PostPhotoItem from './PostPhotoItem'
import useInfiniteScroll from 'hooks/useInfiniteScroll'
import { IGatsbyImageData } from 'gatsby-plugin-image'

type PostProps = {
  selectedTag: string
  posts: PostPhotoItemProps[]
}

type PostPhotoItemProps = {
  node: {
    fields: { slug: string }
    frontmatter: {
      title: string
      date: string
      tags: string[]
      thumbnail?: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData
        }
      }
    }
  }
}

const PostListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  padding: 15px 0 50px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }
`

const PostPhotoList: FunctionComponent<PostProps> = function ({
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
          }: PostPhotoItemProps,
          i: number,
        ) => (
          <PostPhotoItem key={i} {...frontmatter} link={slug} />
        ),
      )}
    </PostListWrapper>
  )
}

export default PostPhotoList
