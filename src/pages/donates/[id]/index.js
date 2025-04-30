import DonateDetils from "@/views/donates/DonateDetailPages"

const DonateDetailsPage = () => <DonateDetils />

DonateDetailsPage.acl = {
    action: 'read',
    permission: 'home'
}
export default DonateDetailsPage