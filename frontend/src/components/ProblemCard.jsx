import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Button } from '@chakra-ui/react'
import './ProblemCard.css'
import AdminConfirmation from "../pages/AdminConfirmation"
import { useDisclosure } from '@chakra-ui/react'

function ProblemCard(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <AdminConfirmation isOpen={isOpen} onClose={onClose} refreshPage={props.refreshPage} problem_id={props.problem_id} />
            <Card ml={4} className='admin-card'>
                <CardHeader>
                    <Heading size='md'>{props.title}</Heading>
                </CardHeader>
                <CardBody>
                    <Text>{props.description}</Text>
                    <Text>{props.city.name}</Text>
                    <Text>{props.area.name}</Text>
                    <Text>{props.user.username}</Text>
                </CardBody>
                <CardFooter>
                    {!props.problem_resolved && <Button onClick={onOpen}>Mark resolved</Button>}
                    {props.problem_resolved && <Text>Resolved</Text>}
                </CardFooter>
            </Card>
        </>
    )
}

export default ProblemCard