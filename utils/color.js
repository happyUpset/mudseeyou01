export function hslToRgb (h, s, l) {
  let r, g, b

  if (s === 0) {
    r = g = b = l // achromatic
  } else {
    function hue2rgb (p, q, t) {
      if (t < 0) {
        t += 1
      }
      if (t > 1) {
        t -= 1
      }
      if (t < 1 / 6) {
        return p + (q - p) * 6 * t
      }
      if (t < 1 / 2) {
        return q
      }
      if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6
      }
      return p
    }

    let q = l < 0.5 ? l * (1 + s) : l + s - l * s
    let p = 2 * l - q

    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return [r * 255, g * 255, b * 255]
}

export function rgbToHsv (r, g, b) {

  r /= 255, g /= 255, b /= 255

  let max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h, s, v = max

  let d = max - min
  s = max === 0 ? 0 : d / max

  if (max === min) {
    h = 0 // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }

    h /= 6
  }

  return [h, s, v]

}
export function hsvToRgb (h, s, v) {

  let r, g, b

  let i = Math.floor(h * 6)
  let f = h * 6 - i
  let p = v * (1 - s)
  let q = v * (1 - f * s)
  let t = v * (1 - (1 - f) * s)

  switch (i % 6) {
    case 0:
      r = v, g = t, b = p
      break
    case 1:
      r = q, g = v, b = p
      break
    case 2:
      r = p, g = v, b = t
      break
    case 3:
      r = p, g = q, b = v
      break
    case 4:
      r = t, g = p, b = v
      break
    case 5:
      r = v, g = p, b = q
      break
  }
  return [r * 255, g * 255, b * 255]
}

export function rgbToHsl (r, g, b) {
  r /= 255, g /= 255, b /= 255

  let max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2

  if (max === min) {
    h = s = 0 // achromatic
  } else {
    let d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }

    h /= 6
  }
  h = Math.round(h * 360)
  l = Math.round(l * 1000) / 1000
  s = Math.round(s * 1000) / 1000
  return [h, s, l]
}

export function hexToHsl (hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  let r = parseInt(result[1], 16);
  let g = parseInt(result[2], 16);
  let b = parseInt(result[3], 16);
  return rgbToHsl(r,g,b)
}

export function HSL_lightness (hsl,percent){
  let l = hsl[2]*percent
  if(l <= 0)
    l = 0
  else if(l >= 1)
    l = 1
  return `hsl(${hsl[0]},${hsl[1]*100}%,${l*100}%)`
}
export function HSL (hsl){
  return `hsl(${hsl[0]},${hsl[1]*100}%,${hsl[2]*100}%)`
}
