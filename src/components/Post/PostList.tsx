import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import PostItem from './PostItem'

const TEMP_POST_DATA = [
  {
    title: 'Post Title',
    date: '2022-03-30',
    tags: ['Web', 'React', 'Gastby'],
    summary:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident repellat doloremque fugit quis rem temporibus! Maxime molestias, suntrem debitis odit harum impedit. Modi cupiditate harum dignissimos eos in corrupti!',
    link: 'https://google.co.kr',
  },
  {
    title: 'Post Title',
    date: '2022-03-30',
    tags: ['Web', 'React', 'Gastby'],
    summary:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident repellat doloremque fugit quis rem temporibus! Maxime molestias, suntrem debitis odit harum impedit. Modi cupiditate harum dignissimos eos in corrupti!',
    link: 'https://google.co.kr',
  },
  {
    title: 'Post Title',
    date: '2022-03-30',
    tags: ['Web', 'React', 'Gastby'],
    summary:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident repellat doloremque fugit quis rem temporibus! Maxime molestias, suntrem debitis odit harum impedit. Modi cupiditate harum dignissimos eos in corrupti!',
    link: 'https://google.co.kr',
  },
]

const PostListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  row-gap: 30px;
  max-width: 800px;
  width: 100%;
`

const PostList: FunctionComponent = function () {
  return (
    <PostListWrapper>
      {TEMP_POST_DATA.map((n, i) => (
        <PostItem
          key={i}
          title={n.title}
          date={n.date}
          tags={n.tags}
          summary={n.summary}
        />
      ))}
    </PostListWrapper>
  )
}

export default PostList
