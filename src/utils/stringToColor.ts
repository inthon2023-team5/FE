const stringToHexColor = (str: string) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hexValue = (hash & 0xffffff).toString(16)
  const color = '#' + '0'.repeat(6 - hexValue.length) + hexValue

  return color
}

export default stringToHexColor
