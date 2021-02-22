const modal = {
    open() {
        //abrir modal
        //adicionar a calss active
        document.querySelector('.modal-overlay').classList.add('active');
    },
    close() {
        // fechar o modal
        // remover a calss active
        document.querySelector('.modal-overlay').classList.remove('active');


    }
}

//preciso adiciona dado na transacions
//pegar os dados do modal


 

//passar os dados para a const transactions utilizando a fuction contrusctor



const transactions = [{
    id: 1,
    description: 'luz',
    amount: -50000,
    date:'23/01/2021'
},
{
    id: 2,
    description: 'criação de website',
    amount: 50000,
    date: '23/01/2021'
},
{
    id: 3,
    description: 'internet',
    amount: -2000,
    date:'23/01/2021'
}]

const transaction = {
    income() {
        //numero da entradas
    },
    amount() {
        // numeros de sáidas
    },
    total() {
        // total income - amount
    }

}

const DOM = {
    transanctionContainer: document.querySelector('#data-base tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr') //criar um elemento Tr
        tr.innerHTML = DOM.innerHTMLTransaction(transaction) //adicionar o html no elemento Tr

         DOM.transanctionContainer.appendChild(tr) //adicionar um elemento filho no Tr

       

    },

    innerHTMLTransaction(transaction) {
        const html = ` 
        <td class="descriptions">${transaction.description}</td>
        <td class="expense">${transaction.amount}</td>
        <td>${transaction.date} </td>
        <td><img src="assets/minus.svg" alt="minus"></td>
        `
        return html
    }

}

transactions.forEach((transaction)=>{
    DOM.addTransaction(transaction)
}) //fazer uma função para cada elemento da array