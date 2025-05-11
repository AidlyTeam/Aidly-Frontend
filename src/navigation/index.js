import { HelpCenter, Home, People, Settings } from "@mui/icons-material";
import Groups3Icon from '@mui/icons-material/Groups3';
import Person3Icon from '@mui/icons-material/Person3';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ListIcon from '@mui/icons-material/List';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import PolylineIcon from '@mui/icons-material/Polyline';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PaymentsIcon from '@mui/icons-material/Payments';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
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
                path: "/profile/my-campaigns",
                title: "My Campaigns",
                permission: "team-members",
                icon: <PolylineIcon />,
            },
            {
                type: "item",
                path: "/profile/my-donates",
                title: "My Donates",
                permission: "team-members",
                icon: <LoyaltyIcon />,
            },
        
        ]
    },
    // divider
    { 
        type: "divider",
        permission: "admin",
    },
    { // single item
        type: "item",
        path: "/admin/user-list",
        title: "Users",
        icon: <PeopleAltIcon />,
        permission: "admin",
    },
    { // single item
        type: "item",
        path: "/admin/campaigns-list",
        title: "Campaigns",
        icon: <CorporateFareIcon />,
        permission: "admin",
    },
    { // single item
        type: "item",
        path: "/admin/badge-list",
        title: "Badges",
        icon: <EmojiEventsIcon />,
        permission: "admin",
    },
    { // single item
        type: "item",
        path: "/admin/nft-list",
        title: "NFTs",
        icon: <AutoAwesomeIcon />,
        permission: "admin",
    },
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
        title: "All Campaigns",
        icon: <VolunteerActivismIcon />,
        permission: "home",
    },
    { // single item
        type: "item",
        path: "/all-donations",
        title: "All Donations",
        icon: <PaymentsIcon />,
        permission: "home",
    },
    { 
        type: "divider",
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