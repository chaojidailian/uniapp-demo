import myRequest from '../index'

export async function requestHomeList() {
  return await myRequest.get({ url: '/gethomelist' })
}

export async function requestHomeBanners() {
  return await myRequest.get({ url: '/gethomebanners' })
}

export async function requestHomeActivity() {
  return await myRequest.get({ url: '/gethomeactivity' })
}

export async function requestHomeCategory() {
  return await myRequest.get({ url: '/gethomecategory' })
}

export async function requestHomeCommend() {
  return await myRequest.get({ url: '/gethomerecommend' })
}


