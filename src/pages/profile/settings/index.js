import ProfileSettings from "@/views/profile/ProfileSetting"

const ProfileSettingsPage = () => <ProfileSettings />

ProfileSettingsPage.acl = {
    action: 'read',
    permission: 'home'
}
export default ProfileSettingsPage