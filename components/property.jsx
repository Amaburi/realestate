import Link from 'next/link';
import Image from 'next/image';
import { Box, Flex, Text, Avatar } from '@chakra-ui/react';
import {FaBed, FaBath} from 'react-icons/fa';
import {BsGridFill} from 'react-icons/bs';

import millify from 'millify';

const property = ({property: {coverPhoto, price, rentFrequency, rooms, title, baths, area, agency, isVerified, externalId}}) => {
    <Link href={`/property/${externalId}`} passHref>
        {title}
    </Link>
}
export default property;