import React, { FunctionComponent, useMemo } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import queryString, { ParsedQuery } from 'query-string'

import Main from 'components/Common/Main'
import PostList from 'components/Post/PostList'
import Sidebar from 'components/Common/Sidebar'
import Description from 'components/Common/Description'
import TagList from 'components/Tag/TagList'

type IndexPageProps = {
  location: {
    search: string
  }
  data: {
    allMarkdownRemark: {
      edges: PostListItemProps[]
    }
    // allDirectory: {
    //   edges: {
    //     node: {
    //       name: string
    //     }
    //   }
    // }
    allDirectory: {
      group: {
        edges: {
          node: {
            relativeDirectory: string
          }
        }
      }
    }
  }
}

type DirectoryProps = {
  group: {
    edges: CategoryGroupProps
  }
}

type CategoryGroupProps = {
  edges: CategoryNodeProps
}

type CategoryEdgesProps = {
  node: CategoryNodeProps
}

type CategoryNodeProps = {
  relativeDirectory: string
}

type CategoriesProps = {
  [key: string]: number
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

type QueryDataProps = {
  allMarkdownRemark: {
    edges: PostListItemProps[]
  }
  // allDirectory: {
  //   edges: {
  //     node: {
  //       name: string
  //     }
  //   }
  // }
  allDirectory: {
    group: {
      edges: {
        node: {
          relativeDirectory: string
        }
      }
    }
  }
}

type CategoryListProps = {
  [key: string]: number
}

const IndexPage: FunctionComponent<IndexPageProps> = function ({
  location: { search },
}) {
  const data: QueryDataProps = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(contents)/" } }
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              date
              summary
              tags
            }
          }
        }
      }
      # allDirectory(filter: { relativeDirectory: { eq: "" } }) {
      #   edges {
      #     node {
      #       name
      #     }
      #   }
      # }
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
    }
  `)

  const remarkEdges = data.allMarkdownRemark.edges
  const directoryGroups = data.allDirectory.group

  let categories: CategoriesProps = {
    All: 0,
  }
  directoryGroups.forEach((group: CategoryGroupProps) => {
    group.edges.forEach((edge: CategoryEdgesProps) => {
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
    <Main>
      <Sidebar categories={categories} />
      <div>
        <Description />
        <TagList selectedTag={selectedTag} tags={tagList} />
        <PostList posts={remarkEdges} />
      </div>
    </Main>
  )
}

export default IndexPage
