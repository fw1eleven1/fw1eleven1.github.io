import React, { FunctionComponent } from 'react'
import { Disqus } from 'gatsby-plugin-disqus'

type CommentWidgetProps = {
  title: string
}

const CommentWidget: FunctionComponent<CommentWidgetProps> = function ({
  title,
}) {
  const discusConfig = {
    url: 'blog.jsworld.me',
    identifier: title,
    title,
  }
  return <Disqus config={discusConfig} />
}

export default CommentWidget
