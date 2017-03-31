export default {
  bind: function () {
  },
  inserted: function (el) {
    el.focus()
  },
  update: function (el, binding, vnode) {
    console.log('---------------------------------')
    console.log(binding)
    console.log('vnode keys: ' + Object.keys(vnode).join(', '))

    let bindName = binding.expression
    let vm = vnode.context
    // filded 失败一次之后触发，errors 实时触发
    let isFailded = vm.fields.failed(bindName) || vm.errors.has(bindName)
    let isPassed = vm.fields.passed(bindName)

    console.log(vm.errors)
    if (isFailded) {
      let errorMsg = vm.errors.first(bindName)
      handlerError(el, errorMsg)
      console.log('valid filded')
      console.log(errorMsg)
    } else if (isPassed) {
      console.log('valid pass')
      handlerPass(el)
    }

    console.log('---------------------------------')
  },
  unbind: function () {
  }
}

const FORM_CONTROL = 'form-control'
const HELP_BLOCK = 'help-block'
const HAS_ERROR = 'has-error'
// const HAS_SUCCESS = 'has-success'
const HAS_FEEDBACK = 'has-feedback'
const FA = 'fa'
const FA_WARNING = 'fa-warning'
const FA_CHECK = 'fa-check'
const FORM_CONTROL_FEEDBACK = 'form-control-feedback'

function handlerPass (el) {
  removeClass(el, HAS_ERROR)
  // addClass(el, HAS_SUCCESS)
  addIcon(el, FA_CHECK)
  removeErrorSpan(el)
}

function handlerError (el, errorMsg) {
  // removeClass(el, HAS_SUCCESS)
  addClass(el, HAS_ERROR)
  addIcon(el, FA_WARNING)
  appendErrorSpan(el, errorMsg)
}

/**
* 添加Icon
*/
function addIcon (el, iconClass) {
  // 寻找错误挂载点
  let formControl = getErrorMountElement(el)
  if (!formControl) {
    console.error('can not find form-control where error mount')
    return
  }

  addClass(el, HAS_FEEDBACK)
  let parentNode = formControl.parentNode
  let iconElement = getErrorIcon(parentNode)
  if (iconElement) {
    removeClass(iconElement, FA_CHECK)
    removeClass(iconElement, FA_WARNING)
    addClass(iconElement, iconClass)
  } else {
    parentNode.appendChild(createIcon(FA_CHECK))
  }
}

/**
* 添加错误信息
*/
function appendErrorSpan (el, errorMsg) {
  // 寻找错误挂载点
  let formControl = getErrorMountElement(el)
  if (!formControl) {
    console.error('can not find form-control where error mount')
    console.error('error message:' + errorMsg)
    return
  }

  // 判断是否已经有错误提示了，有则不添加
  let parentNode = formControl.parentNode
  let errorSpanList = parentNode.getElementsByClassName(HELP_BLOCK)
  if (errorSpanList.length === 0) {
    parentNode.appendChild(createErrorSpan(errorMsg))
    return
  }

  // 更新已有的错误提示
  let errorSpan = errorSpanList[0]
  removeAllChild(errorSpan)
  errorSpan.appendChild(document.createTextNode(errorMsg))
}

/**
* 移除错误信息
*/
function removeErrorSpan (el) {
  let formControl = getErrorMountElement(el)
  if (!formControl) {
    console.error('can not find form-control where error mount')
    return
  }

  let parentNode = formControl.parentNode
  let errorSpanList = parentNode.getElementsByClassName(HELP_BLOCK)
  if (errorSpanList.length >= 0) {
    for (let i = 0; i < errorSpanList.length; i++) {
      errorSpanList[0].remove()
    }
  }
}

/**
* 寻找错误挂载点
*/
function getErrorMountElement (el) {
  let formControl = el.getElementsByClassName(FORM_CONTROL)
  if (formControl.length > 0) {
    return formControl[0]
  } else {
    return null
  }
}

/**
* 获取表单上的Icon
*/
function getErrorIcon (parentNode) {
  let checkIcons = parentNode.getElementsByClassName(FA_CHECK)
  let warningIcons = parentNode.getElementsByClassName(FA_WARNING)
  let icon = checkIcons.length > 0 ? checkIcons[0] : (warningIcons.length > 0 ? warningIcons[0] : null)
  return icon
}

/**
* 创建一条错误信息
*/
function createErrorSpan (errorMsg) {
  let span = document.createElement('span')
  span.classList.add(HELP_BLOCK)
  span.appendChild(document.createTextNode(errorMsg))
  return span
}

function createIcon (iconClass) {
  let icon = document.createElement('i')
  icon.classList.add(FA)
  icon.classList.add(FORM_CONTROL_FEEDBACK)
  icon.classList.add(iconClass)
  return icon
}

function addClass (element, className) {
  element.classList.add(className)
}

function removeClass (element, className) {
  element.classList.remove(className)
}

function removeAllChild (element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}
