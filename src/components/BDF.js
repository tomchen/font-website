import React, { useRef, useEffect } from 'react'
import { Font, Glyph, Bitmap, $Font, $Glyph, $Bitmap } from './bdfparser/index'
import fetchline from 'fetchline'

const fonts = {}

export default (props) => {
  const {
    fontfile = 'https://font.tomchen.org/bdfparser_fonts/unifont-reduced.bdf',
    pixelcolors,
    size = 2,
    func = () => {},
    ...rest
  } = props

  const canvasRef = useRef(null)

  useEffect(async () => {
    if (fonts[fontfile] === undefined) {
      fonts[fontfile] = new Promise((resolve, reject) => {
        ;(async () => {
          try {
            resolve(await new Font().load_filelines(fetchline(fontfile)))
          } catch (error) {
            reject(new Error('Cannot load font file.'))
          }
        })()
      })
    }
    try {
      const font = await fonts[fontfile]
      const bitmap = func(font, {
        Font,
        Glyph,
        Bitmap,
        $Font,
        $Glyph,
        $Bitmap,
      })
      if (bitmap) {
        const canvas = canvasRef.current
        if (canvas) {
          canvas.style.width = '100%'
          canvas.style.height = `${(bitmap.height() * size).toString()}px`
          canvas.width = canvas.offsetWidth / size
          canvas.height = canvas.offsetHeight / size
          const ctx = canvas.getContext('2d')
          bitmap.draw2canvas(ctx, pixelcolors)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  return <canvas ref={canvasRef} {...rest} />
}
