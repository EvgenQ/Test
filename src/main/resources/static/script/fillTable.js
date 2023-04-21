fillAdminTable();

async function fillAdminTable() {
    await fetch("http://localhost:8080/api/v1/users/showAll", {
        method: "GET"
    }).then(response => response.json())
        .then(data => {
            console.log(data);
        })
}