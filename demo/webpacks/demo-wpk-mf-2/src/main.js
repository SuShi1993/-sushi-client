;(async () => {
  // eslint-disable-next-line import/no-unresolved
  const { sayHello } = await import('RemoteApp/utils')
  sayHello()
})()
