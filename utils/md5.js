/*
 * @Descripttion: 封装md5方法
 * @Author: yuwei_tong
 * @LastEditors: yuwei_tong
 */

const crypto = require("crypto");

function md5(s) {
  return crypto
    .createHash("md5")
    .update("nyako" + s)
    .digest("hex");
}

function decodeAes(encrypted) {
  const key = "nyako";
  const decipher = crypto.createDecipher("aes192", key);
  var decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

module.exports = { md5, decodeAes };
