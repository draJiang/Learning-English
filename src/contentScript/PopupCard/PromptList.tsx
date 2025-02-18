import React, { useEffect, useState, useRef, ReactNode } from "react";

import { PromptType } from '../../types'
import { getDefaultPrompt, dictionaryPrompt } from './util'

import styled from 'styled-components';

import { userInfoType, runPromptType } from '../../types'

import { useUserInfoContext } from '../../lib/userInfo'
import { ProTag } from "../../Components/ProTag";

import { useCurrentLanguage } from '../../lib/locale'


let MyButton = styled.button`

    padding: 6px;
    margin-bottom: 4px;
    border-radius: 2px;
    cursor: unset;

    &:hover {
        background-color:#F6F6F6;
    }
`;

function PromptButton(props: PromptButtonProps) {


    return (

        <MyButton
            style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                textAlign: 'left',
                padding: '4px',
                pointerEvents: props.disable ? 'none' : 'auto'
            }}
            onClick={props.handleMenuItemClick}>{props.children}</MyButton>

    )
}


interface PromptListProps {
    promptList: Array<PromptType>;
    followUpData: { keyWord: string, sentence: string }
    showFollowUpDataMenu: { show: boolean, style: {} }
    handleMenuItemClick: (data: PromptType, runPrompt?: runPromptType, imageToRerender?: boolean, promptData?: { keyWord: string, sentence: string }) => void;
}

interface PromptButtonProps {
    handleMenuItemClick: () => void;
    children: ReactNode;
    disable?: boolean;
}

export function PromptList(props: PromptListProps) {

    const PromptListDOM = useRef<HTMLDivElement>(null);
    const userInfo: { user: userInfoType, anki: any } | null = useUserInfoContext()

    let Lang = useCurrentLanguage()!
    const currentLanguage = Lang['current']['name']

    // const userInfo = useUserInfoContext()
    // console.log('userInfo:');
    // console.log(userInfo);

    useEffect(() => {

    }, [props.showFollowUpDataMenu.show]);

    // Prompt 菜单 item 点击
    const handleMenuItemClick = (data: PromptType) => {

        if (userInfo?.user.verified) {
            // 第 3 个参数 false 表示不重新渲染图片
            props.handleMenuItemClick(data, 'yes', true, props.followUpData)
        }


    }

    return (
        <div
            ref={PromptListDOM}
            className='followUpMenu'
            style={{
                ...props.showFollowUpDataMenu.style,
                position: 'absolute',
                display: "flex",
                flexDirection: "column",
                width: '120px',
                padding: '0'
            }}
        >

            <div style={{
                display: 'flex',
                justifyContent: 'end',
                padding: '8px',
                borderBottom: '1px solid rgba(5, 5, 5, .06)',
                color: '#666'
            }}>
                <span style={{ flex: '1' }}>Prompt</span>
                <ProTag />
            </div>


            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: '8px 8px 4px',
                    cursor: !userInfo?.user.verified ? 'not-allowed' : '',
                    opacity: !userInfo?.user.verified ? '0.7' : '1',
                }}
            >
                {/* 默认 Prompt */}
                <PromptButton disable={!userInfo?.user.verified} handleMenuItemClick={async () => {
                    const p = getDefaultPrompt(props.followUpData.keyWord, currentLanguage)
                    handleMenuItemClick(p)
                }}>Default</PromptButton>
                {/* 词典 */}
                <PromptButton disable={!userInfo?.user.verified} handleMenuItemClick={() => {
                    handleMenuItemClick(dictionaryPrompt)
                }}>{dictionaryPrompt.title}</PromptButton>
                {/* 用户自定义 Prompt */}
                {props.promptList.map((item) => {
                    // return <button onClick={() => handleMenuItemClick(item)}>{item.title}</button>
                    return <PromptButton key={item.id} disable={!userInfo?.user.verified} handleMenuItemClick={() => handleMenuItemClick(item)}>{item.title}</PromptButton>
                })}

            </div>



        </div>
    )
}

