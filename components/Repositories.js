import React, { useState } from 'react'
import useSWR from 'swr'
import fetcher from '../lib/fetcher'
import {
    Text,
    Flex,
    Box,
    Link,
    InputGroup,
    Input,
    InputRightElement,
    SimpleGrid
} from '@chakra-ui/react'
import { ExternalLinkIcon, StarIcon, SearchIcon } from '@chakra-ui/icons'

const ProjectItem = ({ name, desc, star_count, href, language }) => {
    const [opacity, setOpacity] = useState(0)

    return (
        <Link href={href}
            isExternal
            _hover={{
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                textDecoration: 'none',
            }}
            onMouseOver={() => setOpacity(1)}
            onMouseLeave={() => setOpacity(0)}
        >

            {/* Repositories */}
            <Box w='100%' rounded="0.5rem" borderWidth="1px" border={`1px solid white`} px={20} backgroundColor="#0C0C17">
                <Flex justify="space-between">
                    <Flex align="center">
                        <Text as="h2" fontSize="xl" fontWeight="medium" color="#fff">{name}</Text>
                        <ExternalLinkIcon ml={2} opacity={opacity} display={['none', 'flex', 'flex']} color="#fff" />
                    </Flex>

                    {/* Stars */}
                    <Flex align="center">
                        <Text color="#fff">{star_count}</Text>
                        <StarIcon ml={2} color="#FFD700" />
                    </Flex>
                </Flex>

                {/* Description */}
                <Flex justify="space-between">
                    <Flex align="center">
                        <Text color="#fff">
                            {desc}
                        </Text>
                    </Flex>

                    {/* Languages */}
                    <Flex align="flex-end">
                        <Text color="#fff" ml={4}>{language}</Text>
                    </Flex>
                </Flex>
            </Box>
        </Link>
    )
}

const Repositories = () => {
    const [searchValue, setSearchValue] = useState('');
    const { data, error } = useSWR('/api/projects', fetcher)
    if (error) return <div style={{ width: '100%' }}>Failed to load projects.</div>

    {/* Search */ }
    if (!data) return (
        <div style={{ width: '100%' }}>
            <InputGroup mb={4} mr={4} w="100%" rounded="0.5rem">
                <Input
                    aria-label="Search Repositories"
                    placeholder="Search Repositories"
                />
                <InputRightElement children={<SearchIcon color="#718096" />} />
            </InputGroup>
            <SimpleGrid columns={1} spacing="20px">
                <ProjectItem key="loading-1" name="---" star_count="---" desc="---" language="---"></ProjectItem>
                <ProjectItem key="loading-2" name="---" star_count="---" desc="---" language="---"></ProjectItem>
            </SimpleGrid>
        </div>
    )

    {/* Sorting by number of stars */ }
    const filteredProjects = Object(data.repos)
        .filter((project) =>
            project.name.toLowerCase().includes(searchValue.toLowerCase())
            || project.description.toLowerCase().includes(searchValue.toLowerCase())
            || project.language?.toLowerCase().includes(searchValue.toLowerCase())
        )
        .sort(
            (a, b) =>
                Number(b.stars) - Number(a.stars)
        )

    return (
        <>
            <InputGroup mb={25} mr={4} w="100%">
                <Input
                    aria-label="Search Repositories"
                    placeholder="Search Repositories"
                    onChange={(e) => setSearchValue(e.target.value)}
                    w="100%"
                    p="10px"
                    rounded="0.4rem"
                />
                <InputRightElement children={<SearchIcon color="#718096" mt={10} mr={10} />} />
            </InputGroup>
            <SimpleGrid columns={1} spacing="20px">
                {!filteredProjects.length && 'No projects found.'}
                {filteredProjects
                    .map((p) => (
                        <ProjectItem key={p.name} name={p.name} star_count={p.stars} href={p.url} desc={p.description} language={p.language}></ProjectItem>
                    ))}
            </SimpleGrid>
        </>
    )
}

export default Repositories