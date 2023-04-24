/* eslint-disable no-useless-escape */
export const inputShadowStyle = { WebkitBoxShadow: '0 0 0 1000px white inset' }

export const verifyEmail = (value: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!re.test(value)) {
    return false
  } else {
    return true
  }
}
