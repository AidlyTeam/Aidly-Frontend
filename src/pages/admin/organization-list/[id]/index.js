import DonateAdminDetils from "@/views/admin/organization-details/OrganizaitonDetails"

const DonateAdminDetilsPage = () => <DonateAdminDetils />

DonateAdminDetilsPage.acl = {
    action: 'read',
    permission: 'admin'
}
export default DonateAdminDetilsPage