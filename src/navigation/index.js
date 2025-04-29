import { HelpCenter, Home, People, Settings } from "@mui/icons-material";
import Groups3Icon from '@mui/icons-material/Groups3';
import Person3Icon from '@mui/icons-material/Person3';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
/*
    @data structure
    {
        type: "item" | "category" | "divider",
        path: string,
        title: string,
        role: "user" | "admin",
        icon: ReactNode,
        children: array(item)
    }
*/

const navigation = [
    { // item with children
        type: "item",
        title: "Profile",
        permission: "team",
        icon: <Person3Icon />,
        children: [
            {
                type: "item",
                path: "/profile/info",
                title: "My Info",
                permission: "team-members",
                icon: <SettingsAccessibilityIcon />,
            },
            {
                type: "item",
                path: "/profile/my-donates",
                title: "My Donates",
                permission: "team-members",
                icon: <LoyaltyIcon />,
            },
            {
                type: "item",
                path: "/profile/settings",
                title: "Settings",
                role: "admin",
                permission: "team-settings",
                icon: <Settings />
            }
        ]
    },
    // divider
    { 
        type: "divider",
        permission: "home",
    },
    { // single item
        type: "item",
        path: "/home",
        title: "Home",
        icon: <Home />,
        permission: "home",
    },
    { // single item
        type: "item",
        path: "/donates",
        title: "All Donates",
        icon: <VolunteerActivismIcon />,
        permission: "home",
    },
 
    // { // item with children
    //     type: "item",
    //     title: "Team",
    //     permission: "team",
    //     icon: <Groups3Icon />,
    //     children: [
    //         {
    //             type: "item",
    //             path: "/team/members",
    //             title: "Members",
    //             permission: "team-members",
    //             icon: <People />,
    //         },
    //         {
    //             type: "item",
    //             path: "/team/settings",
    //             title: "Settings",
    //             role: "admin",
    //             permission: "team-settings",
    //             icon: <Settings />
    //         }
    //     ]
    // },
]

export default navigation;