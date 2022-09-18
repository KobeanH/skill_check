// 外部モジュール
import React, { useState } from 'react'
import axios, { AxiosResponse, AxiosError } from 'axios'
import styled from 'styled-components'

// 内部モジュール
import './App.css'

function App() {
  type DataType = {
    userId: number
    id: number
    title: string
    body: string
  }

  const [data, setData] = useState<DataType | null>(null)
  const [error, setError] = useState<AxiosError | null>(null)

  const getData = (): void => {
    // ランダムな1〜100のidを取得する際に1/2の確率でエラーを出すように乱数を0〜200の間で設定しています
    const randomNumber: number = Math.floor(Math.random() * 200)

    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${randomNumber}`)
      .then((response: AxiosResponse<DataType>) => {
        setError(null)
        setData(response.data)
      })
      .catch((e: AxiosError) => {
        setData(null)
        setError(e)
      })
  }

  const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `

  const List = styled.ul`
    list-style: none;
    max-width: 600px;
    margin-bottom: 40px;
    text-align: left;
    padding: 0;
  `

  const Item = styled.li`
    margin-bottom: 40px;
    font-size: 20px;
  `

  const ItemTitle = styled.span`
    font-weight: bold;
    color: red;
    margin-right: 8px;
  `

  const BaseButton = styled.button`
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 1.5;
    position: relative;
    display: inline-block;
    padding: 1rem 4rem;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    text-align: center;
    vertical-align: middle;
    text-decoration: none;
    letter-spacing: 0.1em;
    border-radius: 0.5rem;
    max-width: 600px;
    margin: 0 auto;
    color: #fff;
    background-color: #eb6100;
    border-bottom: 5px solid #b84c00;
    &:hover {
      margin-top: 3px;
      color: #fff;
      background: #f56500;
      border-bottom: 2px solid #b84c00;
    }
  `

  return (
    <Wrapper className="App">
      {data && (
        <List>
          <Item>
            <ItemTitle>User Id:</ItemTitle>
            {data.userId}
          </Item>
          <Item>
            <ItemTitle>Id:</ItemTitle>
            {data.id}
          </Item>
          <Item>
            <ItemTitle>Title:</ItemTitle>
            {data.title}
          </Item>
          <Item>
            <ItemTitle>Body:</ItemTitle>
            {data.body}
          </Item>
        </List>
      )}
      {error && (
        <>
          <p>エラーハンドリング確認のため、意図的に1/2の確率でエラーを発生させています。</p>
          <p>
            {error.name}
            <br />
            {error.message}
          </p>
        </>
      )}
      <BaseButton onClick={() => getData()}>データを取得</BaseButton>
    </Wrapper>
  )
}

export default App
