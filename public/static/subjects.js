//add new Subject fields
const addSubId = document.querySelector('#addSubId')
const addYear = document.querySelector('#addyear')
const addButton = document.querySelector('#addButton')
//edit Subject fields
const editOldSubId = document.querySelector('#editOldSubId')
const editNewSubId = document.querySelector('#editNewSubId')
const editYear = document.querySelector('#editYear')
const editButton = document.querySelector('#editButton')
//delete Subject fields
const deleteSubId = document.querySelector('#deleteSubId')
const deleteButton = document.querySelector('#deleteButton')
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
                            console.log('success!')
                        }
                    }catch(err){
                        console.log(`There was an error, error code: ${err}`)
                    }
                    setCombos()
                }else{
                    console.log('title and level do not match')
                }                
            }else{
                console.log('it did not pass regex')
            }
        }else{
            console.log('No value entered')
        }
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
                            console.log('success!')
                        }
                    }catch(err){
                        console.log('there was an error:', err)
                    }
                    setCombos()
                }else{console.log('New subject title does not match the yearLevel')}
            }else{console.log('new subject title did not match the regex')}
        }else{console.log('chosen preexisting subject was not found in subject List')}
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
                    try{
                        var response = (await axios.delete(`/didasko/subjects/${deleteSubId.value}`))
                        if(response.status<300 && response.status>199){
                            console.log('success!')
                        }
                    }catch(err){
                        console.log(`There was an error, error code: ${err}`)
                    }
                    setCombos()
                }else{
                    console.log('it is not in the current subjects list')
                }
        }else{
            console.log('No value entered')
        }
        toggleButton(deleteButton, 'Delete')
    })
}

setCombos()
addEventListeners()