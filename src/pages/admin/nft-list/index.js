import NFTList from "@/views/admin/nft-list/NFTList"

const NFTListPage = () => <NFTList />

NFTListPage.acl = {
    action: 'read',
    permission: 'admin'
}
export default NFTListPage 