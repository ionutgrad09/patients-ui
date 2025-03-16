import styled from "styled-components";

export const StyledCardWrapper = styled.div`
  position: relative;
  width: 400px;
  height: 250px;
  box-shadow: 5px 10px 8px 10px #888888;
  border-radius: 5px;
  background-color: white;
  display: flex;
  justify-content: center;

  &:hover {
    transform: scale(1.05);
    transition: all .1s ease-in-out;
    box-shadow: 0 10px 40px 0 rgba(0, 0, 0, 0.4);
    z-index: 3;
    border-color: #007bff !important;
  }
`

export const StyledCardContainer = styled.div`
  width: 95%;
  height: 95%;
  padding: 20px;
`

export const StyledLink = styled.div`
  text-decoration: underline;
  color: dodgerblue;
  cursor: pointer;
`


