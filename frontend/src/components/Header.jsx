import { Box, Text } from "@chakra-ui/react"
import './Header.css'

function Header() {
  return (
    <Box bg="black" p={4} color={`white`} display="flex"  justifyContent="space-between" >
        <Text fontSize="2xl" fontWeight="bold" cursor={`pointer`}>
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

export default Header