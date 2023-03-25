// import { defineDirective } from 'vue'
export default {
  mounted(el: any, binding :any) {
    const { value: lineHeight } = binding
    const height = el.offsetHeight
    const style = getComputedStyle(el)
    const fontSize = style.getPropertyValue('font-size')
    const lineHeightNum = Number(lineHeight) || Number(fontSize)
    const lines = Math.floor(height / lineHeightNum)
    const webkitLineClamp = `-${lines}`
    el.style.webkitBoxOrient = 'vertical'
    el.style.display = '-webkit-box'
    el.style.webkitLineClamp = webkitLineClamp
    el.style.overflow = 'hidden'
  }
}