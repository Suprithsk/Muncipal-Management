import { Box } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react";

import './AdminHome.css'
import AdminHeader from "./AdminHeader"
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import AdminModal from "../pages/AdminModal";
import { useState } from "react";

function AdminHome() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [modalValue,setModalValue]=useState('')
    const navigate=useNavigate()
    return (
        <div>
            <AdminHeader />
            <AdminModal isOpen={isOpen} onClose={onClose} modalValue={modalValue}/>
            <Box className="home__box">
                <Button bg="black" color="white" _hover={{ bg: "gray.700" }} size="lg" onClick={()=>{
                    setModalValue('city')
                    onOpen()
                }}>
                    Add city
                </Button>
                <Button bg="black" color="white" _hover={{ bg: "gray.700" }} size="lg" onClick={()=>{
                    setModalValue('area')
                    onOpen()
                }}>
                    Add area
                </Button>
                <Button bg="black" color="white" _hover={{ bg: "gray.700" }} size="lg" onClick={()=>{
                    navigate('/admin/view-problems')
                }}>
                    View problems
                </Button>
                <Button bg="black" color="white" _hover={{ bg: "gray.700" }} size="lg">
                    View tickets
                </Button>
            </Box>
        </div>
    )
}

export default AdminHome