import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

type CategoriesProps = {
  selectedCategory: string
  categories: {
    [key: string]: number
  }
}

type CategoryStyleProps = {
  active?: string
}

const CategoryWrapper = styled(Link)<CategoryStyleProps>`
  display: flex;
  font-size: 18px;
  cursor: pointer;
  color: #6c757d;
  font-weight: ${props => (props.active ? '600' : 'normal')};

  &:hover {
    opacity: 0.8;
  }
`

const CategoryList: FunctionComponent<CategoriesProps> = function ({
  selectedCategory,
  categories,
}) {
  return (
    <div>
      {Object.entries(categories).map(([name, count]) => (
        <CategoryWrapper
          to={name === 'All' ? `/` : `/${name}`}
          key={name}
          {...(selectedCategory === name && { active: 'active' })}
        >
          - {name} ({count})
        </CategoryWrapper>
      ))}
    </div>
  )
}

export default CategoryList
