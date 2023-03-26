import browser from 'webextension-polyfill'

import React, { useEffect, useState } from "react";
import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser'
import ReactDOM from "react-dom";

import "../index.css"

import { Nav } from "../Components/Nav"

import { Options } from "../Options"

import { Selection } from "./Selection"
import { ErroTips } from "./ErroTips"

import { Divider, Skeleton, Input, ConfigProvider } from 'antd';

const { TextArea } = Input;

export function PopupCard(props: any) {

  const [openApiAnser, setopenApiAnser] = useState('');
  const [openApiAnser2, setopenApiAnser2] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  const [isAnswerDone1, setAnswerDone1] = useState(false);
  const [isUserAnswered, setIsUserAnswered] = useState(false);
  const [isAnswerDone2, setAnswerDone2] = useState(false);

  const [keyWord, setKeyWord] = useState('');

  // const [conversationList, setConversationList] = useState<{ type: string, isLoading: boolean, content: string }[]>([{ 'type': 'ai', 'isLoading': true, 'content': '' }]);


  useEffect(() => {
    // New Task
    console.log('## PopupCard useEffect')

    // 初始化
    setAnswerDone1(false)
    setAnswerDone2(false)
    setopenApiAnser('')
    setopenApiAnser2('')

    // 当前选中的文字
    let keyWord = props.selection.toString()
    setKeyWord(keyWord)
    // 选中文字所在的段落
    let sentens = props.selection.anchorNode.data

    let prompt = `
    请解释以下句子中的'${keyWord}'，句子为：'${sentens}'
    
    - 使用 **CEFR A2** 级别的英语解释单词（请使用英文）
    - 使用图像记忆法描述单词
    - 提供三个例句以及对应的翻译，其中必须包含'${keyWord}'。
    - 最后结合你描述的知识提供'${keyWord}'相关的两个测试题。这些测试题应该将中文短语翻译为英文，但不要提供测试题的答案。
    
    请使用以下格式回复：
    
    \`\`\`md
    <词性>（如果是单词）<使用中文解释单词在句子中的作用> <使用英文解释>
    
    # 图像记忆法描述：
    <图像记忆法描述>
    
    # 例句：
    <例句及翻译>
    
    # 测试：
    <测试题>
    \`\`\`
    `;

    // 设置加载状态
    setIsLoading(true)
    getGPTMsg([{ "role": "user", "content": prompt }])

  }, [props]);


  useEffect(() => {

    console.log('useFeefect isAnswerDone1');

  }, [isAnswerDone1])

  // 使用 type 来区分当前请求的是第 1 个答案还是 第 2 个答案，根据不同的 type 渲染不同的 UI
  const getGPTMsg = async (prompt: Array<object>, type = 'as1') => {
    console.log('getGPTMsg:');

    // 请求 background 获取数据
    // 使用长连接
    let port = browser.runtime.connect({
      name: 'popup-name'
    })

    // 使用 postMs 发送信息
    port.postMessage({ 'type': 'getGPTMsg', 'messages': prompt })

    // 接收信息
    port.onMessage.addListener(msg => {
      
      // 请求 GPT 数据失败
      if (msg.status === 'erro') {
        type === 'as2' ? setopenApiAnser2(msg.content) : setopenApiAnser(msg.content)
      }

      // 请求 GPT 数据成功且数据流结束传输
      if (msg.status === 'end') {

        type === 'as2' ? setAnswerDone2(true) : setAnswerDone1(true)

      }

      // 请求 GPT 数据成功且数据流开始传输
      if (msg.status === 'begin') {

        type === 'as2' ? setopenApiAnser2('') : setopenApiAnser('')
        setIsLoading(false)

      }

      // 请求 GPT 数据成功且数据流传输中
      if (msg.status === 'process') {
        // 渲染内容
        type === 'as2' ? setopenApiAnser2(oa => oa += msg.content) : setopenApiAnser(oa => oa += msg.content)

      }

    })

  };

  // 提交答案
  const onPressEnter = (event: any) => {
    console.log(event);

    // 同时按下 Shirt 时，不提交答案
    if (!event.shiftKey && event.target.defaultValue.replace(/(\r\n|\n|\r)/gm, '') !== '') {
      let prompt = `针对你提供的测试题，请检查我的回答，如果有误请指出错误的原因，最后提供正确答案，我的回答是："${event.target.defaultValue} "，如果回答和测试题无关，请直接提供测试题的答案`
      setIsUserAnswered(true)
      getGPTMsg([{ "role": "assistant", "content": openApiAnser }, { "role": "user", "content": prompt }], 'as2')

    }

  }

  return (
    <div id="LearningEnglish2023">

      <Nav title='Scouter' />

      <div className="contentBox">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#FEB825',
            },
          }}
        >
          {/* 当前查询的文字 */}
          <Selection title={keyWord} />

          {/* 第一个回答 */}
          {isLoading && !isAnswerDone1 ? <Skeleton active title={false} /> : <div className="openAIAnswer" style={{ whiteSpace: 'pre-wrap' }}>
            {openApiAnser.replace(/\n\n/g, "\n").replace(/(^\s*)|(\s*$)/g, "")}
          </div>}

          {/* 文本域，用来提交测试题的答案 */}
          {isAnswerDone1 ? <div className="userInput">
            <TextArea rows={3} placeholder="Press the Enter ⏎ key to submit." onPressEnter={onPressEnter} disabled={isUserAnswered} />
          </div> : ''}

          {/* 第二个回答，针对文本域提交的回答进行评价 */}
          {isLoading && !isAnswerDone2 && isAnswerDone1 ? <Skeleton active title={false} /> : <div className="openAIAnswer" style={{ whiteSpace: 'pre-wrap' }}>
            {openApiAnser2.replace(/\n\n/g, "\n").replace(/(^\s*)|(\s*$)/g, "")}
          </div>}

          {/* <Options /> */}

        </ConfigProvider>
      </div>
    </div>
  );
};