function customerData() {
    if (!localStorage.getItem('customers')) {
        const customers = [
            { fullName: 'Chinoso Adams', email: 'chiadams@gmail.com', pin: null, balance:40000 },
            { fullName: 'Tunde Ola', email: 'tunz@gmail.com', pin: null, balance:30000 },
            { fullName: 'Haruna Hassan', email: 'haruna@gmail.com', pin: null, balance:20000 },
        ];
        localStorage.setItem('customers', JSON.stringify(customers));
    }
}
customerData;
const customers = JSON.parse(localStorage.getItem('customers'));
const pinModal = document.getElementById('pinModal');
const pinForm = document.getElementById('pinForm');
let loggedInCustomer = null;
let customerPin = null;

function generatePin(fullName, email) {
    const customers = JSON.parse(localStorage.getItem('customers'));
    let loggedInCustomer = null;
    for (let i = 0; i < customers.length; i++) {
        if (customers[i].fullName === fullName && customers[i].email === email) {
            loggedInCustomer = customers[i];
            break;
        }
    }
    if (loggedInCustomer == null) {
        return null;
    }
    if (loggedInCustomer.pin === null) {
        loggedInCustomer.pin = Math.floor(Math.random() * 9000 + 1000);
        localStorage.setItem('customers', JSON.stringify(customers));
    }
    return loggedInCustomer;
}

function loggedIn(email, pin) {
    debugger;
    for (let i = 0; i < customers.length; i++) {
        if (customers[i].email === email && customers[i].pin == pin) {
            loggedInCustomer = customers[i];
            break;
        }
    }
    if (loggedInCustomer !== null) {
        localStorage.setItem('loggedInCustomerEmail', email); 
        localStorage.setItem('loggedInCustomerPin', pin); 
        document.getElementById('main').style.display = 'block';
        document.getElementById('welcome-container').style.display = 'none';
    } else {
        document.getElementById('errorDisplay').textContent = 'Wrong pin, input correct pin';
    }
}

document.getElementById('pinForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const fullName = document.getElementById('nameInput').value;
    const email = document.getElementById('userEmail').value;
    const customer = generatePin(fullName, email);
    customerPin = customer.pin;
    if (customer) {
        document.getElementById('pinDisplay').textContent = 'Your pin is: ' + customer.pin;
    } else {
        document.getElementById('pinDisplay').textContent = 'Customer not found';
    }
});

document.getElementById('pinInput').addEventListener('input', function () {
    const enteredPin = document.getElementById('pinInput').value;
    const email = document.getElementById('emailInput').value;
    loggedIn(email, enteredPin);
});

document.getElementById('withdrawal-btn').addEventListener('click', function () {
    document.getElementById('withdrawal').style.display = 'block';
    document.getElementById('main').style.display = 'none';
    document.getElementById('welcome-container').style.display = 'none';
     
});
document.getElementById('savings-btn').addEventListener('click', function () {
    document.getElementById('savings').style.display = 'block';
    document.getElementById('withdrawal').style.display = 'none';
});

document.getElementById('current-btn').addEventListener('click', function () {
    document.getElementById('savings').style.display = 'block';
    document.getElementById('withdrawal').style.display = 'none';
});

document.getElementById('credit-btn').addEventListener('click', function () {
    document.getElementById('savings').style.display = 'block';
    document.getElementById('withdrawal').style.display = 'none';
});

document.getElementById('transfer-btn').addEventListener('click', function () {
    document.getElementById('transfer').style.display = 'block';
    document.getElementById('main').style.display = 'none';
    document.getElementById('text-container').style.display = 'none';
});

function withdraw(amount) {    
    if (amount > 0) {
        if (amount > loggedInCustomer.balance) {
            document.getElementById('withdraw-amount').textContent = 'Insufficient funds';
        } else {
            loggedInCustomer.balance -= amount;
            localStorage.setItem('customers', JSON.stringify(customers));
            document.getElementById('withdraw-amount').innerHTML = `Withdrawal successful<br>New balance:${loggedInCustomer.balance}`;
        }
    }
    
    document.getElementById('text-container').style.display = 'block';
    document.getElementById('savings').style.display = 'none';
}

document.querySelectorAll('.menu-btn').forEach(button => {
    button.addEventListener('click', () => {
        const amount = parseInt(button.value);
        withdraw(amount);
    });
    
 document.getElementById('enter').addEventListener('click', () => {
        const amount = parseInt(document.getElementById('other-amount').value);
        withdraw(amount);
     });
    
});

document.getElementById('Cancel-btn').addEventListener('click', function () {

    window.location.href = 'index.html';
});
document.getElementById('Cancel').addEventListener('click', function () {
    window.location.href = 'index.html';
});

document.getElementById('Cancel-but').addEventListener('click', function () {
    window.location.href = 'index.html';
});

document.getElementById('Cancel-button').addEventListener('click', function () {
    window.location.href = 'index.html';
});


document.getElementById('other-btn').addEventListener('click', function () {
    document.getElementById('other-container').style.display = 'block';
    document.getElementById('withdraw-amount').style.display = 'none';
    
});


function inquiry() {
    const customers = JSON.parse(localStorage.getItem('customers'));
    const email = localStorage.getItem('loggedInCustomerEmail');
    const pin = localStorage.getItem('loggedInCustomerPin');
    let loggedInCustomer = null;

    for (let i = 0; i < customers.length; i++) {
        if (customers[i].email === email && customers[i].pin == pin) {
            loggedInCustomer = customers[i];
            break;
        }
    }

    if (loggedInCustomer !== null) {
        document.getElementById('text-screen').innerHTML = `Name: ${loggedInCustomer.fullName}<br>Balance: ${loggedInCustomer.balance}`;
    } else { 
        
        document.getElementById('text-screen').textContent = 'No customer logged in';
    }

    document.getElementById('inquiry-text').style.display = 'block';
    document.getElementById('main').style.display = 'none';
    document.getElementById('text-container').style.display = 'none';
}

document.getElementById('inquiry-btn').addEventListener('click', inquiry);


function transfer(recipientEmail, amount) {
    const customers = JSON.parse(localStorage.getItem('customers'));
    let sender = null;
    let recipient = null;

    for (let i = 0; i < customers.length; i++) {
        if (customers[i].email === loggedInCustomer.email) {
            sender = customers[i];
        }
        if (customers[i].email === recipientEmail) {
            recipient = customers[i];
        }
    }

    if (!sender) {
        document.getElementById('transfer-status').textContent = 'Sender not found';
        return;
    }

    if (!recipient) {
        document.getElementById('transfer-status').textContent = 'Recipient not found';
        return;
    }

    if (amount > sender.balance) {
        document.getElementById('transfer-status').textContent = 'Insufficient funds';
        return;
    }

    sender.balance -= amount;
    recipient.balance += amount;

    localStorage.setItem('customers', JSON.stringify(customers));

    document.getElementById('transfer-status').innerHTML = `<h3>Transfer successful<br>balance: ${sender.balance}</h3>`;
    
}

document.getElementById('transferSubmit').addEventListener('click', function () {
    const recipientEmail = document.getElementById('recipientEmail').value;
    const amount = parseFloat(document.getElementById('transferAmount').value);
    transfer(recipientEmail, amount);
});
