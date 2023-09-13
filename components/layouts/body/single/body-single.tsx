import * as React from 'react';
import {FC, PropsWithChildren} from "react";
import Container, {ContainerProps} from "@mui/material/Container";
import {Stack, Typography} from "@mui/material";

interface BodySingleProps extends PropsWithChildren {
    title?: string,
    containerProps?: ContainerProps
}

const BodySingle: FC<BodySingleProps> = ({title, containerProps, children}: BodySingleProps) => {
    return (
            <Container maxWidth="xl" {...containerProps}>
                <Stack direction={"column"} display={'flex'} justifyContent={'center'}>
                    {title &&
                        <Typography variant={"h1"} my={3} textAlign={'center'} fontSize={60} fontWeight={1000} color="black"  sx={{
                            WebkitTextStroke: "0.1px white", 
                            textStroke: "0.2px white"
                        }}>
                            {title}
                        </Typography>
                    }
                    {children}
                </Stack>
            </Container>
    );
};
export default BodySingle;
