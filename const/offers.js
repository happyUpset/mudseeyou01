export default [
  {
    id: 1,
    useType: 'day',
    useAmount: 30,
    price: 1500,
    title: '平日暢打',
    rules: [
      {
        type: 'onWeekdays',//平日
        discount: 0,// 折扣
        timeRange:[
          {
            from: '08:00',
            to: '12:00'
          },
          {
            from: '13:00',
            to: '17:00'
          }
        ],
        limitation: {
          renewable: false, // 可以連續續約的
          time:{
            hour: 2
          },
          amount: 1, // 只能一張桌子
          pickable:{
            premium: false, // 國際比賽桌
            prepare: true,
            normal: true
          }
        },
      },
    ],
  },
]
