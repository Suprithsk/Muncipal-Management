import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { Button, Input, FormControl, FormLabel, Select } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import {
    Alert,
    AlertIcon,
} from '@chakra-ui/react'

import { getAllCities, getAreasByCityId,createProblem } from '../apis/userApis'

function UserModal({ isOpen, onClose }) {
    const user_id = '66642e8cc51925526ce0ecc2'
    const [cityOptions, setCityOptions] = useState([])
    const [cityId, setCityId] = useState('')
    const [problemTitle, setProblemTitle] = useState('')
    const [problemDescription, setProblemDescription] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [areaOptions, setAreaOptions] = useState([])
    const [areaId, setAreaId] = useState('')
    async function fetchData() {
        console.log('fetching data')
        try {
            const cities = await getAllCities()
            setCityOptions(cities)
        } catch (error) {
            console.error('Error fetching cities:', error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [isOpen])
    
    const addButtonHandler = async () => {
        if (problemTitle === '' || problemDescription === '' || cityId === '' || areaId === '') {
            return
        }
        try {
            //! add problem to backend
            await createProblem(problemTitle ,problemDescription, cityId, areaId, user_id)
            setSuccessMessage('Problem added successfully')
        } catch (err) {
            console.log(err)
        }
    }
    const onCloseHandler=()=>{
        setSuccessMessage('')
        setProblemTitle('')
        setProblemDescription('')
        setCityId('')
        setAreaId('')
        setAreaOptions([])
        setCityOptions([])
        onClose()
    }
    return (
        <Modal
            isOpen={isOpen}
            onClose={onCloseHandler}
        >
            <ModalOverlay />
            <ModalContent>

                <ModalHeader>Add problem</ModalHeader>
                <ModalCloseButton onClick={onCloseHandler}/>
                <ModalBody pb={6}>
                {successMessage !== '' && (
                                <Alert status='success' mb={3}>
                                    <AlertIcon />
                                    {successMessage}
                                </Alert>)}
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input onChange={(e)=>setProblemTitle(e.target.value)} value={problemTitle}placeholder='Title' />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Description</FormLabel>
                        <Input onChange={(e)=>setProblemDescription(e.target.value)} value={problemDescription} placeholder='Description' />
                    </FormControl>

                    <Select placeholder='select city' mb={4} onChange={async (e) => {
                        if (e.target.value === '') {
                            setAreaOptions([])
                            setCityId('')
                            return
                        }
                        setCityId(e.target.value)
                        const areas = await getAreasByCityId(e.target.value)
                        setAreaOptions(areas)
                    }}>
                        {cityOptions.map(option => <option key={option._id} value={option._id}>{option.name}</option>)}
                    </Select>
                    <Select mb={4} placeholder={areaOptions.length == 0 ? `Select a city first` : `Select an area`} onChange={(e) => {
                        setAreaId(e.target.value)
                    }}>
                        {areaOptions.map(option => <option key={option._id} value={option._id}>{option.name}</option>)}
                    </Select>
                </ModalBody>

                <ModalFooter>
                    <Button bg="black" color="white" mr={3} _hover={{ bg: "gray.700" }} onClick={addButtonHandler}>
                        Add
                    </Button>
                    <Button onClick={() => {
                        onCloseHandler()
                    }}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default UserModal