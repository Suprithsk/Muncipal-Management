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
import { useEffect } from 'react'
import { useState } from 'react'
import { Select } from "@chakra-ui/react"
import {
    Alert,
    AlertIcon,
} from '@chakra-ui/react'

import { createCity, getAllCities, createArea } from '../apis/adminApis'


function AdminModal({ isOpen, onClose, modalValue }) {

    const [options, setOptions] = useState([])
    const [cityName, setCityName] = useState('')
    const [cityId, setCityId] = useState('')
    const [areaName, setAreaName] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    useEffect(() => {
        async function fetchData() {
            try {
                if (modalValue === 'area') {
                    const cities = await getAllCities(); 
                    setOptions(cities); 
                    console.log(cities); 
                }
            } catch (error) {
                console.error('Error fetching cities:', error); 
            }
        }
        fetchData()
        return ()=>{
            setOptions([])
            setSuccessMessage('')
            setAreaName('')
            setCityName('')
            setCityId('')
        }
    }, [modalValue,isOpen])

    const onAddButtonHandler = async () => {
        if(cityName===''){
            return
        }
        //! add city to backend
        try {
            await createCity(cityName)
            setSuccessMessage('City added successfully')
        } catch (err) {
            console.log(err)
        }
    }
    const updateAreaHandler = async () => {
        //? add area to backend
        if(areaName==='' || cityId===''){
            return
        }
        try{
            await createArea(areaName, cityId)
        }catch(err){
            console.log(err)
        }
        setSuccessMessage('Area added successfully')
    }
    const onCloseHandler=()=>{
        setSuccessMessage('')
        setAreaName('')
        setCityName('')
        setCityId('')
        onClose()
    }
    return (
        <>
            {modalValue === 'city' &&
                <>
                    <Modal
                        isOpen={isOpen}
                        onClose={onCloseHandler}
                    >
                        <ModalOverlay />
                        <ModalContent>
                            
                            <ModalHeader>Add city</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                            {successMessage !== '' && (
                                <Alert status='success' mb={3}>
                                    <AlertIcon />
                                    {successMessage}
                                </Alert>)}
                                <FormControl>
                                    <FormLabel>City</FormLabel>
                                    <Input onChange={(e) => {
                                        setCityName(e.target.value)
                                    }} placeholder='City' value={cityName} />
                                </FormControl>
                            </ModalBody>

                            <ModalFooter>
                                <Button bg="black" color="white" mr={3} _hover={{ bg: "gray.700" }} onClick={onAddButtonHandler}>
                                    Add
                                </Button>
                                <Button onClick={onCloseHandler}>Cancel</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </>
            }
            {modalValue === 'area' &&
                <Modal
                    isOpen={isOpen}
                    onClose={onCloseHandler}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Add area</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            {successMessage !== '' && (
                                <Alert status='success' mb={3}>
                                    <AlertIcon />
                                    {successMessage}
                                </Alert>)}
                            <Select placeholder='select city' onChange={(e) => {
                                setCityId(e.target.value)
                            }}>
                                {options.map(option => <option key={option._id} value={option._id}>{option.name}</option>)}
                            </Select>
                            <FormControl>
                                <FormLabel>Area</FormLabel>
                                <Input value={areaName} placeholder='Area' onChange={(e) => {
                                    setAreaName(e.target.value)
                                }} />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={updateAreaHandler}>
                                Add
                            </Button>
                            <Button onClick={onCloseHandler}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>}
        </>
    )
}

export default AdminModal