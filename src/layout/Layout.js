"use client";
import Navbar from "@/layout/components/Navbar";
import Footer from "@/layout/components/Footer";
import ScrollTop from "@/layout/components/ScrollTop";
import { useState, useEffect, Fragment } from "react";
import { Box, IconButton, Drawer, Fab, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import EmergencyIcon from "@mui/icons-material/Campaign";
import CustomBreadcrumbs from "@/components/breadcrumbs";
import { useRouter } from "next/router";
import navigation from "@/navigation";
import findParent from "@/utils/findParent";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Layout = ({ children }) => {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isEmergencyHovered, setIsEmergencyHovered] = useState(false);
    
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md")); 

    const navbarWidth = 300; 
    

    useEffect(() => {
        setMounted(true);
    }, []);

    const titles = findParent(navigation, router.pathname);

    const handleEmergencyClick = () => {
        router.push('/profile/my-campaigns/create?urgent=true');
    };

    if (!mounted) return <>{children}</>;

    return (
        <Fragment>
            <Box sx={{ width: "100%", display: "flex", minHeight: "100vh" }}>
                
                {isMobile && (
                    <IconButton
                        sx={{ 
                            position: "fixed", 
                            top: 16, 
                            right: 16, 
                            zIndex: 1300, 
                            "&:hover": {
                                backgroundColor: mobileOpen ? theme.palette.primary.dark : "transparent",
                            },
                            color: mobileOpen ? "white" : theme.palette.primary.main,
                            borderRadius: "50%",
                        }}
                        onClick={() => setMobileOpen((prev) => !prev)}
                        aria-label="menu"
                        size="large"
                    >
                        <MenuIcon />
                    </IconButton>
                )}

                {!isMobile && (
                    <Box 
                        sx={{
                            position: "fixed", 
                            left: 0, 
                            top: 0,
                            color: "white",
                            zIndex: 1000
                        }}
                    >
                        <Navbar />
                    </Box>
                )}

                <Drawer
                    anchor="right" 
                    open={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                    sx={{
                        "& .MuiDrawer-paper": { 
                            width: navbarWidth, 
                            color: theme.palette.primary.main, 
                        },
                    }}
                >
                    <Navbar isDrawer={true} />
                </Drawer>

                <Box
                    sx={{
                        flexGrow: 1,
                        ml: isMobile ? 0 : `${navbarWidth}px`, 
                        px: 3,
                        py: 5,
                        maxWidth: isMobile ? "100%" : `calc(100% - ${navbarWidth}px)`,
                    }}
                >
                    <CustomBreadcrumbs titles={titles} />
                    

                    <Box sx={{ mt: "1rem" }}>{children}</Box>
                    
                </Box>
            </Box>

            {/* Emergency Help Button */}
            <Box
                onMouseEnter={() => setIsEmergencyHovered(true)}
                onMouseLeave={() => setIsEmergencyHovered(false)}
                onClick={handleEmergencyClick}
                sx={{
                    position: 'fixed',
                    right: isEmergencyHovered ? 0 : -170,
                    bottom: 10,
                    zIndex: 1000,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        background: 'linear-gradient(45deg, #ff0000 30%, #ff6b6b 90%)',
                        color: 'white',
                        padding: '12px 24px',
                        borderRadius: '8px 0 0 8px',
                        boxShadow: '0 4px 20px rgba(255, 0, 0, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        '&:hover': {
                            background: 'linear-gradient(45deg, #ff0000 40%, #ff6b6b 100%)',
                        },
                    }}
                >
                    <EmergencyIcon />
                    <Typography variant="button" sx={{ fontWeight: 'bold' }}>
                        Urgent Campaign
                    </Typography>
                </Box>
            </Box>

            <Footer />
            <ScrollTop />
        </Fragment>
    );
};

export default Layout;
