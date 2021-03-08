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



/* ==============================Soma e dimunio as transactions =========== */
const transaction = {
    all: [{
  
        description: 'luz',
        amount: -50000,
        date:'23/01/2021'
    },
    {
        
        description: 'criação de website',
        amount: 50000,
        date: '23/01/2021'
    },
    {
       
        description: 'internet',
        amount: -2000,
        date:'23/01/2021'
    }], 

    add(Transaction){
        transaction.all.push(Transaction)

        App.reload()
    },

    remove(index) {
        transaction.all.splice(index, 1)

        App.reload()
    },

    income() {
        let income = 0;
        //pegar odas as transacoes
        //para cada trasancao
        transaction.all.forEach((transaction) => {
            if (transaction.amount > 0){
                //somar a um variavel e retorna a variavel
                income += transaction.amount;
            }

        })
        
        return income;
    },

    amount() {
        let expense = 0;
        transaction.all.forEach((transaction) => {
            if (transaction.amount < 0){
                expense +=  transaction.amount;
            }

        })
        
        return expense;
       
    },

    total() {
        return transaction.income() + transaction.amount();
    }

}
/* ==============================Coloca as transactions no html de forma dinâmica =========== */
const DOM = {
    transanctionContainer: document.querySelector('#data-base tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr') //criar um elemento Tr
        tr.innerHTML = DOM.innerHTMLTransaction(transaction) //adicionar o html no elemento Tr

         DOM.transanctionContainer.appendChild(tr) //adicionar um elemento filho no Tr

       

    },

    innerHTMLTransaction(transaction) {
        const CSSclass= transaction.amount > 0 ?"income":"expense"

        const amount = Utils.formtCurrency(transaction.amount)

        const html = ` 
        <td class="descriptions">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td>${transaction.date} </td>
        <td><img src="assets/minus.svg" alt="minus"></td>
        `
        return html
    },

    updateBalance(){
        document.getElementById('incomesDisplay').innerHTML =Utils.formtCurrency(transaction.income())
        document.getElementById('expenseDisplay').innerHTML = Utils.formtCurrency(transaction.amount())
        document.getElementById('totalDisplay').innerHTML = Utils.formtCurrency(transaction.total())
    },

    clearTransanctions(){
        DOM.transanctionContainer.innerHTML=""
    }
    
}
/* ==============================Formato os numero para dinheiro brasileiro =========== */
const Utils = { //forma os numeros para dinheiro
    formtCurrency(value){
        const signal = Number(value) < 0 ? "-" : ""

        value =String(value).replace(/\D/g, "") // tirar tudo que não for número

        value = Number(value) / 100
        
        value = value.toLocaleString("pt-br", {
            style:"currency",
            currency:"BRL"
        }) // mudar para moeda brasileira colocando o $ no value

        return signal+value
    }
}
/* ==============================Executar a função para cada informação no bojeto transactions=========== */

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#data'),

    getValues(){
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },
    validateFiel(){

        const { description, amount, date } = Form.getValues()

       
        if(description.trim() ==="" || amount.trim() ==="" || date.trim() ==="") {
            throw new Error("Por favor, preencha todos os campos")
        }




        //trim serve para fazer uma limpeza 
        
    },
    submit(event){
        event.preventDefault();



        try {
            
        } catch (error) {
            
        }

        //verificar se todas as informações foram preenchidas
        Form.validateFiel();
        //formatar os dados para salvarr
        
        //salvar
        //apagar os dados do formularios
        //modal feched
        //atualizar a aplicação
    }
}

const App = {
    init(){


        transaction.all.forEach(transaction =>{
            DOM.addTransaction(transaction)
        })

        DOM.updateBalance()

    },
    reload(){
        DOM.clearTransanctions()
        App.init()
    }
}

App.init()

transaction.add({
  
    description:'alo',
    amount:200,
    date: 30/02/2021

})




