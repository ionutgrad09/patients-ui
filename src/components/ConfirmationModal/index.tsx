import {FC} from "react";
import {StyledContentWrapper, StyledButtonWrapper} from "./styles";
import {Button, Dialog,} from "@mui/material";

interface Props {
    isOpen: boolean,
    text: string,
    onConfirm: () => void,
    onClose: () => void
}

const ConfirmationModal: FC<Props> = ({isOpen, text, onConfirm, onClose}) => {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
        >
            <StyledContentWrapper>
                <span>{text}</span>
                <StyledButtonWrapper>
                    <Button onClick={onConfirm}>Da</Button>
                </StyledButtonWrapper>
            </StyledContentWrapper>
        </Dialog>
    )
}

export default ConfirmationModal