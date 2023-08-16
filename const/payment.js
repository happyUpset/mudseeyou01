export default [
  // {
  //   id: 1,
  //   src: 'https://img.marsfootball.com.tw/pingpong/pluspay.png',
  //   name: '全盈 PAY',
  // },
  {
    id: 2,
    src: 'https://img.marsfootball.com.tw/pingpong/linepay.png',
    name: 'LINE PAY',
    payment_gateway: 'linepay',
    isCounter: true,
    iosOnly: false
  },
  {
    id: 3,
    src: 'https://img.marsfootball.com.tw/pingpong/jko.png',
    name: '街口支付',
    payment_gateway: 'jkopay',
    isCounter: true,
    iosOnly: false
  },
  {
    id: 4,
    src: 'https://img.marsfootball.com.tw/pingpong/apple-pay.png',
    name: 'APPLE PAY',
    payment_gateway: 'appleapay',
    isCounter: false,
    iosOnly: true
  },
  {
    id: 5,
    src: 'https://img.marsfootball.com.tw/pingpong/virtual-account.png',
    name: '帳戶付款',
    payment_gateway: 'atm',
    isCounter: false,
    iosOnly: false
  },
]
