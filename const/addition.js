export default () => {
  return [
    {
      id: 1,
      name: '發球機',
      price: 200,
      value: 'pingPongMachine',
      unit: '小時',
      min: 0,
      max: 1,
      rent: true
    },
    {
      id: 2,
      name: '球拍',
      price: 20,
      value: 'pingPongPaddle',
      unit: '個',
      min: 0,
      max: 4,
      rent: true
    },
    {
      id: 3,
      name: '乒乓球',
      price: 50,
      value: 'pingPongBall',
      unit: '2顆',
      min: 0,
      max: 100,
      rent: false
    },

  ]
}
