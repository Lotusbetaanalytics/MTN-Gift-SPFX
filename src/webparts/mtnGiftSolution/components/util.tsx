//   const updateHandler = () => {
//     setLoading(true);
//     sp.web.lists
//       .getByTitle("GiftBeneficiaries")
//       .items.getById(Number(ID))
//       .update({
//         CollectionStatus: "Collected",
//         LocationChampionEmail: employeeEmail,
//         CollectedBy: pickupPerson,
//         ProxyType: proxyType,
//       })
//       .then((res) => {
//         sp.web.lists
//           .getByTitle("Report")
//           .items.add({
//             Phone: phone,
//             Surname: surname,
//             FirstName: FirstName,
//             JobTitle: jobTitle,
//             Email: Email,
//             Location: location,
//             PickupLocation: pickupLocation,
//             PickupPerson: pickupPerson,
//             DelegateFullname: delegateFullname,
//             DelegatePhone: delegatePhone,
//             UniqueCode: uniqueCode,
//             Division: division,
//             Vendor: vendor,
//             CollectionStatus: "Collected",
//             Date: date,
//             Time: time,
//           })
//           .then((response) => {
//             sp.web.lists
//               .getByTitle("GiftBeneficiaries")
//               .items.getById(Number(ID))
//               .delete()
//               .then((deleted) => {
//                 setLoading(false);
//                 setModal(false);
//                 swal("Success", "Confirmation successful", "success");
//                 history.push("/locationchampion/report");
//               })
//               .catch((e) => {
//                 swal("Warning!", "An Error Occured, Try Again!", "error");
//                 console.error(e);
//               });
//           });
//       })
//       .catch((e) => {
//         swal("Warning!", "An Error Occured, Try Again!", "error");
//         console.error(e);
//       });
//   };
