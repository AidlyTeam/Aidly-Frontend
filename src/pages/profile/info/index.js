import Profile from "@/views/profile/ProfileInfo"

const ProfilePage = () => <Profile />

ProfilePage.acl = {
    action: 'read',
    permission: 'home'
}
export default ProfilePage