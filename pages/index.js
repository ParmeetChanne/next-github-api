import React from 'react'
import {
    Stack,
    Flex,
    Heading,
} from '@chakra-ui/react'

import Repositories from '../components/Repositories'

const Github = () => {

    return (
        <div style={{ backgroundColor: '#03030F' }}>
            <Stack
                as="main"
                spacing={8}
                justifyContent="center"
                alignItems="center"
                m="0 auto 4rem auto"
                maxWidth="700px"
            >
                <Flex
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    maxWidth="700px"
                    px={4}
                >
                    <Heading letterSpacing="tight" as="h1" mb={50} pt={50} fontSize="3rem" fontWeight={700} color="#fff">
                        Repositories
                    </Heading>
                    <Repositories />
                </Flex>
            </Stack>
        </div>
    )
}

export default Github