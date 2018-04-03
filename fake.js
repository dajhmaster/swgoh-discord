// console.log('Server State: Paused');
const timeoutScheduled = Date.now();


setTimeout(() => {
  const delay = Date.now() - timeoutScheduled;
  const date = new Date();

  console.log(`${delay}ms have passed since I was scheduled\n${date.getHours().toString()}:${date.getMinutes().toString()}:${date.getSeconds().toString()}\nServer State: Paused`)
}, 280000);
