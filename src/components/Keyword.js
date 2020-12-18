import React from 'react'

export default function Keyword({ keyword, value }) {
  return (
    <p>
      <code>
        <strong>{keyword}</strong> <i>{value}</i>
      </code>
    </p>
  )
}
