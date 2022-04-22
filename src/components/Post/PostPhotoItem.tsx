import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'

type PostPhotoItemProps = {
  title: string
  date: string
  tags: string[]
  thumbnail?: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
  link: string
}
const PostItemTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #000;
  word-break: break-all;
`

const PostItemWrapper = styled(Link)`
  cursor: pointer;
  color: inherit;
  text-decoration: none;

  &:hover ${PostItemTitle} {
    opacity: 0.7;
  }
`

const PostItemThumbnail = styled(GatsbyImage)`
  width: 100%;
  height: 300px;
  margin-bottom: 10px;

  @media (max-width: 767px) {
    height: 150px;
  }
`

const PostItemDate = styled.div`
  font-size: 14px;
  opacity: 0.6;
`

const PostItemTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -5px;
`

const PostItemTag = styled.div`
  height: 25px;
  line-height: 1.7;
  border-radius: 20px;
  color: #6610f2;
  margin: 0 5px;
`

const PostPhotoItem: FunctionComponent<PostPhotoItemProps> = function ({
  title,
  date,
  tags,
  thumbnail,
  link,
}) {
  return (
    <PostItemWrapper to={link}>
      {thumbnail && (
        <PostItemThumbnail
          alt="thumbnail"
          image={thumbnail.childImageSharp.gatsbyImageData}
        />
      )}
      <PostItemTitle>{title}</PostItemTitle>
      <PostItemTags>
        {tags.map(tag => (
          <PostItemTag key={tag}>#{tag}</PostItemTag>
        ))}
      </PostItemTags>
      <PostItemDate>{date}</PostItemDate>
    </PostItemWrapper>
  )
}

export default PostPhotoItem
