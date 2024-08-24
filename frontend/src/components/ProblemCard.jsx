import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Button, Box } from '@chakra-ui/react'
import './ProblemCard.css'
import AdminConfirmation from "../pages/AdminConfirmation"
import { useDisclosure } from '@chakra-ui/react'
import TicketModal from '../pages/TicketModal'

function ProblemCard(props) {
    const { isOpen: isAdminOpen, onOpen: adminOnOpen, onClose: adminOnClose } = useDisclosure()
    const { isOpen: isUserOpen, onOpen: userOnOpen, onClose: userOnClose } = useDisclosure()
    return (
        <>
            <AdminConfirmation isOpen={isAdminOpen} onClose={adminOnClose} refreshPage={props?.refreshPage} problem_id={props?.problem_id} />
            <TicketModal isOpen={isUserOpen} onClose={userOnClose} isResolved={props?.problem_resolved} problem_id={props?.problem_id} />
            <Card ml={4} className='admin-card' >
                <CardHeader >
                    <Heading size='md'>{props.title}</Heading>
                </CardHeader>
                <CardBody>
                    <Text fontWeight="bold" mb={2}>{props?.description}</Text>
                    <Text mb={1}><strong>City:</strong> {props?.city?.name}</Text>
                    <Text mb={1}><strong>Area:</strong> {props?.area?.name}</Text>
                    <Text mb={1}><strong>User:</strong> {props?.user?.username}</Text>
                </CardBody>
                <CardFooter >
                    {props?.isAdmin ? (
                        <>
                            {!props.problem_resolved ? (
                                <Button onClick={adminOnOpen} bg="black" color="white" _hover={{ bg: "gray.700" }}>
                                    Mark resolved
                                </Button>
                            ) : (
                                <Box
                                    px={4}
                                    py={2}
                                    borderRadius="md"
                                    bg="green.500"
                                    color="white"
                                    _hover={{ bg: "green.600" }}
                                >
                                    <Text>This problem is already Resolved</Text>
                                </Box>
                            )}
                        </>
                    ) : (
                        <Button onClick={userOnOpen} bg="blue.500" color="white" _hover={{ bg: "blue.600" }}>
                            Add ticket
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </>
    )
}

export default ProblemCard