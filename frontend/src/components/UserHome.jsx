import { Box } from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

import UserModal from "../pages/UserModal";
import Header from "./Header"
import { useNavigate } from "react-router-dom";


function UserHome() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate=useNavigate()
    return (
        <div>
            <Header />
            <UserModal isOpen={isOpen} onClose={onClose} onOpen={onOpen}/>
            <Box className="home__box">
                <Button bg="black" color="white" _hover={{ bg: "gray.700" }} size="lg" onClick={()=>{
                    onOpen()
                }}>
                    Add problem
                </Button>
                <Button bg="black" color="white" _hover={{ bg: "gray.700" }} size="lg" onClick={()=>{
                    navigate('/user/view-problems')
                }}>
                    View problems
                </Button>
                <Button bg="black" color="white" _hover={{ bg: "gray.700" }} size="lg" onClick={()=>{
                    navigate('/user/view-tickets')
                }}>
                    View tickets
                </Button>
            </Box>
        </div>
    )
}

export default UserHome