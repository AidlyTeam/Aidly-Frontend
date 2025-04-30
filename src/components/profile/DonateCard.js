import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Grid, 
  Divider 
} from '@mui/material';
import HelpImage from "../../assets/icons/help.png";
import Image from 'next/image';
import { theme } from '@/configs/theme';

const DonationCard = ({ 
  organization, 
  amount, 
  date 
}) => {
  return (
    <Card
      sx={{
        p: 2,
        borderRadius: '16px',
        border : '1px dashed #ccc',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        color: '#fff',
        overflow: 'hidden',
        minHeight: '120px'
      }}
    >
      <Grid container alignItems="center" sx={{ height: '100%' }}>
        <Grid item xs={2} container justifyContent="center" alignItems="center"
          sx={{
          }}
        >
            <Box
                sx={{
                width: '60px',
                height: '60px',
                borderRadius: '80%',
                backgroundColor: '#fff',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Image src={HelpImage} alt="Logo" width={60} height={60} />
            </Box>

        </Grid>

       

        <Grid item xs={9}>
          <CardContent sx={{ paddingBottom: '0 !important' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold',color:theme.palette.secondary.dark  }}>
              {organization}
            </Typography>
            <Typography variant="body2" sx={{color:theme.palette.success.dark}} >
              💸 {amount}
            </Typography>
            <Typography variant="body1" sx={{ color:theme.palette.secondary.light }}>
              📅 {date}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default DonationCard;
