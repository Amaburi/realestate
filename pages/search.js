import {useState} from 'react';
import {useRouter} from 'next/router';
import Image from 'next/image';
import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';
import SearchFilters from '../components/SearchFilters';

import Property from '../components/prpty';

import noresult from '../assets/images/noresult.svg';
const Search = () =>{
    const [searchFilters, setSearchFilters] = useState(false);
    const router = useRouter();

    return(
        <Box>
            <Flex cursor='pointer' bg='gray.100' borderBottom='1px' borderColor='gray.200' p='2' fontWeight='black' fontSize='large' justifyContent='center' alignItems='center' onClick={( )=> setSearchFilters((prevFilters)=> !prevFilters)}>
                <Text>Search By Filter</Text>
                <Icon paddingLeft='2' w='7' as={BsFilter}/>
            </Flex>
            {searchFilters && <SearchFilters/>}
            <Text fontSize='2xl' p='4' fontWeight='bold'>
                Properties {router.query.purpose}
            </Text>
            <Flex flexWrap='wrap'>
                {[].map((property)=> <Property property={property} key={property.id}/>)}
            </Flex>
            {[].length=== 0 &&(
                <Flex justifyContent='center' alignContent='center' flexDirection='column' marginTop='5' marginBottom='5'>
                    <Image alt='no-result' src={noresult}/>
                    <Text fontSize='2xl' marginTop='3'>No Results</Text>
                </Flex>
            )}
        </Box>
    )
}

export async function getStaticProps(){
    const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`)
    const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`)
    return{
      props: {
        propertyForSale: propertyForSale?.hits,
        propertyForRent: propertyForRent?.hits
      }
    }
}

export default Search;