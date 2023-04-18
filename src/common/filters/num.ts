/**
 * @method num
 * @param {String} placehold 占位符，值为null时显示占位符
 */
const num = (val: number, placehold = '--'): number | string => {
  return val === 0 || val ? val : placehold
}

export default num
