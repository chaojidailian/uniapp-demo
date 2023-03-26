'use strict';
const db = uniCloud.database()

exports.main = async (event, context) => {
  // 获取 `user` 集合的引用
  const result = await db.collection('banners').get()

  return result
};
