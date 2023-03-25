import ellipsis from "./ellipsis";

const directives: any = { // 指令对象
  ellipsis
}
export default {
  install(app: any) {
    Object.keys(directives).forEach((key) => {
      app.directive(key, directives[key])
    });
  }
}