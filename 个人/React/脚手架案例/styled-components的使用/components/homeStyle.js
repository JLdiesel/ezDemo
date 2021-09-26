import styled from 'styled-components'
export const DivStyle = styled.div`
    background-color:red;
    font-size:20px;
    span{
        color:white;
        &.you{
            color:green;
         
        }
        &:hover {
               color:yellow;
           }
        &::after{
               content:'你好啊'
           }
           :hover{
               background-color: #fff;
           }
    }
`
export const DiyInput = styled.input.attrs({
    placeholder: '金龙',
    type: 'password',
    bcolor:'yellow'
})`
    background-color: pink;
    border-color:${props => props.bcolor};
    color:${props=>props.color}
`