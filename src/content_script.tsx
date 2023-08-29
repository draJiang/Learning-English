import browser from 'webextension-polyfill'

import React, { useEffect, useRef, useState, createContext, useContext } from "react";
import ReactDOM from "react-dom";

import { PopupCard } from "./PopupCard"

import { StyleProvider } from '@ant-design/cssinjs';
import { StyleSheetManager } from 'styled-components';


import { fetchcurrentLanguage } from './lib/lang';
import { CurrentLanguageContext } from './lib/locale'
import { LetterCaseLowercaseIcon } from '@radix-ui/react-icons';

import { popupCardStyle } from './PopupCard/style'

import LOGO from './assets/icon128.png'

import styled from 'styled-components';

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
      const contextBox = container.getElementsByClassName('contextBox2')[0]

      if (contextBox) {
        // 点击的不是 setAnkiSpaceButton 时才隐藏
        if (contextBox !== event.target && !contextBox.contains(event.target as Node)) {
          contextBox.parentNode?.removeChild(contextBox)
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
          <StyleSheetManager target={shadowRoot}>

            <PopupCard data={data} selection={msg} runPrompt={runPrompt} isPin={isPin} />

          </StyleSheetManager>
        </StyleProvider>
      </CurrentLanguageContext.Provider>

    </React.StrictMode >,
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
      const sentence = ''

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
      
      console.log(container.querySelector('.contextBox2'));
      console.log(!container.querySelector('.contextBox2'));
      
      if (PopupCardContainer && selectedTextString.length > 0 && !container.querySelector('.contextBox2')) {

        let contextBox2 = document.createElement('div');
        contextBox2.className = 'contextBox2'
        contextBox2.style.position = 'relative'

        PopupCardContainer.appendChild(contextBox2)

        let range = selectedText.getRangeAt(0);
        ReactDOM.render(
          <StyleSheetManager target={shadowRoot}>
            <ToolBar selectedText={selectedText.getRangeAt(0).getBoundingClientRect()} selectedTextString={selectedTextString} range={range} />
          </StyleSheetManager>, contextBox2);

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

interface ToolBarProps {
  selectedText: any;
  range: any;
  selectedTextString: string;
}


const StyledButton = styled.button`
    
    width: 18px;
    height: 18px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

    &:hover {
      opacity: 0.8;
    }
`;

function ToolBar(props: ToolBarProps) {

  const [showMenu, setShowMenu] = useState(true)
  const ContextBox = useRef<HTMLDivElement>(null);

  useEffect(() => {



    const contextBox = ContextBox.current
    const popupCard = container.querySelector('#LearningEnglish2023')

    console.log('selectedText:');
    console.log(props.selectedText);

    //设置按钮的位置
    const selectedTextX = props.selectedText.x
    const selectedTextY = props.selectedText.y

    const selectedTextWidth = props.selectedText.width
    const selectedTextHeight = props.selectedText.height

    const buttonX = contextBox?.getBoundingClientRect().x || 0
    const buttonY = contextBox?.getBoundingClientRect().y || 0


    // 最大 X 值
    const maxX = (popupCard?.getBoundingClientRect().width || 0) - contextBox!.getBoundingClientRect().width - 10
    let left = selectedTextX - buttonX + selectedTextWidth - 40
    left = left > maxX ? maxX : left

    // contextBox2!.style.position = 'relative'
    // contextBox!.style.position = 'absolute'

    contextBox!.style.left = left.toString() + 'px'
    contextBox!.style.top = (selectedTextY - buttonY - 40).toString() + 'px'

    setShowMenu(true)

  }, [])


  const handleSetAnkiSpaceButtonClick = (event: any, isAddNew: boolean) => {
    setAnkiSpace(props.range, props.selectedTextString, event, isAddNew)

    console.log('ContextBox:');
    console.log(ContextBox);

    // ContextBox.current!.parentNode?.removeChild(ContextBox.current!)
    setShowMenu(false)
  }

  const handleFollowUpMenuClick = () => {

    console.log('ContextBox:');
    console.log(ContextBox);

    // ContextBox.current!.parentNode?.removeChild(ContextBox.current!)

    const PopupCardContainer = container.getElementsByClassName('container')[0]
    const messagesBox = container.querySelector('.messages')
    console.log('selectedText:');
    console.log(props.selectedText);

    const sentence = ''

    const selectedTextX = props.selectedText.x
    const selectedTextY = props.selectedText.y

    const selectedTextWidth = props.selectedText.width
    const selectedTextHeight = props.selectedText.height

    const followUpMenuBoxX = messagesBox?.getBoundingClientRect().x || 0
    const followUpMenuBoxY = (messagesBox?.getBoundingClientRect().y || 0) + (messagesBox?.getBoundingClientRect().height || 0)
    const followUpMenuBoxWidth = 140
    // const followUpMenuBoxHeight = followUpMenuBox?.getBoundingClientRect().height || 0
    console.log('PopupCardContainer?.getBoundingClientRect():');
    console.log(PopupCardContainer?.getBoundingClientRect());

    const maxX = (PopupCardContainer?.getBoundingClientRect().width || 0) - followUpMenuBoxWidth - 10
    // console.log(maxX);
    // console.log((messagesBox?.getBoundingClientRect().height || 0));
    // console.log(messagesBox?.getBoundingClientRect());
    // console.log(container.getElementsByClassName('followUpMenu')[0].getBoundingClientRect())
    const minY = ((PopupCardContainer?.getBoundingClientRect().y || 0) + (PopupCardContainer?.getBoundingClientRect().height || 0)) - ((messagesBox?.getBoundingClientRect().y || 0) + (messagesBox?.getBoundingClientRect().height || 0)) - 230

    let left = (selectedTextX - followUpMenuBoxX + selectedTextWidth - 40)
    let top = (selectedTextY - followUpMenuBoxY - selectedTextHeight - 40)

    // X 坐标的最大最小值
    left = left < 0 ? 0 : left
    left = left > maxX ? maxX : left

    // Y 坐标的最大值
    top = top > minY ? minY : top

    browser.runtime.sendMessage({
      type: 'UPDATE_POPUP_CARD', payload: {
        style: {
          left: left,
          top: top,
        }, followUpData: { keyWord: props.selectedTextString, sentence: sentence }
      }
    });

    setShowMenu(false)

  }

  return (
    <>
      {showMenu && <div ref={ContextBox}
        className='contextBox' style={{
          position: 'absolute'
        }}>
        <div className='ankiSpaceButtonBox'>
          <div className='setAnkiSpaceButton' onClick={() => handleSetAnkiSpaceButtonClick(event, false)}>[...]</div>
          <div className='setAnkiSpaceButton' onClick={() => handleSetAnkiSpaceButtonClick(event, true)}>[...]+</div>
        </div>
        <div>
          <StyledButton
            className='lookUpButton' style={{
              backgroundImage: `url(${LOGO})`,
            }}
            onClick={handleFollowUpMenuClick}
          ></StyledButton>
        </div>
      </div>
      }
    </>

  )
}