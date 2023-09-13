import React, { FC } from 'react';
import { Result } from '../../../interface/comic';
import { Button, CardActions, CardContent, Typography, Card, Box } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Spinner from '../spinner/Spinner.component';
import { TEXT_BUTTON } from 'utils/constant';

interface Props {
    result: Result;
    page?: number;
}

const ComicCard: FC<Props> = ({ result, page }) => {
    const router = useRouter();
    const { thumbnail, title, id, stock } = result;

    const handleBack = () => router.push(`/`);
    const handleClick = () => router.push(`/comics/${id}`);
    const handleClickCheckout = () => router.push(`/checkout/${id}`);

    if (!thumbnail) return <Spinner />;

    return (
        <Card 
        sx={{ 
            width: '400px', 
            height: "550px", 
            padding: 3,
            margin: 3,
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: theme => theme.palette.grey[300],
            boxShadow:'0px 4px 6px rgba(0, 0, 0, 1.1)'
        }}>
            <Image
                width={250}
                height={250}
                src={`${thumbnail.path}.${thumbnail.extension}`}
                alt={title}
                priority={true}
                layout="intrinsic"
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography gutterBottom variant="h5" component="div" sx={{ wordWrap: 'break-word', textAlign: 'center' }}>
                    {title}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center", marginTop: 'auto' }}>
                {router.pathname === "/" ? (
                    <>
                        <Button onClick={handleClick} size="medium" variant="outlined" color="primary">
                            {TEXT_BUTTON.DETALLE}
                        </Button>
                        <Button onClick={handleClickCheckout} size="medium" variant="outlined" color="primary">
                            {TEXT_BUTTON.COMPRAR}
                        </Button>
                    </>
                ) : router.pathname === "/comics/[id]" ? (
                    <>
                         <Button onClick={handleBack} size="medium" variant="outlined" color="primary">
                            {TEXT_BUTTON.ATRAS}
                        </Button>
                        <Button 
                            onClick={handleClickCheckout} 
                            disabled={!stock} 
                            size="medium" 
                            variant="outlined" 
                            color="primary"
                        >
                            {stock ? TEXT_BUTTON.COMPRAR : TEXT_BUTTON.SIN_STOCK}
                        </Button>
                    </>
                    
                ) : (
                    <Button onClick={handleClick} size="medium" variant="outlined" color="primary">
                        {TEXT_BUTTON.DETALLE}
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default ComicCard;