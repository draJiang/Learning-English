import browser from 'webextension-polyfill'

import React, { useEffect, useState, useRef, createContext, useContext } from "react";
// import ReactDOM from "react-dom";

// import ReactMarkdown from 'react-markdown'
// import breaks from 'remark-breaks';
// import rehypeParse from 'rehype-parse'
// import rehypeRaw from 'rehype-raw'
// import remarkGfm from 'remark-gfm'

import { getUserInfo } from '../util'
import { userInfoType, langType } from '../types'


import { setDonotClosePopupCard } from '../contentScript'

import { Nav } from "../Components/Nav"
import { CustomPromptForm } from "../Components/CustomPromptForm"

import { Images } from "../Components/Images"
import { MessagesList } from "./Message"
import { PromptList } from "./PromptList"
import Notice from '../Components/Notice';
import { RegenerateButton } from "./RegenerateButton"
import { UserMessageInput } from "./UserMessageInput"
import { Selection } from "./Selection"
import { ErroTips } from "./ErroTips"

import { Skeleton, Input, message, ConfigProvider, theme, Result, Select, Drawer, Space, Form, Button } from 'antd';
import { SendOutlined, LoadingOutlined } from '@ant-design/icons';


import { useCurrentLanguage } from '../lib/locale'
import { useUserInfoContext } from '../lib/userInfo'
import { lang } from '../lib/lang';

import { windowInitialization, getDefaultPrompt, getUnsplashImages, handleHightlight, handlePromptVariables, getAnkiCards } from './util'

import { PromptType, ChatMessage, ImageType, runPromptType } from "../types"

import styled, { css } from 'styled-components';


let currentLanguage: string
let targetLanguage: string

// 获取 Anki 卡片，用于编写故事
let ankiCards: Array<{}>
getAnkiCards().then((cards: any) => {
  ankiCards = cards
}).catch((error) => {
  // console.log(error);

})

// 初始化 Anki 的 Model，为后续导入到 Anki 提速

const { TextArea } = Input;

// const AnkiContext = createContext(null);

const ScouterDiv = styled.div`

left:10;
top:10;

font-family: sans-serif;
width: 390px;
height: 560px;
color: rgb(0 0 0 / 80%);
position: fixed;
display: flex;
flex-direction: column;
font-size: 13.2px;
background-color: #fff;
z-index: 9999;
overflow: hidden;
box-shadow: 0px 8px 28px rgba(0,0,0,.16);
border-radius: 6px;
border:1px solid rgba(5, 5, 5, .06)

h1,h2,h2{
  font-weight: bold;
}

h1 {
  font-size:20px;
}

h2 {
  font-size:17px;
}

`;


export function PopupCard(props: any) {


  // const [messages, setMessages] = useState<Array<{ content: string, role: string, loading: boolean, chatId: string, prompt: string, status: string }>>([{ 'content': '', 'role': 'user', 'loading': false, 'chatId': '', 'prompt': '', 'status': '' }])
  const [messages, setMessages] = useState<Array<ChatMessage>>([{
    'content': [{
      'status': 'begin',
      'chatId': '',
      'content': ''
    }],
    'role': 'user',
    'prompt': '',
    'showImagesBox': true,
    'images': []
  }])

  const [prompts, setPrompts] = useState<Array<PromptType>>([]);
  const [lastExecutedPrompt, setLastExecutedPrompt] = useState<PromptType>({ 'title': '👉🏼 Please choose a prompt', 'getUnsplashImages': false, 'userPrompt': '', 'id': '' })

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  // 表示 GPT 生成的文字数据正在加载中
  // const [isLoading, setIsLoading] = useState(true);

  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [customPromptFormData, setCustomPromptFormData] = useState<PromptType>({ 'title': '', 'getUnsplashImages': false, 'userPrompt': '', 'id': '' });

  // standby,normal,loading,success
  const [addToAnkiStatus, setAddToAnkiStatus] = useState<{ status: string, noteId: number }>({ 'status': 'normal', 'noteId': 0 });


  // const [isAnswerDone, setAnswerDone] = useState(false);

  const [followUpData, setFollowUpData] = useState({ keyWord: '', sentence: '' });
  const [showFollowUpDataMenu, setShowFollowUpDataMenu] = useState({ show: false, style: {} })

  const [isApiErro, setIsApiErro] = useState(false);

  // const [isAnswerInputed, setIsAnswerInputed] = useState(false);

  // 窗口拖拽逻辑
  const [dragging, setDragging] = useState(false);

  const windowElement = useRef<HTMLDivElement>(null);
  const messagesList = useRef<HTMLDivElement>(null);

  const shouldStayAtBottomRef = useRef(false);
  // const userInfoRef = useRef();

  const lastPromptRef = useRef<Array<{ role: string, content: string }>>();

  const [form] = Form.useForm();


  // 使用长连接
  let port = browser.runtime.connect({
    name: 'getGPT'
  })

  const userInfo: { user: userInfoType, anki: any } | null = useUserInfoContext()

  let Lang = useCurrentLanguage()!
  currentLanguage = Lang['current']['name']
  targetLanguage = Lang['target']['name']


  // const userInfo = useUserInfoContext()

  // 控制追问菜单
  useEffect(() => {

    const port = browser.runtime.connect({
      name: 'fromPopupCard'
    })

    port.onMessage.addListener((msg) => {

      if (msg.type === "UPDATE_POPUP_CARD") {
        // 显示 Prompt 菜单
        setFollowUpData(msg.payload.followUpData)

        //设置菜单的位置

        setShowFollowUpDataMenu(prev => {

          const newData = {
            show: true,
            style: msg.payload.style
          };

          return newData

        })

      }
    });

    windowElement.current?.addEventListener("click", handlePopupCardClick);
    return () => {
      // console.log('useEffect return');
      windowElement.current?.removeEventListener("click", handlePopupCardClick);

    };


    function handlePopupCardClick() {

      setTimeout(() => {

        if (showFollowUpDataMenu.show) {

          setShowFollowUpDataMenu(prev => {

            const newData = {
              style: {},
              show: false,
            };

            return newData

          })

        }


      }, 10);

    }

  }, [showFollowUpDataMenu]);


  useEffect(() => {


    // 渲染 Prompt 列表
    initializePromptList()


    if (props.runPrompt || props.runPrompt === undefined) {


      // 获取最近一次执行的 Prompt
      browser.storage.local.get({ "lastExecutedPrompt": '' }).then((item) => {


        if (item.lastExecutedPrompt === '') {

          // 执行默认 Prompt、获取 Unsplash 图片
          const pormpt = getDefaultPrompt(props.data.keyWord)
          executivePrompt(pormpt)

        } else {
          // 执行 Prompt、获取 Unsplash 图片
          if (item.lastExecutedPrompt.id === "Default") {
            const pormpt = getDefaultPrompt(props.data.keyWord)
            executivePrompt(pormpt)
          } else {
            executivePrompt(item.lastExecutedPrompt)
          }




        }



      })


    } else {

      // 不执行任何 Prompt，由用户自行选择

      executivePrompt({ 'title': 'Default', 'getUnsplashImages': true, 'userPrompt': `Word:"{{keyWord}}", sentence: "{{sentence}}"`, 'id': 'Default' }, 'no')
      setIsOpenMenu(true)


    }


    // 设置窗口的默认位置、添加滚动事件，让消息列表自动滚动到底部
    windowInitialization({ 'isPin': props.isPin, 'windowElement': windowElement, 'selection': props.selection, 'messagesList': messagesList })


  }, [props.data.keyWord]);

  // 聊天记录改变时
  useEffect(() => {

    // 记录当前列表的位置
    if (windowElement.current) {
      const container = windowElement.current.querySelectorAll('.container')[0]
      shouldStayAtBottomRef.current = container.scrollHeight - container.scrollTop <= container.clientHeight + 20;

      const contentLength = messages.length > 0 ? messages[messages.length - 1].content.length : 0

      // 自动滚动到消息底部，方便看到最新的文字
      if (messages.length > 1) {

        if (messages[messages.length - 1].content[contentLength - 1].status === 'process' || messages[messages.length - 1].content[contentLength - 1].status === 'begin') {
          scrollToBottom(true)
        } else {
          scrollToBottom(shouldStayAtBottomRef.current)
        }

      }

      // return () => {
      //   if (container !== null) {
      //     container.removeEventListener('scroll', checkIfShouldStayAtBottom);
      //   }
      // }

    }


    // 保存历史记录，只保留消息记录的第 1 条，如果这条消失是错误提示，则不保存
    if (messages.length === 1 && messages[0]['content'][0]['status'] === 'done') {

      // console.log('Save');

      const keyWord = props.data.keyWord
      const Sentence = props.data.Sentence

      // 将查询记录保存起来
      const newHistory = {
        'keyWord': keyWord,
        'sentence': Sentence,
        'role': messages[0]['role'],
        'answer': messages[0]['content'][messages[0]['content'].length - 1]['content'],
        'source': window.location.href,
        'prompt': messages[0]['prompt'],
        'images': messages[0]['images']
      }


      if (keyWord !== '' && Sentence !== '' && messages[0]['content'][0]['content'] !== '') {
        browser.storage.local.get({ "history": [] }).then((item) => {

          // console.log(item.history);

          let newHistoryList: any = []
          let bingo = false
          newHistoryList.push(newHistory)
          if (Array.isArray(item.history)) {

            // 如果记录已存在，则不重复保存
            for (let i = 0; i < item.history.length; i++) {

              let obj = item.history[i]


              if (obj.keyWord === newHistory['keyWord'] && obj.sentence === newHistory['sentence'] && obj.prompt === newHistory['prompt']) {

                bingo = true
                break

              }

            }

            newHistoryList = item.history
            newHistoryList.unshift(newHistory)
            newHistoryList.splice(8)

            // console.log(newHistoryList);

          }

          if (!bingo) {
            browser.storage.local.set(
              {
                history: newHistoryList
              }
            )
          }

        })
      }

    }


  }, [messages])

  // 窗口拖拽时触发
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      // console.log('useEffect return');
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);


  const executivePrompt = async (prompt: PromptType,
    runPrompt?: runPromptType,
    imageToRerender?: boolean,
    data?: { keyWord: string, sentence: string }) => {

    // 设置加载状态
    // setIsLoading(true)

    let needToRunPrompt = runPrompt
    if (needToRunPrompt === undefined) {
      needToRunPrompt = 'yes'
    }

    let needToRerenderImage = imageToRerender
    if (needToRerenderImage === undefined) {
      needToRerenderImage = true
    }

    let keyWord = props.data.keyWord
    let Sentence = props.data.Sentence

    if (data !== undefined) {
      keyWord = data.keyWord
      Sentence = data.sentence
    } else {
      // 初始化
      setMessages([])   // 对话列表
    }


    if (needToRunPrompt !== 'no') {


      let showImagesBox = true

      if (prompt.getUnsplashImages && needToRunPrompt) {
        // 如果当前 Prompt 需要显示图片，且当前需要立即执行 Prompt
        showImagesBox = true

      } else {

        showImagesBox = false

      }

      // amplitude.track('executivePrompt');
      browser.runtime.sendMessage({ 'type': 'amplitudeTrack', 'name': 'executivePrompt' })


      if (needToRunPrompt === 'regenerate') {
        // 当前 Prompt 类型是重新生成

        // 在消息历史中插入新记录
        setMessages(prevMessages => {


          let newMessages = [...prevMessages]
          newMessages[newMessages.length - 1].content.push({
            'chatId': '',
            'content': '',
            'status': 'begin'
          })

          return newMessages

        })

      } else {
        // 在消息历史中插入新记录
        setMessages(prevMessages => [...prevMessages,
        {
          'content': [{
            'chatId': '',
            'content': '',
            'status': 'begin'
          }],
          'role': 'assistant',
          // 'loading': true,
          'chatId': '', 'prompt': '',
          'status': 'begin',
          'showImagesBox': showImagesBox, 'images': []
        }])
      }



      // 非追问时，才会记录最近执行的 Prompt
      if (data === undefined) {

        // 设置最近执行的 Prompt
        setLastExecutedPrompt(prompt)

        // 记录最近 1 次使用的 Prompt，用于下次启动窗口时默认执行此 Prompt
        browser.storage.local.set(
          {
            lastExecutedPrompt: prompt
          }
        )
      }






      let newPrompt: Array<{ role: string, content: string }>;
      let p = prompt.userPrompt
      // 处理 Prompt 中的变量
      p = await handlePromptVariables(p, keyWord, Sentence, Lang)
      newPrompt = [{ 'role': 'user', 'content': p }]

      // 如果历史记录中存在记录，则不重复请求 API，直接显示历史记录的信息
      const result = await browser.storage.local.get({ "history": [] }).then((item) => {
        // console.log(item);

        // 如果记录已存在，则不重复保存
        let bingo = false
        let updatedLastMessage: ChatMessage | undefined
        for (let i = 0; i < item.history.length; i++) {
          let obj = item.history[i]
          if (obj.keyWord === keyWord && obj.sentence === Sentence && obj.prompt === newPrompt[0]['content']) {

            if ('role' in obj) {

            } else {
              // 旧版本中因为没有存储 role ，直接显示历史数据时会导致后续流程异常
              bingo = false
              break
            }

            bingo = true

            // 直接显示历史记录中的回答
            updatedLastMessage = {
              ...messages[messages.length - 1],
              role: obj.role,
              content: [{

                'chatId': Date.now().toString(),
                'content': obj.answer,
                'status': 'done'

              }],
              prompt: newPrompt[0]['content'],
              images: obj.images
            };

            break
          }
        }

        return { bingo: bingo, updatedLastMessage: updatedLastMessage }

      })

      if (result.bingo) {
        //显示历史记录
        setMessages([result.updatedLastMessage!])

        setAddToAnkiStatus({ 'status': 'normal', 'noteId': 0 })

        lastPromptRef.current = newPrompt

      } else {


        // 请求 AI 数据
        getGPTMsg(newPrompt, keyWord)

        // 请求图片
        if (prompt.id == 'Default') {

          if (keyWord.length <= 20 && prompt.getUnsplashImages && needToRerenderImage) {
            // 获取图片数据
            getUnsplashImages(keyWord).then((imgs: any) => {
              // setImages(imgs)

              // 保存图片数据
              setMessages(prevMessages => {

                const lastMessage = prevMessages[prevMessages.length - 1];

                if (prevMessages.length === 0) {
                  return []
                }

                const updatedLastMessage = {
                  ...lastMessage,
                  needToShowImg: true,
                  images: imgs
                };

                return [...prevMessages.slice(0, prevMessages.length - 1), updatedLastMessage];

              })

            })

          }

        } else {

          if (prompt.getUnsplashImages && needToRerenderImage) {
            // 获取图片数据
            getUnsplashImages(keyWord).then((imgs: any) => {
              // setImages(imgs)

              // 保存图片数据
              setMessages(prevMessages => {

                const lastMessage = prevMessages[prevMessages.length - 1];

                if (prevMessages.length === 0) {
                  return []
                }

                const updatedLastMessage = {
                  ...lastMessage,
                  needToShowImg: true,
                  images: imgs
                };

                return [...prevMessages.slice(0, prevMessages.length - 1), updatedLastMessage];

              })

            })

          }

        }

      }



    } else {
      setLastExecutedPrompt({ 'title': '', 'getUnsplashImages': false, 'userPrompt': '', 'id': '' })
      // setAnswerDone(true)
      // setIsLoading(false)

      // 数据埋点
      // amplitude.track('openPopupCard');
      browser.runtime.sendMessage({ 'type': 'amplitudeTrack', 'name': 'openPopupCard' })

    }

  }

  const handleRegenerateButtonClick = () => {

    // 在消息历史中插入新记录
    setMessages(prevMessages => {


      let newMessages = [...prevMessages]
      newMessages[newMessages.length - 1].content.push({
        chatId: Date.now().toString(),
        content: '',
        status: 'begin',
      })

      // begin 状态才会显示加载动画
      const content = newMessages[newMessages.length - 1].content
      newMessages[newMessages.length - 1].content[content.length - 1].status = 'begin'

      return newMessages

    })

    getGPTMsg(lastPromptRef.current!, props.data.keyWord)

  }

  const initializePromptList = async () => {
    // 获取已保存的 Prompt List
    const promptList = await browser.storage.sync.get({ "promptList": [] }).then((item) => {
      return item.promptList
    })

    setPrompts(promptList)

  }

  const handlePromptEdited = async (isNew: boolean) => {
    // 初始化 Prompt 列表
    initializePromptList()

    // 更新最近使用的 Prompt（针对编辑的场景）
    if (!isNew) {
      browser.storage.sync.get({ "promptList": [] }).then((item) => {

        for (let i = 0; i < item.promptList.length; i++) {
          if (item.promptList[i].id === lastExecutedPrompt.id) {
            // 更新
            setLastExecutedPrompt(item.promptList[i])

            // 记录最近 1 次使用的 Prompt
            browser.storage.local.set(
              {
                lastExecutedPrompt: item.promptList[i]
              }
            )
            break
          }
        }

      })
    }


    // amplitude.track('handlePromptEdited');
    browser.runtime.sendMessage({ 'type': 'amplitudeTrack', 'name': 'handlePromptEdited' })


  }

  // 请求 GPT 数据
  const getGPTMsg = async (prompt: Array<{ role: string, content: string }>, keyWord?: string) => {

    // // 使用长连接
    // let port = browser.runtime.connect({
    //   name: 'fromPopupCard'
    // })

    // 记录最近执行的 Prompt，用于重新生成
    lastPromptRef.current = prompt

    const thisKeyWord = keyWord || '';


    // 禁用保存到 Anki 按钮
    setAddToAnkiStatus({ 'status': 'standby', 'noteId': 0 })


    setTimeout(() => {
      // 使用 postMs 发送信息
      port.postMessage({ 'type': 'getGPTMsg', 'messages': prompt, 'keyWord': thisKeyWord })
    }, 20);


    // 接收信息
    port.onMessage.addListener((msg: any) => {

      // console.log('port.onMessage.addListener');

      if (msg.type === 'sendGPTData') {
        // 请求 GPT 数据失败
        if (msg.status === 'erro') {

          // type === 'as2' ? setopenApiAnser2(msg.content) : setopenApiAnser(msg.content)
          // setIsLoading(false)
          setAddToAnkiStatus({ 'status': 'normal', 'noteId': 0 })

          let newContentList = [...messages[messages.length - 1].content]

          if (msg.code === 'invalid_api_key') {
            // setIsApiErro(true)
            newContentList[newContentList.length - 1].content = msg.content + '\
            After that, you need to set the correct Open API Key in the Scouter:'
            newContentList[newContentList.length - 1].status = 'invalid_api_key'
          }

          console.log(newContentList);


          setMessages(prevMessages => {

            const lastMessage = prevMessages[prevMessages.length - 1];
            // const newMsgList = lastMessage
            const updatedLastMessage: ChatMessage = {
              ...lastMessage,
              content: newContentList,
              prompt: prompt[0]['content'],
              // images: []
            };
            // const newMsgList = [...prevMessages.slice(0, prevMessages.length - 1), lastMessage]
            return [...prevMessages.slice(0, prevMessages.length - 1), updatedLastMessage];

          })

          // setAnswerDone(true)

        } else if (isApiErro) {
          // setIsApiErro(false)
        }

        // 请求 GPT 数据成功且数据流开始传输
        if (msg.status === 'begin') {


        }

        // 请求 GPT 数据成功且数据流传输中
        if (msg.status === 'process') {

          try {

            // 渲染数据
            setMessages(prevMessages => {

              const newMessages = [...prevMessages]
              const lastMessage = newMessages[newMessages.length - 1];

              // 深度拷贝
              let contentList = JSON.parse(JSON.stringify(lastMessage.content));

              let newContent = contentList[contentList.length - 1]['content'] + msg.content
              newContent = handleHightlight(newContent, props.data.keyWord, ankiCards, windowElement?.current)

              contentList[contentList.length - 1]['content'] = newContent
              contentList[contentList.length - 1]['status'] = 'process'

              const newContentList = [...contentList]

              const updatedLastMessage: ChatMessage = {
                ...lastMessage,
                content: newContentList,
                prompt: prompt[0]['content']
              };

              return [...prevMessages.slice(0, prevMessages.length - 1), updatedLastMessage];


            })

          } catch (error) {

          }


        }


        // 请求 GPT 数据成功且数据流结束传输
        if (msg.status === 'end') {

          // 记录消息回答完毕（触发保存历史记录）

          // setAnswerDone(true)
          // setIsLoading(false)

          setAddToAnkiStatus({ 'status': 'normal', 'noteId': 0 })

          setMessages(prevMessages => {

            const lastMessage = prevMessages[prevMessages.length - 1];

            if (prevMessages.length === 0) {
              return []
            }
            const lastContentList = lastMessage.content
            const updatedLastMessage: ChatMessage = {
              ...lastMessage,
              // loading: false,
              content: [...lastContentList.slice(0, lastContentList.length - 1), { ...lastContentList[lastContentList.length - 1], status: 'done' }]
            };

            return [...prevMessages.slice(0, prevMessages.length - 1), updatedLastMessage];

          })


        }


      }

    })

  };

  // 用户发送消息
  const handleSendMessage = (values: string) => {

    // console.log(values);
    let prompt = values

    // // 清空文本框
    // form.resetFields();

    // 定位到底部
    scrollToBottom(true)

    // 将用户发言发送到消息记录中
    setMessages(prevMessages => {

      const updatedLastMessage: ChatMessage = {
        role: 'user',
        content: [
          {
            chatId: Date.now().toString(),
            content: values,
            status: 'done',
          }
        ],
        prompt: prompt,
        showImagesBox: false, // 用户发言不需要显示图片
        images: []
      };

      return [...prevMessages, updatedLastMessage];

    });

    // 在消息历史中插入新 GPT 消息
    setMessages(prevMessages => [...prevMessages, {
      content: [{
        chatId: '',
        content: '',
        status: 'begin',
      }],
      role: 'assistant',
      prompt: '',
      showImagesBox: false,
      images: []
    }])

    const msgHistory = messages.slice(-5).map((item) => { return { 'role': item.role, 'content': item.content[item.content.length - 1]['content'] } })

    getGPTMsg([...msgHistory, { "role": "user", "content": values }])

    // amplitude.track('handleSendMessage');
    browser.runtime.sendMessage({ 'type': 'amplitudeTrack', 'name': 'handleSendMessage' })

  }

  const handleMouseDown = (event: any) => {
    // console.log('PopupCard:handleMouseDown');
    setDragging(true);

    if (windowElement.current) {
      const rect = windowElement.current.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      windowElement.current.dataset.offsetX = String(offsetX);
      windowElement.current.dataset.offsetY = String(offsetY);
    }

    // setOffset({ x: event.clientX - position.x, y: event.clientY - position.y });
  };

  const handleMouseMove = (event: any) => {
    // // console.log('PopupCard:handleMouseMove');
    // // console.log(dragging);


    if (dragging && windowElement.current) {

      // Use requestAnimationFrame to throttle the mousemove event handling
      // 鼠标相对窗口左上角的偏移
      const offsetX = parseFloat(windowElement.current.dataset.offsetX || '');
      const offsetY = parseFloat(windowElement.current.dataset.offsetY || '');

      const newX = event.clientX - offsetX
      const newY = event.clientY - offsetY

      // Check the boundaries
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const elementWidth = windowElement.current.clientWidth;
      const elementHeight = windowElement.current.clientHeight;

      const minX = - elementWidth / 2;
      const minY = 0;
      const maxX = windowWidth - elementWidth + elementWidth / 2;
      const maxY = windowHeight - elementHeight + elementHeight / 1.5;

      const clampedX = Math.max(minX, Math.min(newX, maxX));
      const clampedY = Math.max(minY, Math.min(newY, maxY));

      // Only update the position if it's within the boundaries
      // newX >= minX && newX <= maxX && newY >= minY && newY <= maxY
      if (true) {
        // setPosition({ x: clampedX, y: clampedY });
        windowElement.current.style.left = `${clampedX}px`;
        windowElement.current.style.top = `${clampedY}px`;

      } else {
        // 元素到达边界
        // const rect = windowElement.current.getBoundingClientRect();
        // const offsetX = event.clientX - rect.left;
        // const offsetY = event.clientY - rect.top;
        // windowElement.current.dataset.offsetX = String(offsetX);
        // windowElement.current.dataset.offsetY = String(offsetY);
      }

    }


  };

  const handleMouseUp = () => {
    // // console.log('PopupCard:handleMouseUp');
    setDragging(false);
  };

  // 添加到 Anki
  const addToAnki = (deckName: string, modelName: string, front: string, back: string) => {

    const keyWord = props.data.keyWord
    const Sentence = props.data.Sentence

    let container = ''
    let images = ''
    let unsplash_download_location
    let stc = keyWord.length <= 20 ? Sentence : ''
    // 在语境句子中将关键字突出显示
    stc = stc.replace(new RegExp(keyWord, 'g'), '<span class="keyWord">' + keyWord + '</span>');

    let ScouterSelection = ''


    if (windowElement.current) {
      // 选中的文字
      ScouterSelection = windowElement.current?.querySelector('#ScouterSelection')?.getElementsByTagName('span')[0].innerHTML!

      // console.log(windowElement.current);
      container = windowElement.current.innerHTML
      container = windowElement.current.getElementsByClassName('messages')[0].innerHTML

      // 处理 container 的内容
      let parser = new DOMParser();
      let doc = parser.parseFromString(container, 'text/html');
      let elementsToRemove = doc.querySelectorAll('.imageQueue');
      let imageSource = doc.querySelectorAll('.imageSource');

      // 创建新的 img 标签


      // 设置图片的尺寸、样式
      if (doc.getElementsByClassName('imageBox').length > 0) {
        let img = doc.getElementsByClassName('imageBox')[0].getElementsByTagName('img')[0] as HTMLImageElement;
        img.width = 0

        const imgUrl = img.src;
        let newImg = document.createElement("img");
        newImg.src = imgUrl;

        // 获取要替换的 div
        let div = doc.getElementsByClassName('imageBox')[0];
        if (div) {
          // 使用新的 img 标签替换 div
          div.parentNode?.replaceChild(newImg, div);
        }


      } else {
        // 没有图片
        const imgs = doc.getElementsByClassName('images')[0]
        if (imgs) {
          imgs.parentNode?.removeChild(imgs)
        }

      }

      // 删除预加载的图片
      elementsToRemove.forEach(el => el.parentNode?.removeChild(el));

      // 删除图片来源信息
      imageSource.forEach(el => el.parentNode?.removeChild(el));


      container = doc.body.innerHTML;

      // 处理样式，避免 Anki 内显示异常
      container = container.replace(/style=/g, '');


      if (windowElement.current.getElementsByClassName('imageBox')[0] !== undefined) {
        images = windowElement.current.getElementsByClassName('imageBox')[0].innerHTML
        // 获取 unsplashApi 的 download_location
        unsplash_download_location = windowElement.current.getElementsByClassName('images')[0].getElementsByTagName('img')[0].parentElement?.getAttribute('data-downloadlocation')
      }

      // console.log(images);

      // 处理样式，避免 Anki 内显示异常
      images = images.replace(/style=/gi, '');
      images = images.replace(/width/gi, '');

    }

    const cardStyle = ``

    // 请求 background 将数据保存到 Anki


    // 单词发音
    interface LangObject {
      [key: string]: langType;
    }
    const thisLang: LangObject = lang

    let audioUrl: string = 'http://dict.youdao.com/dictvoice?type=0&audio='
    let audio: [] | [{}], filename
    try {
      audioUrl = thisLang[Lang['target']['id']]['audioURL']
      filename = keyWord.length >= 10 ? keyWord.substring(0, 10) : keyWord

      audio = [{
        "url": audioUrl + keyWord,
        "filename": "Scouter_" + filename + ".mp3",
        "fields": [
          "Front"
        ]
      }]

    } catch (error) {
      audio = []
    }

    // 常规类型
    let ankiBack = '<p> <blockquote>' + stc + ' —— <a href="' + window.location.href + '">Source</a></blockquote></p>' + container
    if (keyWord.length > 20) {
      // 如果选中的符号长度大于 20（说明是句子）则不显示上下文句子，然后将来源链接放到尾部
      ankiBack = container + '<p><a href="' + window.location.href + '">Source</a></p>'
    }


    let p = {
      "note": {
        "deckName": deckName,
        "modelName": modelName,
        "fields": {
          [front]: keyWord,
          [back]: cardStyle + ankiBack
        },
        "audio": audio,
        "tags": [
          "Scouter"
        ]
      }
    }

    // 完形填空类型
    if (ScouterSelection.indexOf('class="ankiSpace"') >= 0 || container.indexOf('class="ankiSpace"') >= 0 || container.indexOf('{{c') >= 0) {

      let newFront: string

      newFront = '<p>' + ScouterSelection + '</p>' + '<blockquote>' + stc + ' —— <a href="' + window.location.href + '">Source</a></blockquote>' + container

      if (keyWord.length > 20) {
        // 如果选中的符号长度大于 20（说明是句子）则不显示上下文句子，然后将来源链接放到尾部
        newFront = '<p>' + ScouterSelection + '</p>' + container + '<p> <a href="' + window.location.href + '">Source</a></p>'
      }

      p = {
        "note": {
          "deckName": deckName,
          "modelName": modelName,
          "fields": {
            [front]: newFront,
            [back]: ''
          },
          "audio": [],
          "tags": [
            "Scouter"
          ]
        }
      }

    }


    // 发送消息给 background
    let sending = browser.runtime.sendMessage({ 'type': 'addNote', 'messages': { 'anki_arguments': p, 'anki_action_type': 'addNote', 'unsplash_download_location': unsplash_download_location }, })
    sending.then(handleResponse, handleError);

    // 数据埋点
    // amplitude.track('addToAnki');
    browser.runtime.sendMessage({ 'type': 'amplitudeTrack', 'name': 'addToAnki' })

  }

  // 点击保存到 Anki
  const handleSaveToAnkiBtnClick = () => {

    // 根据是否为完形填空申请不同的卡片模板
    const container = windowElement.current?.getElementsByClassName('messages')[0].innerHTML!
    const selectionText = windowElement.current?.querySelector('#ScouterSelection')?.getElementsByTagName('span')[0].innerHTML!
    let isAnkiSpace = false
    if (container || selectionText) {
      if (container.indexOf('class="ankiSpace"') >= 0 || container.indexOf('{{c') >= 0 || selectionText.indexOf('class="ankiSpace') >= 0) {
        isAnkiSpace = true
      }
    }

    setAddToAnkiStatus({ 'status': 'loading', 'noteId': 0 })

    function setAnkiInfo(models: []) {

      let defaultDeckName: string = '', modelName: string = '', field1: string = '', field2: string = ''

      models.forEach((model: any) => {

        if (model.isAnkiSpace === isAnkiSpace) {
          defaultDeckName = model.defaultDeckName
          modelName = model.modelName
          field1 = model.field1
          field2 = model.field2
        }



      });

      return {
        'defaultDeckName': defaultDeckName,
        'modelName': modelName,
        'field1': field1,
        'field2': field2
      }

    }

    if (userInfo?.anki) {

      const ankiInfo = setAnkiInfo(userInfo?.anki)

      // 添加到 Anki 中
      addToAnki(ankiInfo.defaultDeckName!, ankiInfo.modelName!, ankiInfo.field1!, ankiInfo.field2!)

    } else {

      // 获取 Anki 牌组信息
      browser.runtime.sendMessage({ 'type': 'setModel', 'messages': {}, }).then((result) => {

        if (result.result === 'success') {

          const ankiInfo = setAnkiInfo(result.data)

          // 添加到 Anki 中
          addToAnki(ankiInfo.defaultDeckName!, ankiInfo.modelName!, ankiInfo.field1!, ankiInfo.field2!)


        } else {

          // 反馈错误信息
          alert(result.error.error)
          setAddToAnkiStatus({ 'status': 'normal', 'noteId': 0 })

        }



      })


    }

  }

  // 接收 background 的回复
  function handleResponse(message: any) {

    // console.log(message);

    if (message.error === null) {

      setAddToAnkiStatus({ 'status': 'success', 'noteId': message.data })

    } else {
      alert(message.error)
      setAddToAnkiStatus({ 'status': 'normal', 'noteId': 0 })
    }

  }

  function handleError(erro: any) {
    setAddToAnkiStatus({ 'status': 'normal', 'noteId': 0 })
    // console.log(erro);
  }

  // GPT 生成消息时，自动定位到消息列表底部，方便用户阅读
  function scrollToBottom(canSroll: boolean = false) {

    if (windowElement.current !== null) {
      const container = windowElement.current.querySelectorAll('.container')[0]

      if (canSroll) {
        // 位于底部，需要自动滚动

        container.scrollTop = container.scrollHeight + 20;

      }
    }


  }

  const openCustomPromptForm = (data: { isOpen: boolean, data: PromptType }) => {
    // 开启或关闭自定义 Prompt 表单
    setPopoverOpen(data.isOpen)
    // 设置表单的默认设置
    if (data.isOpen) {
      setCustomPromptFormData(data.data)
      // 开启表单
      // amplitude.track('openCustomPromptForm');
      browser.runtime.sendMessage({ 'type': 'amplitudeTrack', 'name': 'openCustomPromptForm' })
    }
    // 开启表单后禁止点击窗口外区域关闭窗口
    setDonotClosePopupCard(data.isOpen)

  }

  return (
    <>

      <ScouterDiv id="LearningEnglish2023"
        ref={windowElement}

        style={{
          left: 10,
          top: 10,
        }}
      >

        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#F08A24',
            },
          }}
        >

          <Nav handleSaveToAnkiBtnClick={handleSaveToAnkiBtnClick}
            addToAnkiStatus={addToAnkiStatus}
            onMouseDown={handleMouseDown}
            handleMenuItemClick={executivePrompt}
            openCustomPromptForm={openCustomPromptForm}
            isOpenMenu={isOpenMenu}
            prompts={prompts}
            lastExecutedPrompt={lastExecutedPrompt}
            keyWord={props.data.keyWord}
          />

          <div className='container flex-grow flex flex-col overflow-auto'
            style={{
              marginTop: '48px'
            }}
          >
            <div className='flex-grow'
              ref={messagesList}
              style={{}}
            >

              <Selection text={props.data.keyWord} />

              <MessagesList messages={messages} />

              <RegenerateButton messages={messages} handleRegenerateButtonClick={handleRegenerateButtonClick} />

              <div className='followUpMenuBox' style={{
                display: showFollowUpDataMenu.show ? 'block' : 'none',
                position: "relative",
                width: 'fit-content',
                height: '0'
              }}>

                <PromptList followUpData={followUpData} showFollowUpDataMenu={showFollowUpDataMenu}
                  promptList={prompts} handleMenuItemClick={executivePrompt} />

              </div>

            </div>
          </div>

          <UserMessageInput messages={messages} handleSendMessage={handleSendMessage} />

          <div>

            <Drawer
              title={customPromptFormData.id === '' ? "Create Prompt" : "Edit Prompt"}
              placement="bottom"
              closable={false}
              height={'100%'}
              // onClose={onClose}
              open={isPopoverOpen}
              getContainer={false}
              extra={
                <Space>
                  <Button style={{ zIndex: '9' }} onClick={() => openCustomPromptForm({ isOpen: false, data: { 'title': '', 'getUnsplashImages': false, 'userPrompt': '', 'id': '' } })}>Cancel</Button>
                </Space>
              }
            >
              <div style={{
                // backgroundColor: 'red',
                position: 'absolute',
                left: '0',
                top: '0',
                width: '100%',
                height: '64px',
                cursor: 'all-scroll'
              }}
                onMouseDown={handleMouseDown}
              ></div>

              <CustomPromptForm openCustomPromptForm={openCustomPromptForm} handlePromptEdited={handlePromptEdited} data={customPromptFormData} />

            </Drawer>

          </div>


        </ConfigProvider >

      </ScouterDiv >
    </>

  );
};