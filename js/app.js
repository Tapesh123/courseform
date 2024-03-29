(function () {
    document.addEventListener('DOMContentLoaded', function () {    //check fields and hide the submit 

        const display = new Display(); //new instance of display
        display.checkFields();
        display.hideSubmit();

    })

 //adding customer card on submit 
    document.getElementById('customer-form').addEventListener('submit', function (event) {
        event.preventDefault(); //preventing event default to occur. page doesnt reload 
        //object from customer form
        const name = this.querySelector('.name');
        const course = this.querySelector('.course');
        const author = this.querySelector('.author');

        const customer = new Customer(name.value, course.value, author.value);
        const display = new Display();

        display.feedback(customer); 

        display.clearFields();
    }); 

    function Display() {    //display constructor function //responsible for the display

        this.name = document.getElementById('name');
        this.course = document.getElementById('course');
        this.author = document.getElementById('author');
        this.customers = document.querySelector('.customer-list');

    }
    //check fields  //responsible for the submit button 
    Display.prototype.checkFields = function () {
        // console.log(this);
        this.name.addEventListener('blur', this.validateField);
        this.course.addEventListener('blur', this.validateField);
        this.author.addEventListener('blur', this.validateField);

        // console.log(this);
    }
    //validate each field; 
    Display.prototype.validateField = function () {
        // console.log(this);
        //if the value is empty? 
        if (this.value === '') {
            this.classList.remove('complete');
            this.classList.add('fail');

        } else {
            this.classList.add('complete');
            this.classList.remove('fail');
        }
        const complete = document.querySelectorAll('.complete');
        console.log(complete.length);
        if (complete.length === 3) {
            document.querySelector('.submitBtn').disabled = false;

        } else {
            document.querySelector('.submitBtn').disabled = true;

        }
    };
    //disable submit (hide)
    Display.prototype.hideSubmit = function () {
        const btn = document.querySelector('.submitBtn');
        btn.disabled = true;
    };
//show loading and feedback; 
    Display.prototype.feedback = function (customer) { 
        const feedback = document.querySelector('.feedback');
        const loading = document.querySelector('.loading');

        feedback.classList.add('showItem', 'alert', 'alert-success');
        loading.classList.add('showItem');

        const self = this; 
        self.hideSubmit();
        setTimeout(function () { 
            feedback.classList.remove('showItem', 'alert', 'alert-success'); 
            loading.classList.remove('showItem');
            self.addCustomer(customer);
            
        }, 4000)
        
    };
    Display.prototype.addCustomer = function (customer) { 
        const random = this.getRandom();
        const div = document.createElement('div');
        div.classList.add('col-11', 'mx-auto', 'col-md-6', 'col-lg-4', 'my-3');
        div.innerHTML = `<div class="card text-left">
       <img src="img/cust-${random}.jpg" class="card-img-top" alt="">
       <div class="card-body">
        <!-- customer name -->
        <h6 class="text-capitalize "><span class="badge badge-warning mr-2">name :</span><span id="customer-name"> ${customer.name}</span></h6>
        <!-- end of customer name -->
        <!-- customer name -->
        <h6 class="text-capitalize my-3"><span class="badge badge-success mr-2">course :</span><span id="customer-course">
          ${customer.course}
         </span></h6>
        <!-- end of customer name -->
        <!-- customer name -->
        <h6 class = "text-capitalize" > <span class = "badge badge-danger mr-2"> author: </span><span id="course-author">${customer.author}</span></h6>
        <!-- end of customer name -->
       </div>
      </div>`;
        this.customers.appendChild(div);

    }
    //randon number
    Display.prototype.getRandom = function () {
        let random = Math.floor(Math.random() * 5 + 1)
        return random;
    }
    
    //cleaing the fields constructor function 
    Display.prototype.clearFields = function () {
        console.log(this);
        this.name.value = "";
        this.course.value = "";
        this.author.value = "";

        this.name.classList.remove('complete', 'fail');
        this.course.classList.remove('complete', 'fail');
        this.author.classList.remove('complete', 'fail');


    }
    //customer constructor function, responsbile for all customer we create; each customer will have different values 
    function Customer(name, course, author) {
        this.name = name;
        this.course = course;
        this.author = author; 
    }

})(); //to preserve the global scope called IIFE