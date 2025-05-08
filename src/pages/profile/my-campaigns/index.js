MyOrganizations
import MyOrganizations from "@/views/profile/MyOrganizations"

const MyOrganizationsPage = () => <MyOrganizations />

MyOrganizationsPage.acl = {
    action: 'read',
    permission: 'home'
}
export default MyOrganizationsPage