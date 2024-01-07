/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
    "./assets/css/**/*.{css,js,ts,jsx,tsx}",
  ],
  theme: {
    fill: theme => ({
      'red': theme('colors.red'),
      'white': theme('colors.white'),
      'black': theme('colors.black'),
      'gray': theme('colors.gray'),
      'teal': theme('colors.teal'),
      'lawn-green': theme('colors.lawn-green'),
    }),
    colors:{
      'white': 'var(--bc-white)',
      'black': 'var(--bc-black)',//#1C1D1D
      'gray': {
        '': 'var(--bc-gray-3)', //E7E7E7
        '0': 'var(--bc-gray-1)',//#fbfbfb
        '1': 'var(--bc-gray-2)',//#f3f3f3
        '2': 'var(--bc-gray-3)',//#E7E7E7
        '3': 'var(--bc-gray-4)',//#d3d3d3
        '4': 'var(--bc-gray-6)',//#aaaaaa
        '5': 'var(--bc-gray-8)',//#7a7a7a
        '6': 'var(--bc-gray-10)',//#333333
      },
      'red': {
        light: 'var(--bc-red-light)',
        lighter: 'var(--bc-red-lighter)',
        DEFAULT: 'var(--bc-red)',
        dark: 'var(--bc-red-dark)',
        darker: 'var(--bc-red-darker)',
      },
      'orange': {
        light: 'var(--bc-orange-light)',
        lighter: 'var(--bc-orange-lighter)',
        lightest: 'var(--bc-orange-lightest)',
        DEFAULT: 'var(--bc-orange)',
        dark: 'var(--bc-orange-dark)',
        darker: 'var(--bc-orange-darker)',
      },
      'lawn-green': {
        light: 'var(--bc-lawn-green-light)',
        lighter: 'var(--bc-lawn-green-lighter)',
        DEFAULT: 'var(--bc-lawn-green)',
        dark: 'var(--bc-lawn-green-dark)',
        darker: 'var(--bc-lawn-green-darker)',
      },
      'teal': {
        light: 'var(--bc-teal-light)',
        lighter: 'var(--bc-teal-lighter)',
        DEFAULT: 'var(--bc-teal)',
        dark: 'var(--bc-teal-dark)',
        darker: 'var(--bc-teal-darker)',
      },
    },
    spacing:{
      '0': '0', '1': '1px', '2': '2px', '3': '3px', '4': '4px', '5': '5px', '6': '6px', '7': '7px', '8': '8px', '9': '9px',
      '10': '10px','11': '11px', '12': '12px', '13': '13px', '14': '14px', '15': '15px', '16': '16px', '17': '17px', '18': '18px', '19': '19px',
      '20': '20px','21': '21px', '22': '22px', '23': '23px', '24': '24px', '25': '25px', '26': '26px', '27': '27px', '28': '28px', '29': '29px',
      '30': '30px','31': '31px', '32': '32px', '33': '33px', '34': '34px', '35': '35px', '36': '36px', '37': '37px', '38': '38px', '39': '39px',
      '40': '40px','41': '41px', '42': '42px', '43': '43px', '44': '44px', '45': '45px', '46': '46px', '47': '47px', '48': '48px', '49': '49px',
      '50': '50px','51': '51px', '52': '52px', '53': '53px', '54': '54px', '55': '55px', '56': '56px', '57': '57px', '58': '58px', '59': '59px',
      '60': '60px','61': '61px', '62': '62px', '63': '63px', '64': '64px', '65': '65px', '66': '66px', '67': '67px', '68': '68px', '69': '69px',
      '70': '70px','71': '71px', '72': '72px', '73': '73px', '74': '74px', '75': '75px', '76': '76px', '77': '77px', '78': '78px', '79': '79px',
      '80': '80px','81': '81px', '82': '82px', '83': '83px', '84': '84px', '85': '85px', '86': '86px', '87': '87px', '88': '88px', '89': '89px',
      '90': '90px','91': '91px', '92': '92px', '93': '93px', '94': '94px', '95': '95px', '96': '96px', '97': '97px', '98': '98px', '99': '99px',
      '100': '100px',
      '1/24': '4.1666666%', '5/24': '20.8333333%', '7/24': '29.1666666%', '11/24': '45.8333333%', '13/24': '54.1666666%', '17/24': '70.8333333%', '19/24': '79.1666666%', '23/24': '95.8333333%',
      '1/20': '5%', '3/20': '15%', '7/20': '35%', '9/20': '45%', '11/20': '55%', '13/20': '65%', '17/20': '85%', '19/20': '95%',
      '1/16': '6.25%', '3/16': '18.75%', '5/16': '31.25%', '7/16': '43.75%', '9/16': '56.25%', '11/16': '68.75%', '13/16': '81.25%', '15/16': '93.75%',
      '1/12': '8.333333%', '5/12': '41.666666%', '7/12': '58.333333%', '11/12': '91.666666%',
      '1/10': '10%', '3/10': '30%', '7/10': '70%', '9/10': '90%',
      '1/8': '12.5%', '3/8': '37.5%', '5/8': '62.5%', '7/8': '87.5%',
      '1/6': '16.666666%', '5/6': '83.333333%',
      '1/5': '20%', '2/5': '40%', '3/5': '60%', '4/5': '80%',
      '1/4': '25%', '3/4': '75%',
      '1/3': '33.333333%', '2/3': '66.666666%',
      '1/2': '50%',
      '1/1': '100%',
      '3xl': '1920px',
      '2xl': '1680px',
      xl: '1440px',
      lg: '1200px',
      md: '992px',
      '2sm': '768px',
      sm: '600px',
      '2xs': '450px',
      xs: '350px',
    },
    borderRadius: {
      'none': '0',
      'sm': '3px',
      'md': '5px',
      'lg': '10px',
      'xl': '15px',
      '2xl': '30px',
      'o': '50%',
    },
    fontSize: {
      '1': ['var(--bc-h1)', 'var(--bc-h1-l)'],//           3.6 [4
      '2': ['var(--bc-h2)', 'var(--bc-h2-l)'],//           3   [3.4
      '3': ['var(--bc-h3)', 'var(--bc-h3-l)'],//           2.4 [2.8
      '4': ['var(--bc-h4)', 'var(--bc-h4-l)'],//           2   [2.4
      '5': ['var(--bc-h5)', 'var(--bc-h5-l)'],//           1.8 [2.2
      '6': ['var(--bc-h6)', 'var(--bc-h6-l)'],//           1.6 [2
      '7': ['var(--bc-h7)', 'var(--bc-h7-l)'],//           1.4 [1.8
      'small': ['var(--bc-small)', 'var(--bc-small-l)'],// 1.2 [1.6
      'p': ['var(--bc-p)', 'var(--bc-p-l)'],//             1.6 [3
    },
    flex: {
      '0-1/24': '0 0 4.1666666%',
      '0-1/20': '0 0 5%',
      '0-1/16': '0 0 6.25%',
      '0-1/12': '0 0 8.333333%',
      '0-1/8': '0 0 12.5%',
      '0-1/6': '0 0 16.666666%',
      '0-1/5': '0 0 20%',
      '0-1/4': '0 0 25%',
      '0-1/3': '0 0 33.33333%',
      '0-1/2': '0 0 50%',
      '0-1/1': '0 0 100%',
      '1-auto': '1 1 auto',
      '0-auto': '0 0 auto'
    },
    screens: {
      '3xl': '1920px',
      '2xl': '1680px',
      xl: '1440px',
      lg: {'max': '1199px'},
      md: {'max': '991px'},
      '2sm': {'max': '767px'},
      sm: {'max': '599px'},
      '2xs': {'max': '449px'},
      xs: {'max': '349px'},
      's-3xl': {'max': '1919px'},
      's-2xl': {'max': '1679px'},
      's-xl': {'max': '1439px'},
      's-lg': '1200px',
      's-md': '992px',
      's-2sm': '768px',
      's-sm': '600px',
      's-2xs': '450px',
      's-xs': '350px',
    },
    boxShadow: {
      'light-gary': '0 0 4px 1px var(--bc-gray-4)',
      'light-gary-h': '0 0 4px 3px var(--bc-gray-4)',
      'light-white': '0 0 4px 1px var(--bc-white)',
      'green-hard': '4px 4px 0 0 var(--bc-green-dark)',
      'green-hard-x': '5px 5px 0 0 var(--bc-green-dark)',
      '4-10': '0 4px 10px rgba(0, 0, 0, 0.1)',
      '3-6': '0 3px 6px 0 rgba(0, 0, 0, 0.08)',
      '4-4-4': '4px 4px 4px 0 rgba(0, 0, 0, 0.25)',
      'm3-6': '0 -3px 6px 0 rgba(0, 0, 0, 0.08)',
      '1-2-6': '0 3px 6px 2px rgba(0, 0, 0, 0.08)',
      none: 'none',
    },
    extend: {
      borderColor:{
        'transparent': 'transparent'
      },
      backgroundImage: {
        'transparent': 'transparent',
        'img-landing': " url('https://img.marsfootball.com.tw/pingpong/landing.png')",
        'index-landing': " url('https://img.marsfootball.com.tw/pingpong/index-banner.png')",
        'karting-tweed3': "url('https://images.babycourses.com.tw/src/karting/tweed3.jpg')",
        'karting-tweed': "url('@/assets/image/karting/track_bg.jpg')",
        'work-banner': " url('https://images.babycourses.com.tw/src/apply/work_banner_1.jpg')",
        'work-banner-m': " url('https://images.babycourses.com.tw/src/apply/work_banner_1_m.jpg')",
        'logo-card': " url('https://images.babycourses.com.tw/logo-img-4x3.jpg')",
        'extend-mask' : 'linear-gradient(180deg, rgba(247, 248, 250, 0), var(--bc-white))',
        'linear-red' : 'linear-gradient(180deg, var(--bc-red), var(--bc-white))',
        'lawn-green-to-teal': 'var(--bc-gradient-lawn-green-teal)',
        'lawn-green-to-teal-active': 'var(--bc-gradient-lawn-green-teal-active)',
        'lawn-green-to-teal-hover': 'var(--bc-gradient-lawn-green-teal-hover)'
      },
      zIndex: {
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '60': 60,
        '70': 70,
        '80': 80,
        '90': 90,
        '100': 100,
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        '24': 'repeat(24, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-24': 'span 24 / span 24',
        'span-19': 'span 19 / span 19',
        'span-18': 'span 18 / span 18',
      }
    },
  },
  variants: {
    extend: {
    },
  },
  corePlugins: {
    container: false
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: 'var(--bc-box-size-xl)',
          padding: '0 1.5rem',
          margin: '0 auto',
          '@screen lg': {
            maxWidth: 'var(--bc-box-size-lg)',
          },
          '@screen md': {
            maxWidth: 'var(--bc-box-size-md)',
          },
          '@screen 2sm': {
            maxWidth: 'var(--bc-box-size-2sm)',
          },
          '@screen sm': {
            maxWidth: 'var(--bc-box-size-sm)',
          },
          '@screen xl': {
            minWidth: 'var(--bc-box-size-xl)',
          },
          '@screen 2xl': {
            minWidth: 'var(--bc-box-size-2xl)',
          },
          '@screen 3xl': {
            minWidth: 'var(--bc-box-size-3xl)',
          },
        },
        '.container-md': {
          maxWidth: 'var(--bc-box-size-md)',
          padding: '0 1.5rem',
          margin: '0 auto',
          '@screen 2sm': {
            maxWidth: 'var(--bc-box-size-2sm)',
          },
          '@screen sm': {
            maxWidth: 'var(--bc-box-size-sm)',
          },
        },
        '.container-2xl': {
          maxWidth: 'var(--bc-box-size-xl)',
          padding: '0 1.5rem',
          margin: '0 auto',
          '@screen lg': {
            maxWidth: 'var(--bc-box-size-lg)',
          },
          '@screen md': {
            maxWidth: 'var(--bc-box-size-md)',
          },
          '@screen 2sm': {
            maxWidth: 'var(--bc-box-size-2sm)',
          },
          '@screen sm': {
            maxWidth: 'var(--bc-box-size-sm)',
          },
          '@screen xl': {
            minWidth: 'var(--bc-box-size-xl)',
          },
          '@screen 2xl': {
            minWidth: 'var(--bc-box-size-2xl)',
          },
        },
        '.container-xl': {
          maxWidth: 'var(--bc-box-size-xl)',
          padding: '0 1.5rem',
          margin: '0 auto',
          '@screen lg': {
            maxWidth: 'var(--bc-box-size-lg)',
          },
          '@screen md': {
            maxWidth: 'var(--bc-box-size-md)',
          },
          '@screen 2sm': {
            maxWidth: 'var(--bc-box-size-2sm)',
          },
          '@screen sm': {
            maxWidth: 'var(--bc-box-size-sm)',
          },
        },
        '.writing-h-tb': {
          writingMode: 'horizontal-tb',
        },
        '.writing-v-rl': {
          writingMode: 'vertical-rl'
        },
        '.writing-v-lr': {
          writingMode: 'vertical-lr'
        }
      })
    }
  ]
}
