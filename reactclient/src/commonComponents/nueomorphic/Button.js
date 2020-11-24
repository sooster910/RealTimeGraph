import React from 'react'
import styled from 'styled-components'

export default function Button(props) {
    const Button = styled.button`
        width: 150px;
        height: 44px;
        border-radius: 1rem;
        justify-self: center;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 5px 5px 10px #c8d0e7, -5px -5px 10px #ffffff;
        transition: .3s ease;
        background: #E4EBF5;
        border-style:none;
        color: #9baacf;
      
      &:hover{
        color: #4b4b96; 
        outline:none;
      }
      &:active{
          box-shadow: inset .2rem .2rem .5rem #E4EBF5, 
          inset -.2rem -.2rem .5rem #ffffff;
          outline:none;
      }
    `
    return (
        <Button>
            {props.title||`Button`}
        </Button>
    )
}
