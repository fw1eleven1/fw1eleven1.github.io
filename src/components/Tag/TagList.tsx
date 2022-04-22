import React, {
  FunctionComponent,
  MutableRefObject,
  useEffect,
  useRef,
} from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

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
  width: 600px;
  overflow-x: auto;
  white-space: nowrap;

  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }

  & > a {
    color: inherit;
    text-decoration: none;
  }

  @media (max-width: 768px) {
    width: 80vw;
    max-width: 100%;
  }
`

const TagItem = styled(Link)<TagStyleProps>`
  margin-right: 10px;
  padding: 3px 0;
  font-size: 16px;
  font-weight: ${props => (props.active ? '600' : 'normal')};
  cursor: pointer;

  &:last-of-type {
    margin-right: 0;
  }

  &:hover {
    opacity: 0.8;
  }
`

const TagList: FunctionComponent<TagsProps> = function ({ selectedTag, tags }) {
  const horizonScrollRef: MutableRefObject<HTMLDivElement | null> = useRef(null)
  useEffect(() => {
    const el = horizonScrollRef.current
    if (el) {
      const onWheel = (e: WheelEvent) => {
        // if (el.scrollLeft === 0) {
        //   console.log('top')
        // }
        // if (el.clientWidth + el.scrollLeft === el.scrollWidth) {
        //   console.log('bottom')
        // }
        if (e.deltaY == 0) return
        e.preventDefault()
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
        })
      }
      el.addEventListener('wheel', onWheel)
      return () => el.removeEventListener('wheel', onWheel)
    }
    return
  }, [])

  return (
    <TagListWrapper ref={horizonScrollRef}>
      {Object.entries(tags).map(([name, count]) => (
        <TagItem
          key={name}
          to={`?tag=${name}`}
          {...(selectedTag === name && { active: 'active' })}
        >
          #{name}({count})
        </TagItem>
      ))}
    </TagListWrapper>
  )
}

export default TagList
