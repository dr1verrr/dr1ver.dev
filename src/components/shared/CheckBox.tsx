import React, { useCallback, useEffect, useId, useState } from 'react'
import { createUseStyles } from 'react-jss'

import { useTheme } from '@/components/wrappers/Layout/theme'
import { ColorScheme } from '@/theme/types'
import { rgba } from '@/utils/styles'

type CheckBoxProps = {
  checked?: boolean
  labelText?: string
  inputId?: string
  InputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
  WrapperProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
}
type CheckBoxStyledProps = {
  checked: boolean
  labelText?: string
}

const useStyles = createUseStyles<
  'CheckBox' | 'CheckBoxInput' | 'CheckBoxLabel',
  CheckBoxStyledProps,
  ColorScheme
>(theme => ({
  CheckBox: ({ checked }) => ({
    display: 'flex',
    '&:hover $CheckBoxLabel': {
      borderColor: rgba(theme.color, 0.75)
    }
  }),
  CheckBoxInput: ({ checked }) => ({
    display: 'none'
  }),
  CheckBoxLabel: ({ checked }) => ({
    cursor: 'pointer',
    transitionProperty: 'border-color, background, left',
    transitionDuration: '.15s',
    position: 'relative',
    padding: '0.75em 1.5em',
    borderRadius: '0.5em',
    display: 'block',
    background: theme.bg,
    border: `0.15em solid ${theme.divider}`,
    '&::after': {
      transitionProperty: 'left, background',
      transitionDuration: '.15s',
      content: "''",
      position: 'absolute',
      display: 'block',
      left: checked ? 'calc(100% - 1.2em)' : '0.4em',
      bottom: '50%',
      translate: '0 50%',
      borderRadius: '100%',
      padding: '0.4em 0.4em',
      background: checked ? theme.palette.lightContrast.color : theme.divider
    }
  })
}))

export default function CheckBox({
  InputProps,
  WrapperProps,
  checked,
  labelText,
  inputId
}: CheckBoxProps) {
  const [isChecked, setIsChecked] = useState(checked ?? false)
  const theme = useTheme()
  const classes = useStyles({ theme, checked: isChecked })
  const id = inputId || useId()

  useEffect(() => {
    if (typeof checked === 'boolean') {
      setIsChecked(checked)
    }
  }, [checked])

  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(e => {
    setIsChecked(prev => !prev)
  }, [])

  return (
    <div className={classes.CheckBox} {...WrapperProps}>
      <label className={classes.CheckBoxLabel} htmlFor={id}></label>
      {labelText && (
        <label
          htmlFor={id}
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.85em',
            paddingLeft: '0.5em',
            color: theme.palette.lightContrast.color,
            userSelect: 'none'
          }}
        >
          {labelText}
        </label>
      )}
      <input
        checked={typeof checked === 'boolean' ? checked : isChecked}
        className={classes.CheckBoxInput}
        id={id}
        type='checkbox'
        onChange={onChange}
        {...InputProps}
      />
    </div>
  )
}
