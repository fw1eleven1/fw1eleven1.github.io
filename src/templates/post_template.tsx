import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import Main from 'components/Common/Main'
import styled from '@emotion/styled'
import PostHead from 'components/Post/PostHead'
import PostContent from 'components/Post/PostContent'

type PostTemplateProps = {
  data: {
    allMarkdownRemark: {
      edges: PostListItemProps[]
    }
  }
}

type PostListItemProps = {
  node: {
    fields: { slug: string }
    html: string
    frontmatter: {
      title: string
      date: string
      summary: string
      tags: string[]
    }
  }
}

const ChildWrapper = styled.div`
  width: 800px;
`

const PostTemplate: FunctionComponent<PostTemplateProps> = function ({
  data: {
    allMarkdownRemark: { edges },
  },
}) {
  const {
    node: {
      html,
      frontmatter: { title, date, tags },
    },
  } = edges[0]

  return (
    <Main>
      <ChildWrapper>
        <PostHead title={title} date={date} tags={tags} />
        <PostContent html={html} />
      </ChildWrapper>
    </Main>
  )
}

export default PostTemplate

export const queryMarkdownDataBySlug = graphql`
  query queryMarkdownDataBySlug($slug: String) {
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          html
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
