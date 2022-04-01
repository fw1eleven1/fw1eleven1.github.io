import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

type TagsProps = {
  selectedTag: string
  tags: {
    [key: string]: number
  }
}

type TagStyleProps = {
  active?: string
}

const TagListWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 800px;
  margin: 0 auto 15px;
  overflow-x: auto;
`

const TagItem = styled.div<TagStyleProps>`
  margin-right: 10px;
  padding: 3px 0;
  font-size: 16px;
  font-weight: ${props => (props.active ? '600' : 'normal')};
  cursor: pointer;

  &:last-of-type {
    margin-right: 0;
  }
`

const TagList: FunctionComponent<TagsProps> = function ({ selectedTag, tags }) {
  console.log(selectedTag)
  return (
    <TagListWrapper>
      {Object.entries(tags).map(([name, count]) => (
        <TagItem key={name} {...(selectedTag === name && { active: 'active' })}>
          #{name}({count})
        </TagItem>
      ))}
    </TagListWrapper>
  )
}

export default TagList
