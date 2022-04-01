import React, { FunctionComponent } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styled from '@emotion/styled'
import PostItem from 'components/Post/PostItem'
import Main from 'components/Common/Main'

const PostListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  row-gap: 30px;
  max-width: 800px;
  width: 100%;
`

type PostTemplateProps = {
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
        }
      }
    }
  }
}

const PostListTemplate: FunctionComponent<PostTemplateProps> = function ({
  data: {
    allMarkdownRemark: { edges },
  },
}) {
  return (
    <Main>
      <PostListWrapper>
        {edges.map((edge, i) => (
          <PostItem
            key={i}
            title={edge.node.frontmatter.title}
            date={edge.node.frontmatter.date}
            tags={edge.node.frontmatter.tags}
            summary={edge.node.frontmatter.summary}
          />
        ))}
      </PostListWrapper>
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
        }
      }
    }
  }
`
