const error = (err, req, res, next) => {
  console.error(err)
  req.flash('error', err.message || '發生錯誤!')

  // 利用正規表達式檢查 err.message 訊息
  const regex = /查無紀錄+/g

  if (regex.test(err.message)) {
    return res.redirect('/index')
  }

  return res.redirect('back')
}

module.exports = error
