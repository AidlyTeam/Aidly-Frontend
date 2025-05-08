
import EditOrganizations from "@/views/profile/EditOrganizations"

const EditOrganizationsPage = () => <EditOrganizations />

EditOrganizationsPage.acl = {
    action: 'read',
    permission: 'home'
}
export default EditOrganizationsPage