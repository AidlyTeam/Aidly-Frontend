import BadgeDetails from "@/views/admin/badge-list/BadgeDetails"

const BadgeAdminDetilsPage = () => <BadgeDetails />

BadgeAdminDetilsPage.acl = {
    action: 'read',
    permission: 'admin'
}
export default BadgeAdminDetilsPage