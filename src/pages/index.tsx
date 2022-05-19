import React, { FunctionComponent, useMemo } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import queryString, { ParsedQuery } from 'query-string'

import Main from 'components/Common/Main'
import PostList from 'components/Post/PostList'
import TagList from 'components/Tag/TagList'
import styled from '@emotion/styled'

type IndexPageProps = {
  location: {
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
    allDirectory: {
      group: {
        edges: {
          node: {
            relativeDirectory: string
          }
        }
      }
    }
    file: {
      publicURL: string
    }
  }
}

type CategoryEdgesProps = {
  edges: CategoryNodeProps[]
}

type CategoryNodeProps = {
  node: {
    relativeDirectory: string
  }
}

type CategoriesProps = {
  [key: string]: number
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

type QueryDataProps = {
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
  allDirectory: {
    group: CategoryEdgesProps[]
  }
  file: {
    publicURL: string
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

const IndexPage: FunctionComponent<IndexPageProps> = function ({
  location: { search },
}) {
  const data: QueryDataProps = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { fileAbsolutePath: { regex: "/(contents)/" } }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              date
              summary
              tags
            }
          }
        }
      }
      allDirectory(
        filter: { relativePath: { ne: "" }, relativeDirectory: { ne: "" } }
      ) {
        group(field: relativeDirectory) {
          edges {
            node {
              name
              relativeDirectory
            }
          }
        }
      }
      file(name: { eq: "ogimage" }) {
        publicURL
      }
    }
  `)

  const remarkEdges = data.allMarkdownRemark.edges
  const directoryGroups = data.allDirectory.group

  let categories: CategoriesProps = {
    All: 0,
  }
  directoryGroups.forEach((group: CategoryEdgesProps) => {
    group.edges.forEach((edge: CategoryNodeProps) => {
      if (categories[edge.node.relativeDirectory] === undefined)
        categories[edge.node.relativeDirectory] = 1
      else categories[edge.node.relativeDirectory]++
      categories['All']++
    })
  })

  const parsed: ParsedQuery<string> = queryString.parse(search)
  const selectedTag: string =
    typeof parsed.tag !== 'string' || !parsed.tag ? 'All' : parsed.tag

  const tagList = useMemo(
    () =>
      remarkEdges.reduce(
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
    <Main siteMetadata={data.site.siteMetadata} image={data.file.publicURL}>
      <ChildWrapper>
        {/* <Description description="전체 글 보기" /> */}
        <TagList selectedTag={selectedTag} tags={tagList} />
        <PostList selectedTag={selectedTag} posts={remarkEdges} />
      </ChildWrapper>
    </Main>
  )
}

export default IndexPage
