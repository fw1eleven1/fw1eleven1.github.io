import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react'

type PostItemProps = {
  node: {
    fields: {
      slug: string
    }
    frontmatter: {
      title: string
      date: string
      summary: string
      tags: string[]
    }
  }
}

export type useInfiniteScrollType = {
  containerRef: MutableRefObject<HTMLDivElement | null>
  postList: PostItemProps[]
}

const NUMBER_OF_ITEMS_PER_PAGE = 10

const useInfiniteScroll = function (
  selectedTag: string,
  posts: PostItemProps[],
) {
  const containerRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null)
  const observer: MutableRefObject<IntersectionObserver | null> =
    useRef<IntersectionObserver>(null)

  const [count, setCount] = useState<number>(1)

  const postListByTag = useMemo<PostItemProps[]>(
    () =>
      posts.filter(
        ({
          node: {
            frontmatter: { tags },
          },
        }: PostItemProps) =>
          selectedTag !== 'All' ? tags.includes(selectedTag) : true,
      ),
    [selectedTag],
  )

  useEffect(() => {
    observer.current = new IntersectionObserver((entries, observer) => {
      if (!entries[0].isIntersecting) return

      setCount(value => value + 1)
      observer.unobserve(entries[0].target)
    })
  }, [])

  useEffect(() => setCount(1), [selectedTag])

  useEffect(() => {
    if (
      NUMBER_OF_ITEMS_PER_PAGE * count >= postListByTag.length ||
      containerRef.current === null ||
      containerRef.current.children.length === 0 ||
      observer.current === null
    )
      return

    observer.current.observe(
      containerRef.current.children[containerRef.current.children.length - 1],
    )
  }, [count, selectedTag])

  return {
    containerRef,
    postList: postListByTag.slice(0, count * NUMBER_OF_ITEMS_PER_PAGE),
  }
}

export default useInfiniteScroll
