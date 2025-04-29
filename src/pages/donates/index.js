import Donate from "@/views/donates/DonatePages"

const DonatePage = () => <Donate />

DonatePage.acl = {
    action: 'read',
    permission: 'home'
}
export default DonatePage