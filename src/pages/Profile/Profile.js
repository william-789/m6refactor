import Empty from "../../components/Empty/Empty";

function Profile() {
  return (
    <div className={"Profile page"}>
      <h1>Favoritos</h1>
      <Empty item={"favoritos"}/>
      <h1>Pagamentos</h1>
      <Empty item={"pagamentos"} />
    </div>
  )
}

export default Profile
