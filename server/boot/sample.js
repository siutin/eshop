import Safe from '../safe'

async function saveOrThrow(fnCall) {
    let err, isCreated;
    let resource;
    [err, [resource, isCreated]] = await Safe(fnCall);
    [err, resource] = await Safe(resource.save())
    if (err)
      throw `ERROR: ${err}`

    console.log(`isCreated: ${isCreated}`)
    return resource
}

module.exports = async function (app) {

  const Product = app.models.Product
  const Shop = app.models.Shop
  const ShopStaff = app.models.ShopStaff
  const ShopMember = app.models.ShopMember

  const Role = app.models.Role
  const RoleMapping = app.models.RoleMapping

  // CREATE SHOPS & Products ------------------------------------------------------------

  let shop1 = await saveOrThrow(Shop.findOrCreate({name: 'Apple'}))
  console.log('shop1:', shop1)

  let shop2 = await saveOrThrow(Shop.findOrCreate({ name: 'Samsung' }))
  console.log('shop2:', shop2)

  let product1 = await saveOrThrow(Product.findOrCreate({
     where: {
        "name": "iPhone 8",
        "shop_id": shop1.id
     }
  },{
     "name": "iPhone 8",
     "shop_id": shop1.id,
     "inventory": 10,
     "price": 5199,
     "is_published": true,
       "tags": [
         "phone",
         "apple"
       ]
  }))
  console.log('product1:', product1)

  let product2 = await saveOrThrow(Product.findOrCreate({
   where: {
      "name": "Galaxy J7 Neo",
      "shopId": shop2.id
   }
  }, {
     "name": "Galaxy J7 Neo",
     "shopId": shop2.id,
    "inventory": 10,
    "price": 1074,
    "isPublished": true,
    "tags": [
      "phone",
      "apple"
    ]
  }))
  console.log('product2:', product2)

  let product3 = await saveOrThrow(Product.findOrCreate({
    where: {
      "name": "Macbook Air",
      "shopId": shop1.id
    }
  }, {
    "name": "Macbook Air",
    "shopId": shop1.id,
    "inventory": 24,
    "price": 9999,
    "isPublished": true,
    "tags": [
      "laptop",
      "apple"
    ]
  }))
  console.log('product3:', product3)

  // CREATE STAFFS ------------------------------------------------------------
  let staff1 = await saveOrThrow(
    ShopStaff.findOrCreate({
          shopId: shop1.id,
          username: 'appleStaff',
          email: 'appleStaff@example.com',
        }, {
          password: '12345678'
        }
    )
  );
  console.log('staff1:', staff1)

  // CREATE MEMBERS ------------------------------------------------------------

  let member1 = await saveOrThrow(
    ShopMember.findOrCreate({
          where: {
            shopId: shop1.id,
            username: 'member01',
            email: 'member01@example.com',
          }
        }, {
          password: '12345678'
        }
    )
  );
  console.log('member1:', member1)

  // CREATE ROLES ------------------------------------------------------------

  let role1 = await saveOrThrow(
    Role.findOrCreate({
      name: 'staff'
    })
  );
  console.log('role1:', role1)

  // CREATE Principals ------------------------------------------------------------

  // let data = {
  //   principalType: RoleMapping.USER,
  //   principalId: staff.id
  // }

  // let principal;
  // [err, principal] = await Safe(role.principals.findOne(data))

  // if (err)
  //   throw `ERROR: ${err}`

  // if (!principal) {
  //   console.log("principal not exists")
  //   [err, principal] = await Safe(
  //     role.principals.create({
  //       principalType: RoleMapping.USER,
  //       principalId: staff.id
  //     })
  //   )
  //   if (err)
  //     throw `ERROR: ${err}`
  // }

  // console.log(principal)


/// ---


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
