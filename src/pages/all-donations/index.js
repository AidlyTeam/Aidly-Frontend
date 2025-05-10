import AllDonations from "@/views/all-donates/AllDonations"

const AllDonationsPage = () => <AllDonations />

AllDonationsPage.acl = {
    action: 'read',
    permission: 'home'
}
export default AllDonationsPage