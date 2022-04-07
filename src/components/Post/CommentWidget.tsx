import React, { FunctionComponent } from 'react'
import { Disqus } from 'gatsby-plugin-disqus'

type CommentWidgetProps = {
  id: string
  title: string
}

const CommentWidget: FunctionComponent<CommentWidgetProps> = function ({
  id,
  title,
}) {
  const discusConfig = {
    identifier: id,
    title,
  }
  return <Disqus config={discusConfig} />
}

export default CommentWidget
