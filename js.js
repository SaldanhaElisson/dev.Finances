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

/*=====================================Guardando as informação================================*/

const Storage ={
    get(){
        return JSON.parse(localStorage.getItem("dev.finances:transactions'")) || [];
        //NESSA CASO O JSON.PASE ESTÁ TRANSFORMANDO UMA STRING EM ARRAY
    },

    set(transactions){
        localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions) )
    } // PARA GUARDA NO STORAGE PRECISA TRANSFORMA O ARRAY EM STRING E O JSON.STRINGIFY ESTÁ FAZENDO ISSO
}



/* ==============================Soma e dimunio as transactions =========== */
const transaction = {
    all: Storage.get(), 

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
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index) //adicionar o html no elemento Tr pelo paremetro transaction
        tr.dataset.index = index //pegando a posição do array 

         DOM.transanctionContainer.appendChild(tr) //adicionar um elemento filho no Tr

       

    },

    innerHTMLTransaction(transaction, index) {
        const CSSclass= transaction.amount > 0 ?"income":"expense"

        const amount = Utils.formtCurrency(transaction.amount)

        const html = ` 
        <td class="descriptions">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td>${transaction.date} </td>
        <td>
        <img  onclick="transaction.remove(${index})"src="assets/minus.svg" alt="minus"></td>
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
    formatAmount(value){
        value= value  * 100;
       
        return Math.round(value);

    },

    formatDate(date){
        const splitedDate = date.split("-")
        console.log(splitedDate)
        return `${splitedDate[2]}/${splitedDate[1]}/${splitedDate[0]}`
       
    },
    formtCurrency(value){
        const signal = Number(value) < 0 ? "-" : ""

        value =String(value).replace(/\D/g, "") // tirar tudo que não for número e mudar para vazio

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

    formatValues(){
        let { description, amount, date} = Form.getValues()

        amount = Utils.formatAmount(amount)

        date = Utils.formatDate(date)

        return{
            description,
            amount,
            date
        }
         
    },

    clearFiels(){
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },

    submit(event){
        event.preventDefault();



        try {

        //verificar se todas as informações foram preenchidas
        Form.validateFiel()
        //formatar os dados para salvarr
        const transacation = Form.formatValues();
        //salvar
        transaction.add(transacation)
        //apagar os dados do formularios
        Form.clearFiels();
        //modal fechar
        modal.close();
        //atualizar a aplicação
            
        } catch (error) {
            alert(error.message)
        }

       
    }
}

//ATUALIZANDO OS DADOS PARA A PAGINA
const App = {
    init(){


        transaction.all.forEach((transaction, index) => {
            DOM.addTransaction(transaction, index)
        })

        DOM.updateBalance()

        Storage.set(transaction.all)

       

    },
    reload(){
        DOM.clearTransanctions()
        App.init()
    }
}

App.init()





