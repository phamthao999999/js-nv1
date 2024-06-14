'use strict';
const tbody = document.querySelector('tbody')
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const typeInput = document.getElementById("input-type");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const btnDanger = document.querySelector(".btn-danger");
const form = document.querySelector('form')
const showHeathyBtn = document.getElementById('healthy-btn')
const showBMIBtn = document.getElementById('bmi-btn')

const listPets = []
let healthyOnly = false;
idInput.focus()

function createTags(){
    tbody.innerText = ""

    listPets.forEach((pet,index) => {
		if (!healthyOnly || pet.vaccinatedInput1 && pet.dewormedInput1 && pet.sterilizedInput1) {
			tbody.innerHTML +=  `<tr>
								<th scope="row">${pet.idInput1}</th>
								<td>${pet.nameInput1}</td>
								<td>${pet.ageInput1}</td>
								<td>${pet.weightInput1} kg</td>
								<td>${pet.lengthInput1} cm</td>
								<td>${pet.typeInput1}</td>
								<td>${pet.breedInput1}</td>
								<td>${pet.colorInput1}</td>
								<td>${pet.vaccinatedInput1 ? '<i class="bi bi-check-circle-fill"></i>' : '<i class="bi bi-x-circle-fill"></i>'}</i></td>
								<td>${pet.dewormedInput1 ? '<i class="bi bi-check-circle-fill"></i>' : '<i class="bi bi-x-circle-fill"></i>'}</td>
								<td>${pet.sterilizedInput1 ? '<i class="bi bi-check-circle-fill"></i>' : '<i class="bi bi-x-circle-fill"></i>'}</td>
								<td>${pet.bmi}</td>
								<td>${pet.date1}</td>
								<td><button type="button" class="btn btn-danger" onclick="removeTage(${index})">Delete</button>
								</td>
							</tr>`
		}
    })
    
    
}


//check trung id
function checkIDDuplicate(pets,input){
	const found = pets.some((pet) => pet.idInput1.trim() === input.value.trim());
	if (found) {
		showError(input,'ID must be unique!')
		return true
	} else {
		showSucess(input)
		return false
	}

}

// xóa một phần tử
function removeTage(index){
    listPets.splice(index,1)
    createTags()
}


//showError
function showError(input,message){
	let parent = input.parentElement;
	let small = parent.querySelector('small')
	parent.classList.add('error')
	small.innerHTML = message
}


//showSucess
function showSucess(input){
	let parent = input.parentElement;
	let small = parent.querySelector('small')
	parent.classList.remove('error')
	small.innerHTML = ''
}

//check đã điền chưa
function checkEmtyError(listInput){
	let isEmtyError = false;
	listInput.forEach(input => {

		input.value = input.value.trim()

		if(!input.value){
			isEmtyError = true
			showError(input,'Plese fill in the blank')
		}else {
			showSucess(input)
		}
	});

	return isEmtyError
}

// check trong phạm vị 
function checkLengthError(input,min,max){
	input.value = input.value.trim()

	if(input.value < min){
		showError(input,`Fill in between ${min} and ${max}`)
		return true
	}

	if(input.value > max){
		showError(input,`Fill in between ${min} and ${max}`)
		return true
	}

	showSucess(input)
	return false
}

// check type
function checkType(input){
	
	if(input.value == 'Select Type' ){
		showError(input,'Please select Type!')
		return true
	}else{
		showSucess(input)
		return false
	}
}

//check breed
function checkBreed(input){
	if(input.value == 'Select Breed' ){
		showError(input,'Please select Type!')
		return true
	}else{
		showSucess(input)
		return false
	}
}

//clear input 
const clearInput = (idInput,nameInput,ageInput,weightInput,lengthInput,colorInput,
	typeInput,breedInput,vaccinatedInput,sterilizedInput,dewormedInput) => {
	idInput.value = ''
	nameInput.value = ''
	ageInput.value = ''
	weightInput.value = ''
	lengthInput.value = ''
	colorInput.value = ''
	typeInput.value = 'Select type'
	breedInput.value = 'Select type'
	vaccinatedInput.checked = false
	sterilizedInput.checked = false
	dewormedInput.checked = false

	idInput.focus()
}


//submit
submitBtn.addEventListener('click',function(e){
	e.preventDefault()

	let isEmtyError = checkEmtyError([idInput,nameInput,ageInput,weightInput ,lengthInput,colorInput])
	let ischeckAgeLengthError = checkLengthError(ageInput,1,15)
	let ischeckWeightLengthError = checkLengthError(weightInput,1,15)
	let ischecLengthError = checkLengthError(lengthInput,1,100)
	let ischeckType = checkType(typeInput)
	let ischeckBreed = checkBreed(breedInput)
	let ischeckIDDuplicate = checkIDDuplicate(listPets,idInput)

	if (isEmtyError || ischecLengthError || ischeckAgeLengthError || ischeckWeightLengthError || ischeckType || ischeckBreed || ischeckIDDuplicate) {
		return;
	}

	let data  = {
		idInput1 : idInput.value,
		nameInput1:nameInput.value,
		ageInput1:ageInput.value,
		typeInput1:typeInput.value,
		weightInput1:weightInput.value,
		lengthInput1:lengthInput.value,
		breedInput1:breedInput.value,
		colorInput1:colorInput.value,
		vaccinatedInput1:vaccinatedInput.checked,
		dewormedInput1:dewormedInput.checked,
		sterilizedInput1:sterilizedInput.checked,
		bmi: 0,
		// Phần đặt tên các trường cần xem lại, số 1 để làm gì nhỉ
		date1: (new Date()).toISOString().split('T')[0]
	}
	
	listPets.push(data)

	
    createTags()
	clearInput(idInput,nameInput,ageInput,weightInput,lengthInput,colorInput,
		typeInput,breedInput,vaccinatedInput,sterilizedInput,dewormedInput)
})

//show heathy
showHeathyBtn.addEventListener('click',function(e){
	e.preventDefault()
	healthyOnly = !healthyOnly
	createTags()
})

function dogBMI(weight,length){
	return (weight * 703) / length ** 2
}

function catBMI(weight,length){
	return (weight * 886) / length ** 2
}

//showBMI
showBMIBtn.addEventListener('click',function(e){
	e.preventDefault()
	// Mỗi một pet có BMI khác nhau, không tính như bên dưới (chỉ được 1 giá trị, và là giá trị đang nhập chứ không phải các giá trị đã nhập từ trước)
	// B1. Duyệt qua tất cả pet trong danh sách
	for (let i = 0; i < listPets.length; i++) {
		// B2. Tính BMI của pet
		const weight = listPets[i].weightInput1;
		const length = listPets[i].lengthInput1;

		listPets[i].bmi = listPets[i].typeInput1 === "Dog" ? dogBMI(weight, length).toFixed(2) : catBMI(weight, length).toFixed(2);
	}
	createTags();
	// typeInput.value === 'Dog' ? BMIValue = dogBMI(weightInput.value,lengthInput.value) : BMIValue = catBMI(weightInput.value,lengthInput.value) Mình không gán giá trị bằng toán tử 3 ngôi thế này
	
})

