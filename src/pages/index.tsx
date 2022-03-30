import React, { FunctionComponent } from 'react'

import Main from 'components/Common/Main'
import PostList from 'components/Post/PostList'
import Sidebar from 'components/Common/Sidebar'
import Description from 'components/Common/Description'

const IndexPage: FunctionComponent = function () {
  return (
    <Main>
      <Sidebar />
      <div>
        <Description />
        <PostList />
      </div>
    </Main>
  )
}

export default IndexPage
