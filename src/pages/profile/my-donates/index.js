import ProfileDonate from "@/views/profile/ProfileDonate"

const ProfileDonatePage = () => <ProfileDonate />

ProfileDonatePage.acl = {
    action: 'read',
    permission: 'home'
}
export default ProfileDonatePage