import browser from 'webextension-polyfill'

import React, { useEffect, useState, createContext, useContext } from "react";
import ReactDOM from "react-dom";

import { PopupCard } from "./PopupCard"

import { StyleProvider } from '@ant-design/cssinjs';

import { fetchcurrentLanguage } from './lib/lang';
import { CurrentLanguageContext } from './lib/locale'
import { LetterCaseLowercaseIcon } from '@radix-ui/react-icons';

import { popupCardStyle } from './PopupCard/style'

// import './assets/tailwind.css';


// 页面载入后会注入次脚本，或 background 可能会在一些情况下注入此脚本
// console.log('before browser.runtime.onMessage.addListener');

// 记录当前窗口是否 Pin 住
let isPin = false
// 设置当前窗口是否允许关闭
let donotClosePopupCard = false

// 初始化主容器，主容器用来挂在全局样式，包括第三方组件的样式
let MyBox: HTMLElement | null = document.getElementById('__jiang-scouter');
// console.log(MyBox);

// container 承载 UI 组件
let container = document.createElement('div')
container.className = 'container'
// 使用 shadow 来隔离样式
let shadowRoot: any = undefined

if (MyBox === null || MyBox === undefined) {
  // 如果不存在容器
  // 创建主容器
  MyBox = document.createElement('div')
  MyBox.id = '__jiang-scouter'
  document.getElementsByTagName('html')[0].appendChild(MyBox);
  MyBox.style.display = 'none' //默认隐藏

  shadowRoot = MyBox?.attachShadow({ mode: 'open' });

  shadowRoot?.appendChild(container)

  // Ant 组件样式
  // const antStylesheet = document.createElement('link');
  // antStylesheet.rel = 'stylesheet';
  // antStylesheet.href = 'https://cdn.bootcdn.net/ajax/libs/antd/4.17.1/antd.min.css';
  // shadowRoot.appendChild(antStylesheet);


  // Tailwind
  const tailwindStylesheet = document.createElement('link');
  tailwindStylesheet.rel = 'stylesheet';
  tailwindStylesheet.href = 'https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css';
  shadowRoot.appendChild(tailwindStylesheet);


  // 在 Shadow DOM 中添加样式：
  const style = document.createElement('style');
  style.textContent = popupCardStyle
  shadowRoot?.appendChild(style);

}


let port = browser.runtime.connect({
  name: 'fromContentScript'
})

// 接收 background 消息（目前是通过浏览器的右键菜单触发）
browser.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

  // console.log('content script onMessage:');
  // console.log(msg);
  if (msg.type === 'open-scouter') {


    // 处理窗口

    if (MyBox !== null && MyBox !== undefined) {
      // 如果已存在容器

      if (MyBox.shadowRoot?.querySelector('.container') === null) {
        // 如果不存在 PopupCard
        container = document.createElement('div')
        container.className = 'container'
        shadowRoot?.appendChild(container)
      }

      // 停止旧的对话
      try {
        port.postMessage({ 'type': 'StopTheConversation', 'messages': '' })
      } catch (error) {
        // 重新链接
        port = browser.runtime.connect({
          name: 'fromContentScript'
        })
        port.postMessage({ 'type': 'StopTheConversation', 'messages': '' })
      }



      MyBox.style.display = 'block'

      // 移除旧内容，避免 2 次渲染混杂在一起
      // container.parentNode?.removeChild(container);

    } else {
      // console.log('不存在 Box 容器');
      container = document.createElement('div')
      container.className = 'container'
      shadowRoot?.appendChild(container)
    }

    // const selection = window.getSelection();

    const selection = getSelection()

    // 显示窗口
    if (selection && selection.keyWord !== '') {
      showPopupCard({ 'keyWord': selection?.keyWord, 'Sentence': selection.sentence }, window.getSelection(), container, shadowRoot, isPin, msg.runPrompt)
    }

    document.addEventListener('selectionchange', handleSelectionchange);
    document.addEventListener('mouseup', handleMouseup);

    // 监听页面点击事件
    document.onmousedown = function (event) {

      if (MyBox !== undefined && MyBox !== null && !isPin && !donotClosePopupCard) {
        // 如果点击的不是插件窗口及其子元素，则关闭窗口
        if (MyBox !== event.target && !MyBox.contains(event.target as Node)) {

          // 隐藏窗口
          container.parentNode?.removeChild(container);

          document.removeEventListener('selectionchange', handleSelectionchange);
          document.removeEventListener('mouseup', handleMouseup);

          port.postMessage({ 'type': 'StopTheConversation', 'messages': '' })

        }
      }
    }

    container.onmousedown = (event) => {
      // 隐藏 setAnkiSpaceButton
      const ankiSpaceButtonBox = container.getElementsByClassName('ankiSpaceButtonBox')[0]

      if (ankiSpaceButtonBox) {
        // 点击的不是 setAnkiSpaceButton 时才隐藏
        if (ankiSpaceButtonBox !== event.target && !ankiSpaceButtonBox.contains(event.target as Node)) {
          ankiSpaceButtonBox.parentNode?.removeChild(ankiSpaceButtonBox)
        }

      }

    }


  }

});

// 显示应用窗口
async function showPopupCard(data: { keyWord: string, Sentence: string }, msg: any, MyBox: any, shadowRoot: any, isPin: boolean, runPrompt: boolean) {
  // let a = await fetchcurrentLanguage()
  // console.log(a);
  const lang = await fetchcurrentLanguage()

  ReactDOM.render(
    <React.StrictMode>
      <CurrentLanguageContext.Provider value={lang}>
        <StyleProvider container={shadowRoot}>
          <PopupCard data={data} selection={msg} runPrompt={runPrompt} isPin={isPin} />
        </StyleProvider>
      </CurrentLanguageContext.Provider>
    </React.StrictMode>,
    MyBox
  );

}


export const pinPopupCard = (value: boolean) => {
  isPin = value
}

export const setDonotClosePopupCard = (value: boolean) => {
  donotClosePopupCard = value
}

let isTextSelected = false;

const handleSelectionchange = () => {

  // let selection = window.getSelection();
  // if (selection) {
  //   console.log('selection.toString():');
  //   console.log(selection.toString());

  //   isTextSelected = selection.toString().length > 0;
  // }
}

const handleMouseup = (event: any) => {

  // console.log('handleMouseup');
  // console.log(isTextSelected);
  // console.log(donotClosePopupCard);

  const selection = getSelection()

  if (selection) {
    isTextSelected = selection.selection.toString().length > 0;
  }


  if (isTextSelected && !donotClosePopupCard) {

    // console.log('isTextSelected && !donotClosePopupCard');

    if (MyBox !== event.target && !MyBox?.contains(event.target as Node)) {

      // 在 PopupCard 范围外触发

      isTextSelected = false;

      // 停止旧的对话
      port.postMessage({ 'type': 'StopTheConversation', 'messages': '' })

      // 显示窗口
      if (selection && selection?.keyWord.length > 0) {
        showPopupCard({ 'keyWord': selection?.keyWord, 'Sentence': selection.sentence }, window.getSelection(), container, shadowRoot, isPin, true)
      }

    } else {

      // 在 PopupCard 范围内触发

      // 显示完形填空操作按钮
      const selectedText = shadowRoot.getSelection()
      const selectedTextString = selectedText.toString()

      const PopupCardContainer = container.getElementsByClassName('container')[0]
      const messagesBox = container.getElementsByClassName('messages')[0]

      // console.log(event);
      // console.log(selectedText);
      // console.log(messagesBox?.contains(selectedText.baseNode.parentNode as Node));

      let isInMessages = false
      if (messagesBox === selectedText.baseNode.parentNode || messagesBox?.contains(selectedText.baseNode.parentNode as Node)) {
        //在 messages 容器内操作，则显示操作按钮
        isInMessages = true
      }

      if (PopupCardContainer && selectedTextString.length > 0 && isInMessages) {

        let ankiSpaceButtonBox = document.createElement('div');
        ankiSpaceButtonBox.className = 'ankiSpaceButtonBox'

        // 按钮：新增填空
        let setAnkiSpaceButton = document.createElement('div');
        setAnkiSpaceButton.textContent = '[...]'
        setAnkiSpaceButton.className = 'setAnkiSpaceButton'
        // 按钮：新增填空，并新增 1 个单独的卡片
        let newAnkiSpaceButton = document.createElement('div');
        newAnkiSpaceButton.textContent = '[...]+'
        newAnkiSpaceButton.className = 'setAnkiSpaceButton'

        //设置按钮的位置

        const selectedTextX = selectedText.getRangeAt(0).getBoundingClientRect().x
        const selectedTextY = selectedText.getRangeAt(0).getBoundingClientRect().y

        const selectedTextWidth = selectedText.getRangeAt(0).getBoundingClientRect().width
        const selectedTextHeight = selectedText.getRangeAt(0).getBoundingClientRect().height


        ankiSpaceButtonBox.appendChild(setAnkiSpaceButton)
        ankiSpaceButtonBox.appendChild(newAnkiSpaceButton)
        PopupCardContainer.appendChild(ankiSpaceButtonBox)

        const buttonX = ankiSpaceButtonBox.getBoundingClientRect().x
        const buttonY = ankiSpaceButtonBox.getBoundingClientRect().y


        ankiSpaceButtonBox.style.position = 'relative'
        ankiSpaceButtonBox.style.left = (selectedTextX - buttonX + selectedTextWidth - 40).toString() + 'px'
        ankiSpaceButtonBox.style.top = (selectedTextY - buttonY - selectedTextHeight - 20).toString() + 'px'


        let range = selectedText.getRangeAt(0);

        // 新增填空
        setAnkiSpaceButton.addEventListener('click', (event) => {

          setAnkiSpace(range, selectedTextString, event, false)
          ankiSpaceButtonBox.parentNode?.removeChild(ankiSpaceButtonBox)
        });

        // 新增填空，并新增 1 个单独的卡片
        newAnkiSpaceButton.addEventListener('click', (event) => {

          setAnkiSpace(range, selectedTextString, event, true)
          ankiSpaceButtonBox.parentNode?.removeChild(ankiSpaceButtonBox)
        });

      }



      // 


    }

  }
}

const getSelection = () => {

  const selection = window.getSelection();

  if (selection !== null) {

    // 当前选中的文字
    let keyWord = selection.toString().trim()

    // 选中文字所在的段落
    let sentence = selection.anchorNode?.textContent ?? ''

    if (sentence === undefined) {
      sentence = ''
    } else {
      sentence = sentence.length <= keyWord.length ? (selection.anchorNode?.parentNode?.parentNode as HTMLElement)?.innerText ?? '' : sentence
    }

    return { 'selection': selection, 'keyWord': keyWord, 'sentence': sentence }

  } else {
    return null
  }

}

const setAnkiSpace = (range: Range, selectedText: string, event: Event, isAddNew: boolean) => {


  let span = document.createElement('span');
  const ankiSpace = container.getElementsByClassName('ankiSpace')

  // 获取当前最大的 index
  let maxIndex = 0
  for (let i = 0; i < ankiSpace.length; i++) {
    const thisIndex = Number(ankiSpace[i].getAttribute('data-index'))
    if (thisIndex > maxIndex) {
      maxIndex = thisIndex
    }
  }

  let number = maxIndex === 0 ? 1 : maxIndex

  if (isAddNew) {
    number = maxIndex + 1
  }

  span.textContent = '{{c' + number + '::' + selectedText + '}}';
  span.className = 'ankiSpace'
  span.setAttribute('data-index', number.toString())

  span.onclick = function () {


    // 恢复为默认样式
    // span.innerText
    if (span.textContent) {

      // let oldText = span.textContent
      // oldText = oldText.replace('{{c1::', '')
      // oldText = oldText.replace('}}', '')

      var textNode = document.createTextNode(selectedText);
      span.parentNode?.replaceChild(textNode, span);
    }

  };

  range?.deleteContents();
  range?.insertNode(span);

}