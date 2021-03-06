import React, { FunctionComponent, useMemo } from 'react'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import Main from 'components/Common/Main'
import Description from 'components/Common/Description'
import queryString, { ParsedQuery } from 'query-string'
import TagList from 'components/Tag/TagList'
import PostList from 'components/Post/PostList'

type PostTemplateProps = {
  location: {
    pathname: string
    search: string
  }
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        siteUrl: string
      }
    }
    allMarkdownRemark: {
      edges: PostListItemProps[]
    }
    file: {
      childMarkdownRemark: {
        frontmatter: {
          description: string[]
        }
      }
    }
  }
}

type PostListItemProps = {
  node: {
    fields: { slug: string }
    frontmatter: {
      title: string
      date: string
      summary: string
      tags: string[]
    }
  }
}

type CategoryListProps = {
  [key: string]: number
}

const ChildWrapper = styled.div`
  width: 800px;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const PostListTemplate: FunctionComponent<PostTemplateProps> = function ({
  location: { pathname, search },
  data: {
    site: { siteMetadata },
    allMarkdownRemark: { edges },
    file: {
      childMarkdownRemark: {
        frontmatter: { description },
      },
    },
  },
}) {
  let path = decodeURI(pathname).substring(1)
  if (path.indexOf('/') !== -1) {
    path = path.substring(0, path.indexOf('/'))
  }

  const selectedDescription = description.filter(
    desc => desc.split(':')[0] === path,
  )

  const desc = selectedDescription[0].split(':')[1]

  const parsed: ParsedQuery<string> = queryString.parse(decodeURI(search))
  const selectedTag: string =
    typeof parsed.tag !== 'string' || !parsed.tag ? 'All' : parsed.tag

  const tagList = useMemo(
    () =>
      edges.reduce(
        (
          list: CategoryListProps,
          {
            node: {
              frontmatter: { tags },
            },
          }: PostListItemProps,
        ) => {
          tags.forEach(tag => {
            if (list[tag] === undefined) list[tag] = 1
            else list[tag]++
          })

          list['All']++

          return list
        },
        { All: 0 },
      ),
    [],
  )

  return (
    <Main siteMetadata={siteMetadata}>
      <ChildWrapper>
        <Description description={desc} />
        <TagList selectedTag={selectedTag} tags={tagList} />
        <PostList selectedTag={selectedTag} posts={edges} />
      </ChildWrapper>
    </Main>
  )
}

export default PostListTemplate

export const queryData = graphql`
  query queryData($categoryRegex: String) {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fileAbsolutePath: { regex: $categoryRegex } }
    ) {
      edges {
        node {
          frontmatter {
            title
            summary
            date(formatString: "YYYY-MM-DD")
            tags
          }
          fields {
            slug
          }
        }
      }
    }
    file(name: { eq: "category_info" }) {
      childMarkdownRemark {
        frontmatter {
          description
        }
      }
    }
  }
`
