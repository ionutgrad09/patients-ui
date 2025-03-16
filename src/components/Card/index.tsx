import React, {FC, ReactNode} from 'react'
import {StyledCardContainer, StyledCardWrapper,} from "./styles";

interface Props {
    children: ReactNode
}

const Card: FC<Props> = ({children}) => {
    return (
        <StyledCardWrapper>
            <StyledCardContainer>
                {children}
            </StyledCardContainer>
        </StyledCardWrapper>
    )
}

export default Card