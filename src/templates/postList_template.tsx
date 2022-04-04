import React, { FunctionComponent, useMemo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styled from '@emotion/styled'
import PostItem from 'components/Post/PostItem'
import Main from 'components/Common/Main'
import Description from 'components/Common/Description'
import queryString, { ParsedQuery } from 'query-string'
import TagList from 'components/Tag/TagList'

const PostListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  row-gap: 30px;
  max-width: 800px;
  width: 800px;
`

type PostTemplateProps = {
  location: {
    pathname: string
    search: string
  }
  data: {
    allMarkdownRemark: {
      edges: {
        node: {
          frontmatter: {
            title: string
            date: string
            tags: string[]
            summary: string
          }
          fields: {
            slug: string
          }
        }
      }
    }
    file: {
      childMarkdownRemark: {
        frontmatter: {
          description: {
            [key: string]: string
          }
        }
      }
    }
  }
}

type PostListItemProps = {
  node: {
    id: string
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

const PostListTemplate: FunctionComponent<PostTemplateProps> = function ({
  location: { pathname, search },
  data: {
    allMarkdownRemark: { edges },
    file: {
      childMarkdownRemark: {
        frontmatter: { description },
      },
    },
  },
}) {
  const desc = description[pathname.substr(1)]

  const parsed: ParsedQuery<string> = queryString.parse(search)
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
    <Main>
      <div>
        <Description description={desc} />
        <TagList selectedTag={selectedTag} tags={tagList} />
        <PostListWrapper>
          {edges.map((edge, i) => (
            <PostItem
              key={i}
              title={edge.node.frontmatter.title}
              date={edge.node.frontmatter.date}
              tags={edge.node.frontmatter.tags}
              summary={edge.node.frontmatter.summary}
              link={edge.node.fields.slug}
            />
          ))}
        </PostListWrapper>
      </div>
    </Main>
  )
}

export default PostListTemplate

export const queryData = graphql`
  query queryData($categoryRegex: String) {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: $categoryRegex } }) {
      edges {
        node {
          id
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
          description {
            IT
            LIFE
          }
        }
      }
    }
  }
`
