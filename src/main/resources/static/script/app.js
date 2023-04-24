const urlShowAllUser = "http://localhost:8080/api/v1/users/showAll/";
const urlCreateUser = "http://localhost:8080/api/v1/user/create/";
const urlUpdateUser = "http://localhost:8080/api/v1/user/update/";
const urlDeleteUser = "http://localhost:8080/api/v1/user/delete/";

const urlGetUser = "http://localhost:8080/api/v1/user/";
const urlGetAllRoles = "http://localhost:8080/api/v1/allRoles/"
// Поля для модального окна редактирования
const userId = document.getElementById("userId");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const age = document.getElementById("age");
const email = document.getElementById("email");
const password = document.getElementById("password");
let roles = document.getElementById("roles");
let UserRoles = [];
const formEdit = document.getElementById("formEdit");

let option = "";
// Поля для модального окна удаления
const userIdDel = document.getElementById("userIdDel");
const firstnameDel = document.getElementById("firstnameDel");
const lastnameDel = document.getElementById("lastnameDel");
const ageDel = document.getElementById("ageDel");
const emailDel = document.getElementById("emailDel");
const passwordDel = document.getElementById("passwordDel");
const rolesDel = document.getElementById("rolesDel");
const formDelete = document.getElementById("formDelete");

// Поля для создания юзера
const userIdNew = document.getElementById("userIdNew");
const firstnameNew = document.getElementById("firstnameNew");
const lastnameNew = document.getElementById("lastnameNew");
const ageNew = document.getElementById("ageNew");
const emailNew = document.getElementById("emailNew");
const passwordNew = document.getElementById("passwordNew");
const rolesNew = document.getElementById("rolesNew");
const formCreate = document.getElementById("formCreate");


const modalEdit = new bootstrap.Modal(document.getElementById("modalEdit"));
const modalDelete = new bootstrap.Modal(document.getElementById("modalDelete"));
let tbody = document.getElementById("adminTableBody");

let resultBuildTbody = "";

buildTableUsers();
async function buildTableUsers(jsonUsers) {
    await fetch(urlShowAllUser, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(allUsers => {
            allUsers.forEach(user => {

                let userRoles = "";

                for (let i = 0; i < user.roles.length; i++) {
                    userRoles += user.roles[i].roleName.substring(5) + " ";
                }


                resultBuildTbody +=
                    "<tr class='pb-3'>" +
                        "<td>"+ user.id +"</td>" +
                        "<td>"+ user.username +"</td>" +
                        "<td>"+ user.lastname +"</td>" +
                        "<td>"+ user.age +"</td>" +
                        "<td>"+ user.email +"</td>" +
                        "<td>"+ userRoles +"</td>" +
                        "<td><button id='btnEdit' type='button' class='btnEdit btn btn-info' data-bs-toggle='modal'>Edit</button></td>" +
                        "<td><button id='btnDelete' type='button' class='btnDelete btn btn-danger' data-bs-toggle='modal'>Delete</button></td>" +
                    "</tr>";

                tbody.innerHTML = resultBuildTbody;

            });
        })
        .catch(error => console.log(error))
}

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e);
        }
    })
}

// заполнение окна редактирования
on(document, "click", ".btnEdit", e => {
    const target = e.target.parentNode.parentNode;
    userId.value = target.children[0].innerHTML;
    firstname.value = target.children[1].innerHTML;
    lastname.value = target.children[2].innerHTML;
    age.value = target.children[3].innerHTML;
    email.value = target.children[4].innerHTML;
    // получаем роли и добавляем их в селект
    fetch(urlGetAllRoles)
        .then(response => response.json())
        .then(allroles => {

            allroles.forEach(role => {
                let option = document.createElement('option');
                option.text = role.roleName.substring(5) + " ";
                roles.add(option);
            })
        });
    option = "Edit";
    modalEdit.show();
});


// заполнение окна удаления
on(document, "click", ".btnDelete", e => {
    const target = e.target.parentNode.parentNode;
    userIdDel.value = target.children[0].innerHTML;
    firstnameDel.value = target.children[1].innerHTML;
    lastnameDel.value = target.children[2].innerHTML;
    ageDel.value = target.children[3].innerHTML;
    emailDel.value = target.children[4].innerHTML;
    const roles = target.children[5].innerHTML;
    console.log(userRoles);
    roles.split(" ").forEach(role => {
        let option = document.createElement('option');
        option.text = role;
        rolesDel.add(option);
    });
    option = "Delete";
    modalDelete.show();
});

on(document, "click", ".btnCreate", e => {
    const target = e.target.parentNode.parentNode;
    console.log(target);
    userIdNew.value = target.children[0].innerHTML;
    firstnameNew.value = target.children[1].innerHTML;
    lastnameNew.value = target.children[2].innerHTML;
    ageNew.value = target.children[3].innerHTML;
    emailNew.value = target.children[4].innerHTML;
    passwordNew.value = target.children[5].innerHTML;
    // получаем роли и добавляем их в селект

    option = "Create";
});
formEdit.addEventListener("submit", (event) => {
    event.preventDefault();
    if(option === "Edit") {
        for (let option of document.getElementById("roles").options)
        {
            if (option.selected) {
                UserRoles.push(option.value);
            }
        }
        fetch(urlUpdateUser + userId.value, {
            method: "PUT",
            headers : {
                "Content-Type": "application/json"
            },
            body : JSON.stringify({
                "username" : firstname.value,
                "lastname" : lastname.value,
                "age" : age.value,
                "email" : email.value,
                "password" : password.value,
                "roles" : UserRoles
            })
        })
            .then(response => response.json())
            .then(() => {
                resultBuildTbody = "";
                buildTableUsers();
                roles.innerHTML = "";
            })

        modalEdit.hide();
    }
})

formDelete.addEventListener("submit", () => {

    if (option === "Delete") {
        fetch(urlDeleteUser + userIdDel.value, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then(() => {
                resultBuildTbody = "";
                buildTableUsers();
                roles.innerHTML = "";
            })
    }
    modalDelete.hide();
});

fetch(urlGetAllRoles)
    .then(response => response.json())
    .then(allroles => {

        allroles.forEach(role => {
            let option = document.createElement('option');
            option.text = role.roleName.substring(5) + " ";
            rolesNew.add(option);
        })
    });
formCreate.addEventListener("submit", () => {
    firstnameNew.value = "";
    lastnameNew.value = "";
    ageNew.value = "";
    emailNew.value = "";
    passwordNew.value = "";
    for (let option of document.getElementById("rolesNew").options)
    {
        if (option.selected) {
            UserRoles.push(option.value);
        }
    }
    fetch(urlCreateUser, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "username" : firstname.value,
            "lastname" : lastname.value,
            "age" : age.value,
            "email" : email.value,
            "password" : password.value,
            "roles" : UserRoles
        })
    })
        .then(response => response.json())
        .then(() => {
        resultBuildTbody = "";
        buildTableUsers();
        rolesDel.innerHTML = "";
    })

})




