import React from 'react'
import useBaseUrl from '@docusaurus/useBaseUrl'

export default function Figure({
  src,
  caption,
  figure_number,
  width,
  position,
  baseUrl,
}) {
  return (
    <figure style={{ textAlign: 'center', margin: '1em' }}>
      <img alt={caption} src={useBaseUrl(src)} width={width} />
      <figcaption style={{ fontStyle: 'italic' }}><strong>Figure {figure_number}</strong> {caption}</figcaption>
    </figure>
  )
}
