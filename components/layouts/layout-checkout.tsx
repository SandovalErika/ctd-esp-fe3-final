import * as React from 'react';
import {FC, PropsWithChildren} from "react";
import {Stack} from "@mui/material";
import Box from "@mui/material/Box";
import GeneralHeader from "dh-marvel/components/layouts/header/general-header.component";
import GeneralFooter from "dh-marvel/components/layouts/footer/general-footer.component";
import Head from "next/head";


interface Props {
    children: React.ReactNode;
    title: string
}

const LayoutCheckout: FC<Props> = ({children, title}: Props) => {

    return (<>
            <Head>
				<title>{title}</title>
				<meta charSet="utf-8" />
				<meta name="author" content="Erika Sandoval" />
                <link rel="icon" type="image/png" sizes="16x16" href="/img/marvel.png" />
				{/* <meta
					name="description"
					content={description || "Marvel API es una tienda para comprar comics y conocer las serie de comics, historias de comics, eventos, creadores y personajes de marvel"}
				/>
				<meta
					name="keywords"
					content={keywords || "marvel, comics, comic, personjes marvel, historia de marvel, creadores de marvel, marvel api"}
				/>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
				Redes sociales
				<meta property='og:title' content={title || "Ecommerce Marvel"} />
				<meta property='og:description' content={description || "Marvel API es una tienda para comprar comics y conocer las serie de comics, historias de comics, eventos, creadores y personajes de marvel"} />
				<meta property='og:image' content='/img/marvel.png' />
				<meta property='og:type' content='website' />
				<link rel="icon" href="/favicon.ico" />
				<meta charSet='utf-8' />  */}
            </Head>
            <Stack direction={"column"} height={'100%'}>
                <GeneralHeader variant={'simple'}/>
                <Box display={'flex'} flexGrow={1}>
                    {children}
                </Box>
                <GeneralFooter />
            </Stack>
        </>
    );
};
export default LayoutCheckout;
