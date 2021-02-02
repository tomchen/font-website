import React from 'react'
import useBaseUrl from '@docusaurus/useBaseUrl'

export default function Figure({
  src,
  caption,
  figure_number,
  width,
  imgUrl,
  link,
  position,
}) {
  return (
    <div style={{ display: 'flow-root' }}>
      <figure
        style={{
          float: position === 'left' || position === 'right' ? position : 'none',
          textAlign: 'center',
          margin: '1em',
        }}
      >
        {link ? (
          <a href={link}>
            <img
              alt={caption}
              src={imgUrl ? useBaseUrl(`img/${src}`) : src}
              width={width}
            />
          </a>
        ) : (
          <img
            alt={caption}
            src={imgUrl ? useBaseUrl(`img/${src}`) : src}
            width={width}
          />
        )}
        <figcaption style={{ fontStyle: 'italic' }}>
          {figure_number && <strong>Figure {figure_number} </strong>}
          {caption}
        </figcaption>
      </figure>
    </div>
  )
}
