import { Heading, Box, AspectRatio, Grid, GridItem,
  useBreakpointValue, Container, Button, HStack  } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'

export interface HeroProps {
  title: string;
  detail?: string;
  theme: 'light' | 'dark';
  imgOverlayPer?: number;
  backgroundImage: {
    src: string;
    alt: string;
  };
  horPos: 'left' | 'right' | 'center';
  verPos: 'top' | 'middle' | 'bottom';
  pagePos?: number;
  textPos?: 'start' | 'center' | 'end';
  cta?: CTABtn[]
}

export interface CTABtn {
  label: string;
  link: string;
  external: boolean;
}

enum BtnAlign {
  start = 'flex-start',
  center = 'center',
  end = 'flex-end'
}

enum VerPos {
  top = 1,
  middle = 2,
  bottom = 3
}

enum Theme {
  dark = -1,
  light = 1
}

const posPropMd = { 
  left: {
    col: 1,
    span: 8,
  },
  right: {
    col: 12,
    span: 8
  },
  center: {
    col: 3,
    span: 8
  }
}

const posPropLG = { 
  left: {
    col: 1,
    span: 6,
  },
  right: {
    col: 12,
    span: 6
  },
  center: {
    col: 4,
    span: 6
  }
}

const posProMobile = {
  col: 1,
  span: 12
}

const Hero = ({
  title, detail, theme, imgOverlayPer = 0,
  textPos = "start", cta,
  backgroundImage, horPos = 'center', verPos = 'middle', pagePos = 0 }: HeroProps) => {
  const variant = useBreakpointValue({ base: posProMobile, md: posPropMd[horPos], lg: posPropLG[horPos] })
  const ratio = useBreakpointValue({ base: 3 / 4, sm: 7 / 3})
  const decOverlay = imgOverlayPer / 100;

  return (
    <AspectRatio w="100%" ratio={ratio} >
      <Box>
        <Box position="absolute" w="100%" h="100%" top="0"
            zIndex="-1"
            filter={`brightness(${theme && imgOverlayPer ? 1 + (Theme[theme] * decOverlay) : 1})`}
            >
            <Image
                layout="fill"
                  objectFit="cover" objectPosition="center" {...backgroundImage} />
        </Box>
        <Container h="100%"  maxW="100%">
          <Grid
            h="100%"
            templateRows="repeat(3, 1fr)"
            templateColumns="repeat(12, 1fr)">
            {(title || detail) && <GridItem rowStart={VerPos[verPos]}
                alignSelf="center"
                textAlign={textPos}
                color={theme === 'dark' ? 'white' : 'black'}
                colStart={variant?.col}
                colSpan={variant?.span}>
                {title && <Heading as={pagePos > 0 ? 'h2' : 'h1'}>
                  {title}
                </Heading>
                }
                {detail && <Box maxW="300px">{detail}</Box>}
                {(cta?.length > 0) && <HStack justifyContent={BtnAlign[textPos]} spacing={2} py={2}>
                    {cta && cta.map(({label, link, external}, i) => {
                      if ( external) {
                        return <Button as="a"
                                key={label + i}
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                cursor="pointer"
                                colorScheme="purple" size="md">
                              {label}
                              </Button>
                      }
                      return (<Link key={label + i} href={link}>
                            <Button as="a"
                              href=""
                              cursor="pointer"
                              colorScheme="purple" size="md">{label}</Button>     
                        </Link>)
                      })}
                  </HStack>}
              </GridItem>}
          </Grid>
        </Container>
      </Box>
    </AspectRatio>
  )
}

export default Hero