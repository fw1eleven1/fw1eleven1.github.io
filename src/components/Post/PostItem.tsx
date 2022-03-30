import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

type PostItemProps = {
  title: string
  date: string
  tags: string[]
  summary: string
}

const PostItemWrapper = styled.div`
  cursor: pointer;
`

const PostItemTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
`

const PostItemDate = styled.div`
  font-size: 14px;
  opacity: 0.6;
`

const PostItemSummary = styled.div`
  display: -webkit-box;
  overflow: hidden;
  margin-top: auto;
  text-overflow: ellipsis;
  white-space: normal;
  overflow-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 16px;
  opacity: 0.8;
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

const PostItem: FunctionComponent<PostItemProps> = function ({
  title,
  date,
  tags,
  summary,
}) {
  return (
    <PostItemWrapper>
      <PostItemTitle>{title}</PostItemTitle>
      <PostItemSummary>{summary}</PostItemSummary>
      <PostItemTags>
        {tags.map(tag => (
          <PostItemTag>#{tag}</PostItemTag>
        ))}
      </PostItemTags>
      <PostItemDate>{date}</PostItemDate>
    </PostItemWrapper>
  )
}

export default PostItem
