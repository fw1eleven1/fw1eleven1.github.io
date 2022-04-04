import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

type CategoriesProps = {
  categories: {
    [key: string]: number
  }
}

const CategoryWrapper = styled(Link)`
  display: flex;
  font-size: 18px;
  cursor: pointer;
`

const CategoryList: FunctionComponent<CategoriesProps> = function ({
  categories,
}) {
  return (
    <div>
      {Object.entries(categories).map(([name, count]) => (
        <CategoryWrapper to={name === 'All' ? `/` : `/${name}`} key={name}>
          - {name} ({count})
        </CategoryWrapper>
      ))}
    </div>
  )
}

export default CategoryList
