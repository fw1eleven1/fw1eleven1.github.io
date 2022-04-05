import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

type PostHeadProps = {
  title: string
  date: string
  tags: string[]
}

const PostHeadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  border-bottom: 1px solid lightgray;
`

const Title = styled.div`
  font-size: 40px;
  font-weight: 600;
`

const Tags = styled.div`
  font-size: 18px;
`

const PostHead: FunctionComponent<PostHeadProps> = function ({
  title,
  date,
  tags,
}) {
  return (
    <PostHeadWrapper>
      <Title>{title}</Title>
      <Tags>{tags.join(' / ')}</Tags>
      <div>{date}</div>
    </PostHeadWrapper>
  )
}

export default PostHead
