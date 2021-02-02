import React from 'react'
import RcTooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'

export default function Tooltip({ children, tip, ...rest }) {
  return (
    <RcTooltip placement="top" overlay={tip} {...rest}>
      <span
        style={{
          cursor: 'help',
        }}
      >
        <span
          style={{
            borderBottomWidth: '1px',
            borderBottomStyle: 'solid',
            borderBottomColor: 'var(--ifm-color-emphasis-500)',
          }}
        >
          {children}
        </span>
        <span
          style={{
            display: 'inline-block',
            width: '1em',
            height: '1em',
            textAlign: 'center',
            lineHeight: '1em',
            backgroundColor: 'var(--ifm-color-emphasis-500)',
            color: '#fff',
            marginTop: '2px',
            marginLeft: '2px',
            borderRadius: '50%',
            fontWeight: 'normal',
            fontStyle: 'normal',
            textDecoration: 'none',
          }}
        >
          ?
        </span>
      </span>
    </RcTooltip>
  )
}
