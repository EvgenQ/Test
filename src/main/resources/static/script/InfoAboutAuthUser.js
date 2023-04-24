getInfoAboutAuthUser();

function getInfoAboutAuthUser() {
    fetch("http://localhost:8080/api/v1/InfoAboutAuthUser", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => response.json())
        .then(myUser => {

            let labelEmail = document.getElementById("infoUserEmail");
            let labelRoles = document.getElementById("infoUserRoles");

            labelEmail.textContent = myUser.email;

            let userRoles = "";

            for (let i = 0; i < myUser.roles.length; i++) {
                userRoles += myUser.roles[i].roleName.substring(5) + " ";
            }

            labelRoles.textContent = userRoles;


            let columnID = document.getElementById("infoID");
            columnID.scope = "row"
            columnID.textContent = myUser.id;

            let columnUsername = document.getElementById("infoName");
            columnUsername.textContent = myUser.username;

            let columnLastname = document.getElementById("infoLastname");
            columnLastname.textContent = myUser.lastname;

            let columnAge = document.getElementById("infoAge");
            columnAge.textContent = myUser.age;

            let columnEmail = document.getElementById("infoEmail");
            columnEmail.textContent = myUser.email;

            let columnRole = document.getElementById("infoRoles");
            columnRole.textContent = userRoles;
        });
}

