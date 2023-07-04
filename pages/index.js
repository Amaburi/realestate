import Link from 'next/link';
import Image from 'next/image';
import { Flex, Box, Text, Button } from '@chakra-ui/react';

import { baseUrl, fetchApi } from '../utils/fetch';
import Property from '../components/prpty';

export const Banner = ({ purpose, title1, title2, desc1, desc2, buttonText, linkName, imageUrl }) => (
  <Flex flexWrap='wrap' justifyContent='center' alignItems='center' m='10'>
    <Image src={imageUrl} width={500} height={300} />
    <Box p='5'>
      <Text color='gray.500' fontSize='sm' fontWeight='medium'>{purpose}</Text>
      <Text fontSize='3xl' fontWeight='bold'>{title1}<br />{title2}</Text>
      <Text fontSize='lg' paddingTop='3' paddingBottom='3' color='gray.700'>{desc1}<br />{desc2}</Text>
      <Button fontSize='xl' bg="blue.300" color="white">
        <Link href={linkName}><a>{buttonText}</a></Link>
      </Button>
    </Box>
  </Flex>
);

const index = ({propertyForSale, propertyForRent}) => {
  console.log(propertyForRent,propertyForSale)
  return (
    <Box>
      <Banner purpose={'For sale'} title1='Rental Homes For' title2='Everyone' desc1='Explore Apartments, Home, villas, etx' buttonText='Explore now' linkName='/search?purpose=for-rent' imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'/>
      <Flex flexWrap='wrap'>
        {propertyForRent.map((property)=> <Property property={property} key={property.id}/>)}
      </Flex>
      <Banner purpose={'Buy a House'} title1='Find your own' title2='Dream house' desc1='Explore Apartments, Home, villas, etx' buttonText='Explore now' linkName='/search?purpose=for-sale' imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'/>
      {propertyForSale.map((property)=> <Property property={property} key={property.id}/>)}

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

export default index