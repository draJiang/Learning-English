import browser from 'webextension-polyfill'
import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";

import { Button, ConfigProvider, Dropdown, Divider, Space } from 'antd';
import type { MenuProps } from 'antd';

import { lang } from '../lib/lang';

import { useUserInfoContext } from '../lib/userInfo'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DropdownMenuItem } from './DropdownMenuItem'

import { getDefaultPrompt, dictionaryPrompt } from '../PopupCard/util'
import { PromptType, addToAnkiStatusType, langType, runPromptType, userInfoType, AnkiInfoType } from '../types'

import {
    HamburgerMenuIcon,
    DotFilledIcon,
    CheckIcon,
    ChevronRightIcon,
} from '@radix-ui/react-icons';


// import type { MenuProps } from 'antd';


import { pinPopupCard } from '../contentScript'
import { PushpinOutlined, PushpinFilled, PlusSquareOutlined, CheckCircleTwoTone, DownOutlined } from '@ant-design/icons';

import { useCurrentLanguage } from '../lib/locale'


interface NavProps {
    isOpenMenu: boolean;
    prompts: Array<PromptType>;
    lastExecutedPrompt: PromptType;
    // handleSaveToAnkiBtnClick: (deck?: string) => void;
    openCustomPromptForm: (data: { isOpen: boolean, data: PromptType }) => void;
    handleMenuItemClick: (data: PromptType, runPrompt?: runPromptType, imageToRerender?: boolean) => void;
    addToAnkiStatus: addToAnkiStatusType;
    onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
    keyWord: string;
    Sentence: string;
    windowElement: HTMLDivElement | null
}

export function Nav(props: NavProps) {
    const [isPin, setIsPin] = useState(false);
    const [currentURL, setCurrentURL] = useState<string>();
    const [isOpenPromptMenu, setIsOpenPromptMenu] = useState(false);
    const defaultPrompt = useRef<PromptType>();

    const [addToAnkiStatus, setAddToAnkiStatus] = useState<addToAnkiStatusType>({ 'status': 'normal', 'noteId': 0 });

    // const { Option } = Select;

    const navElement = useRef<HTMLDivElement>(null);

    const userInfo: { user: userInfoType, anki: AnkiInfoType } | null = useUserInfoContext()

    let Lang = useCurrentLanguage()!
    const currentLanguage = Lang['current']['name']


    useEffect(() => {

        // 当不自动自行 Prompt，自动打开 Prompt 菜单供用户选择
        if (props.isOpenMenu) {
            onMenuOpenChange(props.isOpenMenu)
        }


    }, [props.isOpenMenu]);

    useEffect(() => {

        defaultPrompt.current = getDefaultPrompt(props.keyWord, currentLanguage)
        // 设置添加到 Anki 的操作状态
        setAddToAnkiStatus(props.addToAnkiStatus)

    }, []);



    const handleMenuClick: MenuProps['onClick'] = (e) => {
        handleSaveToAnkiBtnClick(e.key)
    };

    let items: MenuProps['items'] = []
    if (userInfo?.anki.decks) {
        items = userInfo?.anki.decks.map((deck) => { return { 'key': deck, 'label': deck } })
    }

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    // // 点击保存到 Anki 按钮
    // const handleSaveToAnkiBtnClick = () => {
    //     props.handleSaveToAnkiBtnClick()
    // };







    // 添加到 Anki
    const addToAnki = (deckName: string, modelName: string, front: string, back: string) => {

        const keyWord = props.keyWord
        const Sentence = props.Sentence
        const windowElement = props.windowElement

        let container = ''
        let images = ''
        let unsplash_download_location
        let stc = keyWord.length <= 20 ? Sentence : ''
        // 转移 HTML 标签，按照普通字符串处理
        stc = stc.replace(/</g, "&lt;").replace(/>/g, "&gt;");

        // 在语境句子中将关键字突出显示
        stc = stc.replace(new RegExp(keyWord, 'g'), '<span class="keyWord">' + keyWord + '</span>');

        let ScouterSelection = ''


        if (windowElement) {
            // 选中的文字
            ScouterSelection = windowElement?.querySelector('#ScouterSelection')?.getElementsByTagName('span')[0].innerHTML!

            // console.log(windowElement);
            container = windowElement.innerHTML
            container = windowElement.getElementsByClassName('messages')[0].innerHTML

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


            if (windowElement.getElementsByClassName('imageBox')[0] !== undefined) {
                images = windowElement.getElementsByClassName('imageBox')[0].innerHTML
                // 获取 unsplashApi 的 download_location
                unsplash_download_location = windowElement.getElementsByClassName('images')[0].getElementsByTagName('img')[0].parentElement?.getAttribute('data-downloadlocation')
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
            // filename = Date.now().toString()
            filename = ''

            audio = [{
                "url": audioUrl + keyWord,
                "filename": "Scouter" + filename + ".mp3",
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


        // 数据埋点
        // amplitude.track('addToAnki');
        browser.runtime.sendMessage({ 'type': 'amplitudeTrack', 'name': 'addToAnki' })

    }

    // 点击保存到 Anki
    const handleSaveToAnkiBtnClick = (deck?: string) => {

        const windowElement = props.windowElement

        // 根据是否为完形填空申请不同的卡片模板
        const container = windowElement?.getElementsByClassName('messages')[0].innerHTML!
        const selectionText = windowElement?.querySelector('#ScouterSelection')?.getElementsByTagName('span')[0].innerHTML!
        let isAnkiSpace = false
        if (container || selectionText) {
            if (container.indexOf('class="ankiSpace"') >= 0 || container.indexOf('{{c') >= 0 || selectionText.indexOf('class="ankiSpace') >= 0) {
                isAnkiSpace = true
            }
        }

        setAddToAnkiStatus({ 'status': 'loading', 'noteId': 0 })


        function setAnkiInfo(ankiInfo: AnkiInfoType) {


            const models = ankiInfo.models

            let modelName: string = '', field1: string = '', field2: string = ''
            models.forEach((model: any) => {

                if (model.isAnkiSpace === isAnkiSpace) {
                    modelName = model.modelName
                    field1 = model.field1
                    field2 = model.field2
                }



            });

            return {
                'modelName': modelName,
                'field1': field1,
                'field2': field2
            }

        }

        if (userInfo?.anki) {

            const thisDeck = deck ? deck : userInfo?.anki.defaultDeckName

            const ankiInfo = setAnkiInfo(userInfo?.anki)

            // 添加到 Anki 中
            addToAnki(thisDeck, ankiInfo.modelName!, ankiInfo.field1!, ankiInfo.field2!)

        } else {

            // 获取 Anki 牌组信息
            browser.runtime.sendMessage({ 'type': 'setModel', 'messages': {}, }).then((result) => {

                if (result.result === 'success') {

                    const ankiInfo = setAnkiInfo(result.data)
                    const thisDeck = deck ? deck : userInfo?.anki.defaultDeckName
                    // 添加到 Anki 中
                    addToAnki(thisDeck!, ankiInfo.modelName!, ankiInfo.field1!, ankiInfo.field2!)


                } else {

                    // 反馈错误信息
                    alert(result.error.error)
                    setAddToAnkiStatus({ 'status': 'normal', 'noteId': 0 })

                }



            })


        }

    }









    // 点击 Pin 按钮
    const handlePinBtnClick = () => {

        if (isPin) {
            pinPopupCard(false)
            setIsPin(false)

            // amplitude.track('pinPopupCard');


        } else {
            pinPopupCard(true)
            setIsPin(true)

            browser.runtime.sendMessage({ 'type': 'amplitudeTrack', 'name': 'pinPopupCard' })
        }

    }

    // 在 Anki 中打开笔记
    const editNoteInAnki = (noteId: number) => {

        let sending = browser.runtime.sendMessage({ 'type': 'guiEditNote', 'messages': { 'anki_action_type': 'guiEditNote', 'anki_arguments': { 'note': noteId }, } })
        sending.then((message: any) => {



        }, () => {
            //error
        });

    }

    // 打开 Prompt 编辑窗口
    const openCustomPromptForm = (data: { isOpen: boolean, data: PromptType }) => {

        props.openCustomPromptForm(data)
        setIsOpenPromptMenu(false)

    }

    // Prompt 菜单 item 点击
    const handleMenuItemClick = (data: PromptType) => {

        // 第 3 个参数 false 表示不重新渲染图片

        // // 如果上一个 Prompt 是不显示图片，且当前 Prompt 需要显示图片，则本次任务需要渲染图片，否则不重新渲染图片
        // if (props.lastExecutedPrompt.getUnsplashImages !== true && data.getUnsplashImages) {
        //     props.handleMenuItemClick(data)
        // } else {
        //     props.handleMenuItemClick(data, true, false)
        // }

        props.handleMenuItemClick(data)

    }

    const onMenuOpenChange = (open: boolean) => {
        // event.stopPropagation()
        setIsOpenPromptMenu(open)

    }



    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#F08A24',
                    },
                }}
            >
                <div id="ScouterNav"
                    ref={navElement}
                    className='p-4'
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        paddingTop: '12px',
                        paddingBottom: '12px',
                        borderBottom: '1px solid rgba(5, 5, 5, .06)',
                        userSelect: 'none',
                        cursor: 'move',
                        position: 'absolute',
                        width: '100%', top: 0,
                        background: 'white',
                        zIndex: 9,
                        padding: '12px 18px'
                    }}
                    onMouseDown={props.onMouseDown}>



                    <div style={{ zIndex: 9 }}>

                        <DropdownMenu.Root open={isOpenPromptMenu}
                            modal={false}
                            onOpenChange={onMenuOpenChange}
                        >

                            <DropdownMenu.Trigger asChild>
                                <button className="IconButton" aria-label="Customise options" style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}

                                >
                                    <HamburgerMenuIcon />
                                    <span style={{
                                        marginLeft: '4px',
                                        maxWidth: '170px',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>{props.lastExecutedPrompt.title}</span>
                                </button>
                            </DropdownMenu.Trigger>

                            <DropdownMenu.Portal container={navElement.current} >

                                <DropdownMenu.Content className="DropdownMenuContent" align='start' sideOffset={5} style={{
                                    backgroundColor: '#fff',
                                    cursor: 'default',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '180px',
                                    padding: '10px',
                                    boxShadow: 'rgba(0, 0, 0, 0.08) 0px 6px 16px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px -4px, rgba(0, 0, 0, 0.05) 0px 9px 28px 8px',
                                    borderRadius: '8px',
                                    animationDuration: '400ms',
                                    MozAnimationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                                    willChange: 'transform, opacity'
                                }}>


                                    {/* 默认 Prompt */}
                                    <DropdownMenuItem
                                        key={defaultPrompt.current?.id}
                                        data={defaultPrompt.current!}
                                        onSelect={() => handleMenuItemClick(defaultPrompt.current!)}
                                        handleEditPrompt={() => openCustomPromptForm({ isOpen: true, data: defaultPrompt.current! })}
                                    >

                                        {defaultPrompt.current?.title}
                                    </DropdownMenuItem>

                                    {/* 词典 */}
                                    <DropdownMenuItem
                                        key={dictionaryPrompt.id}
                                        data={dictionaryPrompt}
                                        onSelect={() => handleMenuItemClick(dictionaryPrompt)}
                                        handleEditPrompt={() => openCustomPromptForm({ isOpen: true, data: dictionaryPrompt })}
                                    >

                                        {dictionaryPrompt.title}
                                    </DropdownMenuItem>

                                    <Divider style={{ margin: '8px 0' }} />

                                    {/* 用户自定义的 Prompt */}
                                    {props.prompts.map(item => <DropdownMenuItem
                                        key={item.id}
                                        data={item}
                                        onSelect={() => handleMenuItemClick(item)}
                                        handleEditPrompt={() => openCustomPromptForm({ isOpen: true, data: item })}
                                    >

                                        {item.title}</DropdownMenuItem>)}

                                    <DropdownMenu.Separator className="DropdownMenuSeparator" />


                                    {/* 新建自定义 Prompt 按钮 */}
                                    {props.prompts.length < 6 ? <Button style={{ marginTop: '4px' }} size='small' onClick={() => openCustomPromptForm({ isOpen: true, data: { 'title': '', 'getUnsplashImages': false, 'userPrompt': '', 'id': '' } })}>Create prompt</Button> :
                                        <Button style={{ marginTop: '4px' }} size='small' disabled>At most 7 Prompts</Button>}


                                </DropdownMenu.Content>

                            </DropdownMenu.Portal>

                        </DropdownMenu.Root>


                    </div>


                    <div className="rightBtnBox"
                        style={{
                            flex: 1,
                            textAlign: 'right',
                            display: 'flex',
                            justifyContent: 'end',
                            alignItems: 'center'
                        }}>

                        {/* 添加到 Anki 按钮 */}
                        <div style={{
                            marginRight: '10px'
                        }}>
                            {
                                addToAnkiStatus.status == 'success' ? <span>< CheckCircleTwoTone twoToneColor="#52c41a" /> Added to <span style={{
                                    textDecoration: 'underline',
                                    cursor: 'pointer'
                                }} onClick={editNoteInAnki.bind(event, addToAnkiStatus.noteId)}>Anki</span></span> :

                                    <Dropdown.Button size="small"
                                        overlayStyle={{ width: '50%' }}
                                        getPopupContainer={() => navElement.current as HTMLDivElement}
                                        style={{
                                            fontSize: '13.2px',
                                            width: 'auto',
                                        }}
                                        // icon={<PlusSquareOutlined />}
                                        disabled={addToAnkiStatus.status === 'standby' || addToAnkiStatus.status === 'loading' ? true : false}

                                        menu={menuProps} onClick={(event) => handleSaveToAnkiBtnClick()}

                                    >
                                        {addToAnkiStatus.status === 'loading' ? 'Adding...' : 'Add to Anki'}
                                    </Dropdown.Button>
                            }
                        </div>

                        {/* Pin 按钮 */}
                        <Button size='small'
                            // type='text'
                            style={{
                                borderColor: isPin ? '#F08A24' : '',
                                fontSize: '13.2px'
                            }}
                            icon={isPin ? <PushpinFilled className='isPin' /> : <PushpinOutlined />} onClick={handlePinBtnClick} />
                    </div>

                </div>
            </ConfigProvider >
        </>
    );
}