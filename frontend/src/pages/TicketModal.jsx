import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { Button, Input, FormControl, FormLabel } from '@chakra-ui/react'
import {
    Alert,
    AlertIcon,
} from '@chakra-ui/react'
import { createTicketByProblemId } from '../apis/userApis'
import { useState } from 'react'

function TicketModal({ isOpen, onClose, isResolved, problem_id }) {
    const [description, setDescription] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const addButtonHandler = async () => {
        if(description===''){
            setErrorMessage('Description is required')
            return
        }
        try {
            await createTicketByProblemId(problem_id,{problem_description:description})
            setSuccessMessage('Ticket added successfully')
            setDescription('')
        } catch (err) {
            console.log('newerr',err)
            setErrorMessage(err?.response?.data?.message)
        }
    }
    const onCloseHandler = () => {
        setSuccessMessage('')
        setDescription('')
        setErrorMessage('')
        onClose()
    }
    return (
        <Modal
            isOpen={isOpen}
            onClose={onCloseHandler}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add ticket</ModalHeader>
                <ModalCloseButton onClick={onCloseHandler} />
                <ModalBody pb={6}>
                    {!isResolved && <Alert status='error' mb={3}>
                        <AlertIcon />
                        This problem is not resolved yet
                    </Alert>}
                    {
                        successMessage !== '' && (
                            <Alert status='success' mb={3}>
                                <AlertIcon />
                                {successMessage}
                            </Alert>
                        )
                    }
                    {errorMessage !== '' && (
                        <Alert status='error' mb={3}>
                            <AlertIcon />
                            {errorMessage}
                        </Alert>
                    )}
                    {isResolved && <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Input value={description} onChange={(e)=>{
                            setDescription(e.target.value)
                        }} placeholder='Description' />
                    </FormControl>}
                </ModalBody>
                <ModalFooter>
                    {isResolved &&
                    <>
                        <Button bg="black" color="white" mr={3} _hover={{ bg: "gray.700" }} onClick={addButtonHandler}>
                            Add ticket
                        </Button>
                        <Button onClick={() => {
                            onCloseHandler()
                        }}>Cancel</Button>
                    </>
                    }
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default TicketModal