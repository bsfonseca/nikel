const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let cachin = [];
let data = {
    transactions: [],
};

document.getElementById("button-logout").addEventListener("click", logout);
document.getElementById("transactions-button").addEventListener("click", function () {
    window.location.href = "transactions.html";
});

//ADICIONAR LANÇAMENTO
document.getElementById("transaction-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    data.transactions.unshift({
        value: value,
        type,
        description: description,
        date: date,
    });

    saveData(data);
    e.target.reset();
    myModal.hide();

    getCashin();
    getCashout();
    getTotal();
    alert("Lançamento adicionado com sucesso.");
});

checkLogged();

function getTotal() {
    const transactions = data.transactions;
    let total = 0;

    transactions.forEach((item) => {
        if (item.type == "1") {
            total += item.value;
        } else {
            total -= item.value;
        }
    });

    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`;
}

function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (!logged) {
        window.location.href = "index.html";
        return;
    }

    const dataUser = localStorage.getItem(logged);
    if (dataUser) {
        data = JSON.parse(dataUser);
    }

    getCashin();
    getCashout();
    getTotal();
}

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function getCashin() {
    const transactions = data.transactions;

    const cashin = transactions.filter((item) => item.type === "1");
    let cashinHtml = ``;

    if (cashin.length) {
        let limit = 0;
    }

    if (cashin.length > 5) {
        limit = 5;
    } else {
        limit = cashin.length;
    }

    for (let index = 0; index < limit; index++) {
        cashinHtml += `
            <div class="row mb-4">
                <div class="col-12">
                <h3 class="fs-2">R$ ${cashin[index].value.toFixed(2)}</h3>  
                <div class="container p-0">
                    <div class="row">
                        <div class="col-12 col-md-8">
                            <p>${cashin[index].description}</p>
                        </div>
                        <div class="col-12 col-md-3 d-flex justify-content-end">
                            ${cashin[index].date}
                        </div>
                    </div>
                </div>
                </div>
            </div>`;
    }

    document.getElementById("cash-in-list").innerHTML = cashinHtml;
}

function getCashout() {
    const transactions = data.transactions;

    const cashout = transactions.filter((item) => item.type === "2");
    let cashoutHtml = ``;

    if (cashout.length) {
        let limit = 0;
    }

    if (cashout.length > 5) {
        limit = 5;
    } else {
        limit = cashout.length;
    }

    for (let index = 0; index < limit; index++) {
        cashoutHtml += `
            <div class="row mb-4">
                <div class="col-12">
                <h3 class="fs-2">R$ ${cashout[index].value.toFixed(2)}</h3>  
                <div class="container p-0">
                    <div class="row">
                        <div class="col-12 col-md-8">
                            <p>${cashout[index].description}</p>
                        </div>
                        <div class="col-12 col-md-3 d-flex justify-content-end">
                            ${cashout[index].date}
                        </div>
                    </div>
                </div>
                </div>
            </div>`;
    }

    document.getElementById("cash-out-list").innerHTML = cashoutHtml;
}

function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}
