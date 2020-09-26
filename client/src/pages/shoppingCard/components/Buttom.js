import styled from 'styled-components';

 export const ButtonContainer = styled.button`
  text-transform : capitalize;
  font-size: 1.4rem;
  margin:  10px;
  outline: none !important;
  background: #ffa400 ;
  border: 0.05rem solid #009ffa;
  border-color:${(props)=>props.active?"#ffa400":"#2a2a72"};
  
  color:${props=>props.active?"#2a2a72": "#009ffa"};
  
  padding: 0.3rem 0.3rem;
  cursor: pointer;
  margin: 0.2rem;
  transition: all 0.5s ease-in-out;
  &:hover {
      
      background:${props=>props.active?"#fff":"#009ffa"};
      color: #ffa400;
  }
  &:focus {
      outline:none;
  }
`