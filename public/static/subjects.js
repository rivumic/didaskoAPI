//add new Subject fields
const addSubId = document.querySelector('#addSubId')
const addYear = document.querySelector('#addyear')
const addButton = document.querySelector('#addButton')
const addMessage = document.querySelector('#addMessage')
//edit Subject fields
const editOldSubId = document.querySelector('#editOldSubId')
const editNewSubId = document.querySelector('#editNewSubId')
const editYear = document.querySelector('#editYear')
const editButton = document.querySelector('#editButton')
const editMessage = document.querySelector('#editMessage')

//delete Subject fields
const deleteSubId = document.querySelector('#deleteSubId')
const deleteButton = document.querySelector('#deleteButton')
const deleteMessage = document.querySelector('#deleteMessage')
//Other constants
const subRegex = new RegExp("CSE[123][A-Z][A-Z]X")

var comboValues;

const toggleButton = (button, buttonText)=>{
    if(button.disable){
        button.disable=false;
        button.innerHTML=buttonText;
    }else{
        button.disable=true;
        button.innerHTML="<i class=\"fa fa-circle-o-notch fa-spin\"></i>"
    }
}
//shows feedback to user either error or success message, permanent or temporary
const showMessage = (isError, isFade, text, targetElement)=>{
    if(isError){
        targetElement.setAttribute('class', 'userMessage errorMessage')
    }else{
        targetElement.setAttribute('class', 'userMessage successMessage')
    }

    targetElement.innerText = text;

    if(isFade){
        setTimeout(()=>{
            targetElement.classList.add('hidden')
        }, 3000)
    }
}

const setCombos = async ()=>{
    comboValues = (await axios.get('/didasko/subjects')).data
    console.log(comboValues)
    if(document.querySelector('#subjectList')!=null){
        console.log('in the if')
        document.querySelector('#subjectList').remove()
    }
    var subjectList = document.createElement('datalist')
    subjectList.id='subjectList'
    document.querySelector('.flexContainer').appendChild(subjectList)
    comboValues.forEach((value)=>{
        var option = document.createElement('option');
        option.innerHTML=value.id;
        subjectList.appendChild(option);
    })
}

const addEventListeners = ()=>{
    //Add New Subject
    addButton.addEventListener('click', async ()=>{
        toggleButton(addButton)
        if(addSubId.value){
            if(subRegex.test(addSubId.value)){
                if(addSubId.value.substring(3,4)===addYear.value){
                    try{
                        var response = (await axios.post('/didasko/subjects', {id: addSubId.value, yearLevel: addYear.value}))
                        if(response.status<300 && response.status>199){
                            showMessage(false, true, 'Subject added successfully', addMessage);
                        }
                    }catch(err){
                        showMessage(true, false, `There was an error, error code: ${err}`, addMessage)
                    }
                }else{
                    showMessage(true, false, 'Year in subject name and year level do not match.', addMessage)
                }                
            }else{
                showMessage(true, false, 'The subject name does not match the required format, e.g. CSE1ITX.', addMessage)
            }
        }else{
            showMessage(true, false, 'Please enter a subject Name.', addMessage)
        }
        setCombos()
        toggleButton(addButton, 'Add')
    })
    //Edit Subject
    editButton.addEventListener('click', async ()=>{
        toggleButton(editButton)
        var chosenSubject = comboValues.find((subject)=>{
            if(subject.id===editOldSubId.value){return subject}
        })
        if(chosenSubject){
            if(subRegex.test(editNewSubId.value)){
                if(editNewSubId.value.substring(3,4)===editYear.value){
                    try{
                        var response = (await axios.patch(`/didasko/subjects/${editOldSubId.value}`, {id: editNewSubId.value, yearLevel: editYear.value}))
                        if(response.status<300 && response.status>199){
                            showMessage(false, true, 'Subject edited successfully', editMessage);
                        }
                    }catch(err){
                        showMessage(true, false, `There was an error, error code: ${err}`, editMessage)
                    }
                }else{showMessage(true, false, 'Year level in subject name and year level do not match.', editMessage)}
            }else{showMessage(true, false, 'New subject name does not match the required format, e.g. CSE1ITX.', editMessage)}
        }else{showMessage(true, false, 'Subject not found, please refresh and try again.', editMessage)}
        setCombos()
        toggleButton(editButton, 'Save')
    })
    //Delete Subject
    deleteButton.addEventListener('click', async ()=>{
        toggleButton(deleteButton)
        if(deleteSubId.value){
                var chosenSubject = comboValues.find((subject)=>{
                    if(subject.id===deleteSubId.value){return subject}
                })
                if(chosenSubject){
                    if(window.confirm(`Are you want to delete the subject ${chosenSubject.id}?\n\nThis will delete all associated instances, assignments and subject development.`)){
                        try{
                        var response = (await axios.delete(`/didasko/subjects/${deleteSubId.value}`))
                        if(response.status<300 && response.status>199){
                            showMessage(false, true, 'Subject deleted successfully.', deleteMessage);
                        }
                        }catch(err){
                            showMessage(true, false, `There was an error, error code: ${err}`, deleteMessage)
                        } 
                    }else{
                        showMessage(true, false, 'Subject deletion cancelled.', deleteMessage)    
                    }
                }else{
                    showMessage(true, false, 'Subject not found, please refresh and try again.', deleteMessage)
                }
        }else{
            showMessage(true, false, 'Please enter a subject Name.', deleteMessage)
        }
        setCombos()
        toggleButton(deleteButton, 'Delete')
    })
}

setCombos()
addEventListeners()