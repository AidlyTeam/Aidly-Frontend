import BadgeList from "@/views/admin/badge-list/BadgeList"

const BadgeListPage = () => <BadgeList />

BadgeListPage.acl = {
    action: 'read',
    permission: 'admin'
}
export default BadgeListPage 