import Safe from '../safe'

module.exports = async function (app) {

  const Shop = app.models.Shop
  const ShopStaff = app.models.ShopStaff
  const ShopMember = app.models.ShopMember

  const Role = app.models.Role
  const RoleMapping = app.models.RoleMapping

  let err, isCreated;

  // CREATE SHOPS ------------------------------------------------------------
  let shop = await Shop.findOne({ where: { name: 'Apple' } })
  console.log(shop)

  // CREATE STAFFS ------------------------------------------------------------
  let staff;
  [err, [staff, isCreated]] = await Safe(ShopStaff.findOrCreate({
    shopId: shop.id,
    username: 'appleStaff',
    email: 'appleStaff@example.com',
  }, { password: '12345678' }));

  [err, staff] = await Safe(staff.save())

  if (err)
    throw `ERROR: ${err}`

  console.log(`isCreated: ${isCreated}`)
  console.log(staff)

  // CREATE MEMBERS ------------------------------------------------------------
  let member;
  [member, isCreated] = await ShopMember.findOrCreate({
    where: {
      shopId: shop.id,
      username: 'member01',
      email: 'member01@example.com',
    }
  }, {
    password: '12345678'
  })

  console.log(isCreated)
  console.log(member)
  // CREATE ROLES ------------------------------------------------------------
  let role;
  [err, [role, isCreated]] = await Safe(Role.findOrCreate({
    name: 'staff'
  }))

  if (err)
       throw `ERROR: ${err}`

  console.log(`isCreated: ${isCreated}`)
  console.log(role)

  // CREATE Principals ------------------------------------------------------------

  let data = {
    principalType: RoleMapping.USER,
    principalId: staff.id
  }

  let principal;
  [err, principal] = await Safe(role.principals.findOne(data))

  if (err)
    throw `ERROR: ${err}`

  if (!principal) {
    console.log("principal not exists")
    [err, principal] = await Safe(
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: staff.id
      })
    )
    if (err)
      throw `ERROR: ${err}`
  }

  console.log(principal)

  // [err, [principal, isCreated]] = await Safe(role.principals.create({
  //   principalType: RoleMapping.USER,
  //   principalId: 1
  // }))

  // if (err) {
  //   console.log(`ERROR: ${err}`)
  //   return
  // }

  // console.log(`isCreated: ${isCreated}`)
  // console.log(principal)

  // Shop.findOne({})
  // User.findOne({
  //     where: {
  //       username: 'martin'
  //     }
  //   }, function (err, user) {
  //     Role.findOne({
  //         where: {
  //           name: 'admin'
  //         },
  //         function (err, role) {
  //           if (err) throw err

  //           //make bob an admin
  //           role.principals.create({
  //             principalType: RoleMapping.USER,
  //             principalId: user.id
  //           }, function (err, principal) {
  //             throw err
  //           })
  //         }
  //       })
  //     })

}
