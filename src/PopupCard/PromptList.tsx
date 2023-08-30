import React, { useEffect, useState, useRef, ReactNode } from "react";

import { PromptType } from '../types'
import { getDefaultPrompt } from './util'

import styled from 'styled-components';

import { userInfoType } from '../types'

import { useUserInfoContext } from '../lib/userInfo'
import { ProTag } from "../Components/ProTag";


interface PromptListProps {
    promptList: Array<PromptType>;
    followUpData: { keyWord: string, sentence: string }
    showFollowUpDataMenu: { show: boolean, style: {} }
    handleMenuItemClick: (data: PromptType, runPrompt?: boolean, imageToRerender?: boolean, promptData?: { keyWord: string, sentence: string }) => void;
}

interface PromptButtonProps {
    handleMenuItemClick: () => void;
    children: ReactNode;
    disable?: boolean;
}

export function PromptList(props: PromptListProps) {

    const PromptListDOM = useRef<HTMLDivElement>(null);
    const userInfo: userInfoType | null = useUserInfoContext()

    // const userInfo = useUserInfoContext()
    // console.log('userInfo:');
    // console.log(userInfo);

    useEffect(() => {
        // console.log(PromptListDOM.current);
        // console.log(PromptListDOM.current?.clientHeight);

        // //设置菜单的位置
        // if (PromptListDOM.current) {
        //     PromptListDOM.current.style.top = (parseInt(PromptListDOM.current.style.top, 10) - PromptListDOM.current.clientHeight).toString() + 'px'
        // }


    }, [props.showFollowUpDataMenu.show]);

    // Prompt 菜单 item 点击
    const handleMenuItemClick = (data: PromptType) => {

        if (userInfo?.verified) {
            // 第 3 个参数 false 表示不重新渲染图片
            props.handleMenuItemClick(data, true, true, props.followUpData)
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
                    cursor: !userInfo?.verified ? 'not-allowed' : '',
                    opacity: !userInfo?.verified ? '0.7' : '1',
                }}
            >

                <PromptButton disable={!userInfo?.verified} handleMenuItemClick={() => {
                    const p = getDefaultPrompt(props.followUpData.keyWord)
                    handleMenuItemClick(p)
                }}>Default</PromptButton>

                {props.promptList.map((item) => {
                    // return <button onClick={() => handleMenuItemClick(item)}>{item.title}</button>
                    return <PromptButton disable={!userInfo?.verified} handleMenuItemClick={() => handleMenuItemClick(item)}>{item.title}</PromptButton>
                })}

            </div>



        </div>
    )
}

const StyledButton = styled.button`

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

        <StyledButton
            style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                textAlign: 'left',
                padding: '4px',
                pointerEvents: props.disable ? 'none' : 'auto'
            }}
            onClick={props.handleMenuItemClick}>{props.children}</StyledButton>

    )
}