import { hexToHsl, HSL_lightness, } from '@/utils/color'

/**
 * 定義顏色，定義彩度
 ' --bc-red': `#FF8580`,
 ' --bc-red-dark': `${HSL_lightness(hexToHsl('#FF8580'),0.9)}`,
 ' --bc-red-light': `${HSL_lightness(hexToHsl('#FF8580'),1.1)}`,
 *
 */
export const STYLE = {

  '--bc-red': `#E50012`,
  '--bc-red-dark': `${HSL_lightness(hexToHsl('#E50012'),0.9)}`,
  '--bc-red-darker': `${HSL_lightness(hexToHsl('#E50012'),0.8)}`,
  '--bc-red-light': `${HSL_lightness(hexToHsl('#E50012'),1.1)}`,
  '--bc-red-lighter': `${HSL_lightness(hexToHsl('#E50012'),1.2)}`,

  '--bc-lawn-green': `#BCF32F`,
  '--bc-lawn-green-dark': `${HSL_lightness(hexToHsl('#BCF32F'),0.8)}`,
  '--bc-lawn-green-darker': `${HSL_lightness(hexToHsl('#BCF32F'),0.6)}`,
  '--bc-lawn-green-light': `${HSL_lightness(hexToHsl('#BCF32F'),1.1)}`,
  '--bc-lawn-green-lighter': `${HSL_lightness(hexToHsl('#BCF32F'),1.2)}`,

  '--bc-teal': `#1BB690`,
  '--bc-teal-dark': `${HSL_lightness(hexToHsl('#1BB690'),0.9)}`,
  '--bc-teal-darker': `${HSL_lightness(hexToHsl('#1BB690'),0.8)}`,
  '--bc-teal-light': `${HSL_lightness(hexToHsl('#1BB690'),1.1)}`,
  '--bc-teal-lighter': `${HSL_lightness(hexToHsl('#1BB690'),1.2)}`,

  '--bc-orange': `#FF9C28`,
  '--bc-orange-dark': `${HSL_lightness(hexToHsl('#FF9C28'),0.8)}`,
  '--bc-orange-darker': `${HSL_lightness(hexToHsl('#FF9C28'),0.6)}`,
  '--bc-orange-light': `${HSL_lightness(hexToHsl('#FF9C28'),1.2)}`,
  '--bc-orange-lighter': `${HSL_lightness(hexToHsl('#FF9C28'),1.4)}`,
  '--bc-orange-lightest': `${HSL_lightness(hexToHsl('#FF9C28'),1.65)}`,

  '--bc-gray-0': `#ffffff`,
  '--bc-gray-1': `#fbfbfb`,
  '--bc-gray-2': `#f6f6f6`,
  '--bc-gray-3': `#E7E7E7`,
  '--bc-gray-4': `#d3d3d3`,
  '--bc-gray-5': `#BCBCBC`,
  '--bc-gray-6': `#ACACAC`,
  '--bc-gray-7': `#888888`,
  '--bc-gray-8': `#7a7a7a`,
  '--bc-gray-9': `#454545`,
  '--bc-gray-10': `#333333`,
  '--bc-gray-11': `#1C1D1D`,

  '--bc-black': `var(--bc-gray-11)`,
  '--bc-gary': `var(--bc-gray-3)`,
  '--bc-white': `var(--bc-gray-0)`,

  '--bc-gradient-lawn-green-teal': `linear-gradient(90deg, var(--bc-lawn-green) 0%, var(--bc-teal) 102.15%)`,
  '--bc-gradient-lawn-green-teal-active': `linear-gradient(90deg, ${HSL_lightness(hexToHsl('#BCF32F'),1.1)} 0%, ${HSL_lightness(hexToHsl('#1BB690'),1.1)} 102.15%)`,
  '--bc-gradient-lawn-green-teal-hover': `linear-gradient(90deg, ${HSL_lightness(hexToHsl('#BCF32F'),0.9)} 0%, ${HSL_lightness(hexToHsl('#1BB690'),0.9)} 102.15%)`,

  '--bc-size-2k': '2560px',// 沒用
  '--bc-size-3xl': '1920px',
  '--bc-size-2xl': '1680px',
  '--bc-size-xl': '1440px',
  '--bc-size-lg': '1200px',
  '--bc-size-md': '992px',
  '--bc-size-2sm': '768px',
  '--bc-size-sm': '600px',
  '--bc-size-2xs': '450px',
  '--bc-size-xs': '350px',

  '--bc-box-size-2k': '2560px',// 沒用
  '--bc-box-size-3xl': '1760px',
  '--bc-box-size-2xl': '1520px',
  '--bc-box-size-xl': '1200px',
  '--bc-box-size-lg': '1140px',
  '--bc-box-size-md': '932px',
  '--bc-box-size-2sm': '600px',
  '--bc-box-size-sm': '540px',

  '--bc-h1': `3.6rem`,
  '--bc-h1-l': `4rem`,
  '--bc-h2': `3rem`,
  '--bc-h2-l': `3.4rem`,
  '--bc-h2s': `2.8rem`,
  '--bc-h2s-l': `3.2rem`,
  '--bc-h3': `2.4rem`,
  '--bc-h3-l': `2.8rem`,
  '--bc-h4': `2.4rem`,
  '--bc-h4-l': `2.8rem`,
  '--bc-h5': `2rem`,
  '--bc-h5-l': `2.4rem`,
  '--bc-h6': `1.6rem`,
  '--bc-h6-l': `2rem`,
  '--bc-h7': `1.4rem`,
  '--bc-h7-l': `1.8rem`,
  '--bc-small': `1.2rem`,
  '--bc-small-l': `1.6rem`,
  '--bc-p': `1.6rem`,
  '--bc-p-l': `3rem`,
  '--bc-alert': `1.4rem`,
  '--bc-alert-l': `1.8rem`,
}
