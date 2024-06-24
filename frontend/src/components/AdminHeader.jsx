import { Box, Text } from "@chakra-ui/react"
import './AdminHeader.css'
import { useNavigate } from "react-router-dom"

function AdminHeader() {
    const navigate=useNavigate()
    return (
        <Box bg="black" p={4} color={`white`} display="flex" justifyContent="space-between" >
            <Text fontSize="2xl" fontWeight="bold" cursor={`pointer`} onClick={()=>{
                navigate('/admin')
            }}>
                Muncipal management
            </Text>
            <Box display="flex" className="flex-box__second" >
                <Text>
                    Home
                </Text>
            </Box>
        </Box>
    )
}

export default AdminHeader