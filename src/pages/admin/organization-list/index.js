import OrganizationList from "@/views/admin/organization-list/OrganizationList"

const OrganizationListPage = () => <OrganizationList />

OrganizationListPage.acl = {
    action: 'read',
    permission: 'admin'
}
export default OrganizationListPage