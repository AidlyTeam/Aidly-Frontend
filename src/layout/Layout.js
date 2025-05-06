"use client";
import Navbar from "@/layout/components/Navbar";
import Footer from "@/layout/components/Footer";
import ScrollTop from "@/layout/components/ScrollTop";
import { useState, useEffect, Fragment } from "react";
import { Box, IconButton, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
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
    
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md")); 

    const navbarWidth = 300; 
    

    useEffect(() => {
        setMounted(true);
    }, []);

    const titles = findParent(navigation, router.pathname);

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

            <Footer />
            <ScrollTop />
        </Fragment>
    );
};

export default Layout;
