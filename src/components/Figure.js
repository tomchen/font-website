import React from 'react'
import useBaseUrl from '@docusaurus/useBaseUrl'

export default function Figure({
  src,
  caption,
  figure_number,
  width,
  baseUrl,
  link,
}) {
  return (
    <figure style={{ textAlign: 'center', margin: '1em' }}>
      {link ? (
        <a href={link}>
          <img alt={caption} src={baseUrl ? useBaseUrl(src) : src} width={width} />
        </a>
      ) : (
        <img alt={caption} src={baseUrl ? useBaseUrl(src) : src} width={width} />
      )}
      <figcaption style={{ fontStyle: 'italic' }}>
        {figure_number && <strong>Figure {figure_number}{' '}</strong>}
        {caption}
      </figcaption>
    </figure>
  )
}
