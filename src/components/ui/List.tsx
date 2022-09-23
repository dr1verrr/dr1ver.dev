import React from 'react'
import { createUseStyles } from 'react-jss'

import { useTheme } from '@/theme/hooks'
import { ColorScheme } from '@/theme/types'

const useStyles = createUseStyles<'List' | 'ListItem', unknown, ColorScheme>({
  List: ({ theme }) => ({}),
  ListItem: ({ theme }) => ({
    listStyleType: 'initial'
  })
})

interface FeaturesListProps<D extends Array<any>> {
  ListProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  >
  ListItemProps?: React.DetailedHTMLProps<
    React.LiHTMLAttributes<HTMLLIElement>,
    HTMLLIElement
  >
  data: D
  render: D extends Array<infer I> ? (item: I) => React.ReactNode : never
}

export default function List<D extends Array<any>>({
  ListProps,
  ListItemProps,
  data,
  render
}: FeaturesListProps<D>) {
  const theme = useTheme()
  const classes = useStyles({ theme })

  return (
    <ul className={classes.List} {...ListProps}>
      {data?.map((item, idx) => (
        <li key={idx} className={classes.ListItem} {...ListItemProps}>
          {render(item)}
        </li>
      ))}
    </ul>
  )
}
