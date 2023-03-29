export default async function getipToAddress(ip?: string) {
  const apiKey = '2546189eedabf46f99cf0b20954e26c8'
  let getAddress = `https://restapi.amap.com/v3/ip?key=${apiKey}`
  if(ip) {
    getAddress += `&ip=${ip}`
  }
  return await uni
    .request({
      url: getAddress,
    })
}