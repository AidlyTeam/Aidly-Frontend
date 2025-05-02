
import CreateOrganizations from "@/views/profile/CreateOrganizations"

const CreateOrganizationsPage = () => <CreateOrganizations />

CreateOrganizationsPage.acl = {
    action: 'read',
    permission: 'home'
}
export default CreateOrganizationsPage