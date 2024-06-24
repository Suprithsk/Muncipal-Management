import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
} from '@chakra-ui/react'
import { markProblemAsResolved } from '../apis/adminApis'

function AdminConfirmation({ isOpen, onClose, refreshPage,problem_id }) {
    const markProblemAsResolved1=async (problem_id)=> {
        const data = await markProblemAsResolved(problem_id)
        console.log(data)
    }
    return (
        <>
            <AlertDialog
                isOpen={isOpen}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Resolve Problem
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            {`Are you sure? You can't undo this action afterwards.`}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={async ()=>{
                                await markProblemAsResolved1(problem_id)
                                refreshPage()
                                onClose()
                            }} ml={3}>
                                Resolve
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default AdminConfirmation