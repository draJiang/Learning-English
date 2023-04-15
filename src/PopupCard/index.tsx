import browser from 'webextension-polyfill'

import React, { useEffect, useState, useRef, useContext } from "react";
// import ReactDOM from "react-dom";
import ReactMarkdown from 'react-markdown'

import { Nav } from "../Components/Nav"

import { Selection } from "./Selection"
import { ErroTips } from "./ErroTips"

import { Divider, Skeleton, Input, ConfigProvider, theme, message, Result, Select, Form, Button, Card } from 'antd';
import { SendOutlined } from '@ant-design/icons';


import SettingGuide from "../assets/settingGuide.png"

import { useCurrentLanguage } from '../lib/locale'

import "./index.css"

let currentLanguage: string
let targetLanguage: string

export function PopupCard(props: any) {

  const [messages, setMessages] = useState<Array<{ content: string, role: string, loading: boolean }>>([])

  const [openApiAnser, setopenApiAnser] = useState('');
  const [openApiAnser2, setopenApiAnser2] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  // standby,normal,loading,success
  const [addToAnkiStatus, setAddToAnkiStatus] = useState<string>('standby');


  const [isAnswerDone1, setAnswerDone1] = useState(false);
  const [isUserAnswered, setIsUserAnswered] = useState(false);
  const [isAnswerDone2, setAnswerDone2] = useState(false);

  const [isErro, setIsErro] = useState(false);

  const [isAnswerInputed, setIsAnswerInputed] = useState(false);

  const [keyWord, setKeyWord] = useState('');
  const [sentence, setSentence] = useState('');

  const [inputValue, setInputValue] = useState('');

  // 窗口拖拽逻辑
  const [dragging, setDragging] = useState(false);
  // const [position, setPosition] = useState({ x: 10, y: 10 });
  // const [offset, setOffset] = useState({ x: 0, y: 0 });

  const windowElement = useRef<HTMLDivElement>(null);
  const messagesList = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  const [form] = Form.useForm();
  const answerValue = Form.useWatch('answer', form);

  // const [conversationList, setConversationList] = useState<{ type: string, isLoading: boolean, content: string }[]>([{ 'type': 'ai', 'isLoading': true, 'content': '' }]);

  let Lang = useCurrentLanguage()!

  currentLanguage = Lang['current']['name']
  targetLanguage = Lang['target']['name']


  useEffect(() => {

    // New Task
    // console.log('## PopupCard useEffect')

    // 当前选中的文字
    let keyWord = props.selection.toString()

    // 选中文字所在的段落
    let sentence = props.selection.anchorNode.data

    // 设置窗口的默认位置
    if (windowElement.current) {

      // Check the boundaries
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const elementWidth = windowElement.current.clientWidth;
      const elementHeight = windowElement.current.clientHeight;

      const minX = 0;
      const minY = 0;
      const maxX = windowWidth - elementWidth;
      const maxY = windowHeight - elementHeight;

      const newX = maxX - 20
      const newY = props.selection.anchorNode.parentElement.offsetTop + props.selection.anchorNode.parentElement.clientHeight + 20

      const clampedX = Math.max(minX, Math.min(newX, maxX));
      const clampedY = Math.max(minY, Math.min(newY, maxY));
      // console.log(props.selection.getRangeAt(0));

      windowElement.current.style.left = `${clampedX}px`;
      windowElement.current.style.top = `${clampedY}px`;
    }

    setKeyWord(keyWord)
    setSentence(sentence)

    // 设置加载状态
    // setIsLoading(true)

    console.log('Lang:');
    console.log(Lang);

    // 如果历史记录中存在记录，则不重复请求 API，直接显示历史记录的信息
    browser.storage.sync.get({ "history": [] }).then((item) => {
      console.log(item.history);

      // 如果记录已存在，则不重复保存
      let bingo = false
      for (let i = 0; i < item.history.length; i++) {
        let obj = item.history[i]
        if (obj.keyWord === keyWord && obj.sentence === sentence) {
          bingo = true
          // 直接显示历史记录中的回答
          setIsLoading(false)
          setopenApiAnser(obj.answer)
          setAnswerDone1(true)
          setAddToAnkiStatus('normal')
          break
        }
      }

      if (!bingo) {

        let systemPrompt = {
          "role": "system", "content": `As a language expert.
          - Please strictly adhere to the language requested by the user when providing your response.
          - Please answer the question using Markdown syntax, including but not limited to: 
            - Headings: ##, ###
            -	Lists: -, 1. 
            No additional language` }
        let userPrompt = {
          "role": "user", "content": `1. Using ${Lang['current']['name']} explanatory part of speech
            2. Explanation: ${Lang['current']['Prompt1']['explanation']}. 
            3. Example sentences: Provide ${Lang['target']['name']} example sentences with the same meaning or function, along with their translations.
            4. Translation question: Based on the word, Provide 2 simple sentences to translate the ${Lang['current']['name']} sentences into ${Lang['target']['name']}.
            Please reply "Yes" if you understand.`
        }

        let assistantPrompt = { "role": "assistant", "content": 'Yes' }
        let userPrompt2 = {
          "role": "user", "content": `Word:"${keyWord}", sentence: "${sentence.length <= keyWord.length ? props.selection.anchorNode.parentNode.parentNode.innerText : sentence}"
          `
        }


        // 关键字长度较长时，按照句子进行处理
        if (keyWord.length > 20) {

          systemPrompt = {
            "role": "system", "content": `As an AI language expert, translate the sentence, analyze the original sentence and explain the grammar involved.
            - Please strictly adhere to the language requested by the user when providing your response.
          - Please answer the question using Markdown syntax, including but not limited to: 
            - Headings: ##, ###
            -	Lists: -, 1. 
            No additional language` }

          userPrompt = {
            "role": "user", "content": `1. ${Lang['current']['Prompt2']['translate']} 2. Explanation: ${Lang['current']['Prompt2']['explanation']} 
              3. Example sentences: Provide 2 ${Lang['target']['name']} example sentences and show their translations. 
              4. Translation question: Based on the grammar knowledge points mentioned, Provide 2 simple test questions to translate the ${Lang['current']['name']} sentences into ${Lang['target']['name']}
              Please reply "Yes" if you understand.`
          }

          userPrompt2 = {
            "role": "user", "content": `Sentence: "${keyWord}"`
          }


        }

        let prompt = [systemPrompt, userPrompt, assistantPrompt, userPrompt2]


        console.log(keyWord);


        getGPTMsg(prompt, 'as1', keyWord)

      }

    })

    console.log(messagesList);

    messagesList.current?.addEventListener("scroll", handleScroll);
    return () => {
      // console.log('useEffect return');
      messagesList.current?.removeEventListener("scroll", handleScroll);
    };



  }, [props]);

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

  // 保存历史记录
  useEffect(() => {
    // 在 openApiAnser 更新后将其保存到浏览器存储中
    // 将查询记录保存起来
    const newHistory = { 'keyWord': keyWord, 'sentence': sentence, 'answer': openApiAnser, 'source': window.location.href }

    if (keyWord !== '' && sentence !== '' && openApiAnser !== '') {
      browser.storage.sync.get({ "history": [] }).then((item) => {

        console.log(item.history);

        let newHistoryList: any = []
        let bingo = false
        newHistoryList.push(newHistory)
        if (Array.isArray(item.history)) {

          // 如果记录已存在，则不重复保存
          for (let i = 0; i < item.history.length; i++) {
            let obj = item.history[i]
            if (obj.keyWord === newHistory['keyWord'] && obj.sentence === newHistory['sentence']) {
              bingo = true
              break
            }
          }

          newHistoryList = item.history
          newHistoryList.unshift(newHistory)
          newHistoryList.splice(10)
        }

        if (!bingo) {
          browser.storage.sync.set(
            {
              history: newHistoryList
            }
          ).then(() => {
          })
        }

      })
    }



  }, [isAnswerDone1]);


  // 使用 type 来区分当前请求的是第 1 个答案还是 第 2 个答案，根据不同的 type 渲染不同的 UI
  const getGPTMsg = async (prompt: any, type?: string, keyWord?: string) => {

    type = type || 'as1';
    keyWord = keyWord || '';

    setIsLoading(true)

    // 请求 background 获取数据
    // 使用长连接
    let port = browser.runtime.connect({
      name: 'popup-name'
    })

    // 在消息历史中插入新记录
    setMessages(prevMessages => [...prevMessages, { 'content': '', 'role': 'assistant', 'loading': true }])

    // 使用 postMs 发送信息
    port.postMessage({ 'type': 'getGPTMsg', 'messages': prompt, 'keyWord': keyWord })

    // 接收信息
    port.onMessage.addListener(msg => {

      // console.log('port.onMessage.addListener');

      // 请求 GPT 数据失败
      if (msg.status === 'erro') {
        type === 'as2' ? setopenApiAnser2(msg.content) : setopenApiAnser(msg.content)
        if (msg.content.indexOf('API Key error') > -1) {
          setIsErro(true)
        }

        // setIsLoading(false)
      }

      // 请求 GPT 数据成功且数据流结束传输
      if (msg.status === 'end') {

        if (type === 'as2') {
          setAnswerDone2(true)
        } else {
          setAnswerDone1(true)
          setAddToAnkiStatus('normal')
        }
        // getGPTDataIsProcess.current = false
        // console.log(getGPTDataIsProcess);
        setIsLoading(false)

      }

      // 请求 GPT 数据成功且数据流开始传输
      if (msg.status === 'begin') {

        type === 'as2' ? setopenApiAnser2('') : setopenApiAnser('')

        // setMessages([])
        // getGPTDataIsProcess.current = true
        // console.log(getGPTDataIsProcess);
        console.log('begin');


      }

      // 请求 GPT 数据成功且数据流传输中
      if (msg.status === 'process') {

        setMessages(prevMessages => {

          const lastMessage = prevMessages[prevMessages.length - 1];
          const newMsgList = lastMessage
          const updatedLastMessage = {
            ...lastMessage,
            content: newMsgList.content + msg.content,
            loading: false
          };
          // const newMsgList = [...prevMessages.slice(0, prevMessages.length - 1), lastMessage]
          return [...prevMessages.slice(0, prevMessages.length - 1), updatedLastMessage];

        });


        scrollToBottom()

      }

      if (msg.type === 'sendImgData') {
        console.log(msg);

        if ('imgs' in msg) {
          console.log('unsplashSearchPhotos');
          console.log('imgs:');
          console.log(msg);
        }
      }


    })

  };

  // 发送消息
  const onPressEnter = (values: any) => {
    console.log(event);

    console.log(values);
    let prompt = `${Lang['current']['Prompt3']['validation']}"${values.answer}"`
    setIsUserAnswered(true)

    form.resetFields();

    // 将用户发言发送到历史记录中
    setMessages(prevMessages => {

      const updatedLastMessage = {
        role: 'user',
        content: values.answer,
        'loading': false
      };
      // const newMsgList = [...prevMessages.slice(0, prevMessages.length - 1), lastMessage]
      return [...prevMessages, updatedLastMessage];

    });



    console.log(messages);

    const msgHistory = messages.map((item) => { return { 'role': item.role, 'content': item.content } })

    getGPTMsg([...msgHistory, { "role": "user", "content": values.answer }], 'as2')

    setTimeout(() => {
      scrollToBottom(true)
    }, 10);

    setInputValue(iv => iv += 'hello')

    if (inputRef.current !== null) {
      // inputRef.current.input.value = ''
      setTimeout(() => {
        if (inputRef.current !== null) {
          // inputRef.current.getElementsByTagName('input')[0].value = ''
        }

      }, 10);


    }


    console.log(inputRef.current);

  }

  // 文本框下敲击按键时
  const handleKeyDown = (event: any) => {
    // 阻止事件冒泡
    event.stopPropagation()
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

      const minX = 0;
      const minY = 0;
      const maxX = windowWidth - elementWidth;
      const maxY = windowHeight - elementHeight;

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

  // 文本框值变化时
  const onTextAreaInput = (event: any) => {

    if (event.target.value.length > 3) {
      setIsAnswerInputed(true)
    } else {
      setIsAnswerInputed(false)
    }
  }

  // 点击保存到 Anki
  const handleSaveToAnkiBtnClick = () => {



    // return 

    // console.log('Popup:handleSaveToAnkiBtnClick');

    setAddToAnkiStatus('loading')

    let container = ''
    const stc = keyWord.length <= 20 ? sentence : ''

    if (windowElement.current) {
      console.log(windowElement.current);
      container = windowElement.current.innerHTML
      container = windowElement.current.getElementsByClassName('messages')[0].innerHTML
    }

    // 请求 background 将数据保存到 Anki
    const p = {
      "note": {
        "deckName": "Default",
        "modelName": "Basic",
        "fields": {
          "Front": keyWord,
          "Back": '<p>' + stc + '</p>' + container + '<a href="' + window.location.href + '">Source</a>'
        },
        "tags": [
          "Scouter"
        ]
      }
    }

    // 发送消息给 background
    let sending = browser.runtime.sendMessage({ 'type': 'addToAnki', 'messages': p })
    sending.then(handleResponse, handleError);
    // 接收 background 的回复
    function handleResponse(message: any) {

      // console.log(message);

      if (message.error === null) {

        setAddToAnkiStatus('success')

      } else {
        alert(message.error)
        setAddToAnkiStatus('normal')
      }


    }

    function handleError(erro: any) {
      setAddToAnkiStatus('normal')
      // console.log(erro);
    }

  }


  function scrollToBottom(canSroll: boolean = false) {
    // if (container !== null) {
    //   container.scrollTop = container.scrollHeight;
    // }

    if (messagesList.current !== null) {
      const isAtBottom = messagesList.current?.scrollTop + messagesList.current.clientHeight >= messagesList.current.scrollHeight - 0.5;
      if (isAtBottom || canSroll) {
        // 位于底部，需要自动滚动
        console.log('isAtBottom');
        messagesList.current.scrollTop = messagesList.current.scrollHeight;

      }
    }


  }

  function handleScroll() {
    console.log(messagesList);

    if (messagesList.current !== null) {
      const isAtBottom = messagesList.current?.scrollTop + messagesList.current.clientHeight >= messagesList.current.scrollHeight - 0.5;
      if (isAtBottom) {
        // 已经位于底部，不需要自动滚动
        console.log('isAtBottom');
        return;
      }
    }


    // 未位于底部，不执行自动滚动
  }

  const handleInputChange = (event: any) => {
    console.log(event);
    console.log(event.target.value);

  }

  return (
    <div id="LearningEnglish2023"
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
        <Nav handleSaveToAnkiBtnClick={handleSaveToAnkiBtnClick} addToAnkiStatus={addToAnkiStatus} onMouseDown={handleMouseDown} title='Scouter' />



        <div className='flex-grow flex flex-col overflow-scroll'>
          <div className='flex-grow overflow-scroll'
            ref={messagesList}
            style={{ paddingTop: '50px' }}
          >

            <Selection text={keyWord} />
            <div
              className='messages'
              style={{ lineHeight: '1.6rem' }}
            >
              {messages.map((item) => {
                return item.loading ? <div className='p-4'><Skeleton active title={false} /></div> : <div className='p-4' style={item.role === 'user' ? { backgroundColor: '#F5F5F5' } : {}}><ReactMarkdown>{item.content}</ReactMarkdown></div>
              }
              )}
            </div>
          </div>
        </div>

        <div className='w-full'
          ref={inputRef}
          style={{ borderTop: '1px solid rgba(5, 5, 5, .06)' }}
        >
          <Form
            form={form}
            onFinish={onPressEnter}
            layout='inline'
            style={{ textAlign: 'right' }}
            className='p-4'
          >
            <Form.Item
              name="answer"
              style={{ margin: '0', flexGrow: '1' }}
            >
              <Input placeholder="ask something"
                value={inputValue}
                onChange={handleInputChange}
                suffix={
                  <Button
                    type="text"
                    htmlType="submit"
                    disabled={isLoading}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    icon={<SendOutlined />}
                  />
                }
                onKeyDown={handleKeyDown} onInput={onTextAreaInput} />
            </Form.Item>
            <Form.Item
              style={{ margin: '0' }}
            >

            </Form.Item>
          </Form>
        </div>

      </ConfigProvider >

      {/* <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="48" height="48"
            viewBox="0 0 48 48">
            <path fill="#78909c" d="M40,7v34c0,2.76-2.24,5-5,5H13c-2.76,0-5-2.24-5-5V7c0-2.76,2.24-5,5-5h22C37.76,2,40,4.24,40,7z"></path><path fill="#455a64" d="M40,26.63V41c0,2.76-2.24,5-5,5H13c-2.76,0-5-2.24-5-5V15.8C20.8,17.39,31.98,21.28,40,26.63z"></path><path fill="none" stroke="#1d323a" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M40,7	v34c0,2.76-2.24,5-5,5H13c-2.76,0-5-2.24-5-5V7c0-2.76,2.24-5,5-5h22C37.76,2,40,4.24,40,7z"></path><polygon fill="#42a5f5" points="32.987,7.58 33.194,11.285 36.365,13.215 32.905,14.558 32.049,18.169 29.703,15.293 26.004,15.596 28.014,12.476 26.583,9.051 30.172,9.999"></polygon><path fill="#42a5f5" d="M21.094,22.107l3.15,4.828c0.09,0.138,0.242,0.223,0.406,0.227l5.763,0.142	c0.414,0.01,0.637,0.491,0.377,0.814l-3.618,4.488c-0.103,0.128-0.137,0.299-0.09,0.457l1.646,5.525	c0.118,0.397-0.27,0.758-0.657,0.61l-5.386-2.054c-0.154-0.059-0.327-0.038-0.462,0.056l-4.746,3.273	c-0.341,0.235-0.804-0.023-0.783-0.437l0.289-5.757c0.008-0.164-0.065-0.322-0.196-0.422l-4.579-3.502	c-0.329-0.252-0.227-0.772,0.173-0.88l5.565-1.504c0.159-0.043,0.286-0.161,0.341-0.317l1.915-5.437	C20.341,21.823,20.868,21.76,21.094,22.107z"></path><polygon fill="none" stroke="#f7f7f7" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" points="32.987,7.58 33.194,11.285 36.365,13.215 32.905,14.558 32.049,18.169 29.703,15.293 26.004,15.596 28.014,12.476 26.583,9.051 30.172,9.999"></polygon><path fill="none" stroke="#f7f7f7" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M21.094,22.107l3.15,4.828c0.09,0.138,0.242,0.223,0.406,0.227l5.763,0.142c0.414,0.01,0.637,0.491,0.377,0.814l-3.618,4.488	c-0.103,0.128-0.137,0.299-0.09,0.457l1.646,5.525c0.118,0.397-0.27,0.758-0.657,0.61l-5.386-2.054	c-0.154-0.059-0.327-0.038-0.462,0.056l-4.746,3.273c-0.341,0.235-0.804-0.023-0.783-0.437l0.289-5.757	c0.008-0.164-0.065-0.322-0.196-0.422l-4.579-3.502c-0.329-0.252-0.227-0.772,0.173-0.88l5.565-1.504	c0.159-0.043,0.286-0.161,0.341-0.317l1.915-5.437C20.341,21.823,20.868,21.76,21.094,22.107z"></path>
          </svg> */}

    </div >


  );
};