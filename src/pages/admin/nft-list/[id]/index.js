import NFTDetails from "@/views/admin/nft-list/NFTDetails"

const NFTDetailsPage = () => <NFTDetails />

NFTDetailsPage.acl = {
    action: 'read',
    permission: 'admin'
}
export default NFTDetailsPage 