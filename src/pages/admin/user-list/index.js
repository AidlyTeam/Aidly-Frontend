import UserList from "@/views/admin/user-list/UserList"

const UsersPage = () => <UserList />

UsersPage.acl = {
    action: 'read',
    permission: 'admin'
}
export default UsersPage