const months = [ "January", "February", "March", "April", "May", "June", 
"July", "August", "September", "October", "November", "December" ];
var monthIndexes = new Map();
months.forEach((month, index)=>{
    monthIndexes.set(month, index);
})
//new Instance elements
const newInsSub = document.querySelector('#newInsSub')
const newInsYear = document.querySelector('#newInsYear')
const newInsMonth = document.querySelector('#newInsMonth')
const newInsEnrolments = document.querySelector('#newInsEnrolments')
const newInsButton = document.querySelector('#newInsButton')
const newInsMessage = document.querySelector('#newInsMessage')
//edit instance elements
const editInsOldIns = document.querySelector('#editInsOldIns')
const editInsNewSubject = document.querySelector('#editInsNewSubject')
const editInsNewYear = document.querySelector('#editInsNewYear')
const editInsNewMonth = document.querySelector('#editInsNewMonth')
const editInsEnrolments = document.querySelector('#editInsEnrolments')
const editInsButton = document.querySelector('#editInsButton')
const editInsMessage = document.querySelector('#editInsMessage')
//view Instance allocation elements
const viewAllocAcademic = document.querySelector('#viewAllocAcademic')
const viewAllocYear = document.querySelector('#viewAllocYear')
const viewAllocMonth = document.querySelector('#viewAllocMonth')
const viewAllocMain = document.querySelector('#viewAllocMain')
const viewAllocSupp = document.querySelector('#viewAllocSupp')
const viewAllocSubDev = document.querySelector('#viewAllocSubDev')
const viewAllocLoad = document.querySelector('#viewAllocLoad')
const viewAllocButton = document.querySelector('#viewAllocButton')
const viewAllocMessage = document.querySelector('#viewAllocMessage')
//instance info elements
const insInfoName = document.querySelector('#insInfoName')
const insInfoMain = document.querySelector('#insInfoMain')
const insInfoSupport = document.querySelector('#insInfoSupport')
const insInfoEnrolments = document.querySelector('#insInfoEnrolments')
//delete instance elements
const deleteIns = document.querySelector('#deleteIns')
const deleteButton = document.querySelector('#deleteButton')
const deleteMessage = document.querySelector('#deleteMessage')

const subRegex = new RegExp("CSE[123][A-Z][A-Z]X")
const insRegex = new RegExp("CSE[123][A-Z][A-Z]X_20[0-9][0-9]_(January|February|March|April|May|June|July|August|September|October|November|December)")

var subjectValues;
var instanceValues;
var byYear = new Map();
var academicValues;
var academicNames = [];
var assignmentValues;

//disables button while form completes
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
//helper function to convert a month index (e.g. Jan = 0) into an ISO compatible month string (Jan = 01, Dec = 12)
const indexToISOMonthString = (monthIndex) =>{
    if(monthIndex<=8){
        var monthString = `0${monthIndex+1}`
    }else{
        var monthString = `${monthIndex+1}`
    }
    return monthString;
}
//helper method that sets the options for year field in view instance Allocation
//sets options to only years that have instances in them
const yearOptions = (years)=>{
    for( var year of years){
        viewAllocYear.innerHTML += `<option>${year}</option>`;
    }
}
//helper function for refreshing comboBox values
const setCombo = (data, listName)=>{
    var comboList = document.createElement('datalist')
    comboList.id = listName
    document.querySelector('.flexContainer').appendChild(comboList)
    data.forEach((value)=>{
        var option = document.createElement('option');
        option.innerHTML=value.id;
        comboList.appendChild(option);
    })
}
//sets the option in field that select the year of in new/edit instance forms
const populateYears = ()=>{
    var date = new Date()
    for(var i=0;i<3;i++){
        newInsYear.innerHTML += `<option>${date.getFullYear()+i}</option>`;
    }
    for(var i=0;i<3;i++){
        editInsNewYear.innerHTML += `<option>${date.getFullYear()+i}</option>`;
    }
}
//refreshes comboBox values
const populateCombos = async ()=>{

    const data = await Promise.all([axios.get('/didasko/subjects'),
    axios.get('/didasko/instances/schedule'),
    axios.get('/didasko/academics'),
    axios.get('/didasko/assignments')]);
    subjectValues = data[0].data;
    instanceValues = data[1].data;
    academicValues = data[2].data;
    assignmentValues = data[3].data;

    academicValues.forEach((academic)=>{
        academicNames.push(academic.id)
    })

    for (var o = 0;o<instanceValues.length;o++){
        if(!byYear.has(instanceValues[o].year)){
            byYear.set(instanceValues[o].year, new Map())
        }
        byYear.get(instanceValues[o].year).set(instanceValues[o].id, instanceValues[o])
    }
    //sets year fields in new and edit instance forms
    populateYears()
    //sets year field in view instance allocation
    yearOptions(byYear.keys())


    if(document.querySelector('#subjectList')){
        document.querySelector('#subjectList').remove()
    }
    if(document.querySelector('#instanceList')){
        document.querySelector('#instanceList').remove()
    }
    if(document.querySelector('#academicList')){
        document.querySelector('#academicList').remove()
    }
    setCombo(subjectValues, 'subjectList')
    setCombo(instanceValues, 'instanceList')
    setCombo(academicValues, 'academicList')
}

//display logic for the View Instance Info form - called from event listener
const insInfo = ()=>{
    const input = insInfoName.value;
    var mainListHTML = ``;
    var supportListHTML = ``;
    var relevantAcademics;
    if(input){
        byYear.forEach(instanceMap => {
            if(instanceMap.has(input)){
                insInfoEnrolments.innerText=instanceMap.get(input).enrolments
                relevantAcademics = assignmentValues.filter((assignment)=>{
                    if(assignment.instanceId==input){
                        return true;
                    }
                })
                relevantAcademics.forEach((assignment)=>{
                    if(assignment.main){
                        mainListHTML += `<li>${assignment.academicId}</li>`;
                        
                    }else{
                        supportListHTML += `<li>${assignment.academicId}</li>`;
                    }
                })
                if(mainListHTML){insInfoMain.innerHTML = mainListHTML;}else{
                    insInfoMain.innerHTML = '<li>No allocations</li>'
                }
                if(supportListHTML){insInfoSupport.innerHTML = supportListHTML;}else{
                    insInfoSupport.innerHTML = '<li>No allocations</li>'
                }   
            }
        });
    }
}
//display logic for the view instance allocation form - called from event listener
const viewInsAllocation = async ()=>{
    toggleButton(viewAllocButton)
    var chosenAcademic = viewAllocAcademic.value
    const chosenMonthIndex = monthIndexes.get(viewAllocMonth.value)
    const chosenYear = viewAllocYear.value
    var subDevs;
    var load;
    if(academicNames.includes(chosenAcademic)){
        try{
            subDevs = (await axios.get(`/didasko/subDev/${chosenAcademic}`)).data
            load = (await axios.get(`/didasko/academics/load/${chosenAcademic}/${chosenYear}/${chosenMonthIndex+1}`)).data
        }catch(err){
            showMessage(true, false, `There was an error, error code ${err}`, viewAllocMessage)
        }
    }else{
        showMessage(true, true, 'Academic not found, please try again.', viewAllocMessage)
    }
    
    var yearMonths = new Map()
    for(var i = (chosenMonthIndex-2);i<=(chosenMonthIndex);i++){
        yearMonths.set(`_${chosenYear}_${months[i]}`, i)
    }
    
    var viewAllocMainHTML = ``;
    var viewAllocSuppHTML = ``;
    const allocations = assignmentValues.filter((assignment)=>{
        if(assignment.academicId===chosenAcademic){
            if (yearMonths.has(assignment.instanceId.substring(7))){
                return true;
            }
        }
        return false;
    })
    allocations.sort((a, b)=>{
        if(a.instanceId.substring(3,4)<b.instanceId.substring(3,4)){
            return -1;
        }else{
            if(a.instanceId.substring(3,4)>b.instanceId.substring(3,4)){
                return 1;
            }else{
                if(a.instanceId.substring(4,6)<b.instanceId.substring(4,6)){
                    return -1;
                }else{
                    if(a.instanceId.substring(4,6)>b.instanceId.substring(4,6)){
                        return 1;
                    }else{
                        if(monthIndexes.get(a.instanceId.substring(13))<monthIndexes.get(b.instanceId.substring(13))){
                            return -1;
                        }else{
                            return 1;
                        }
                    }
                }
            }
        }
    })
    allocations.forEach((allocation)=>{
        if(allocation.main){
            viewAllocMainHTML += `<li>${allocation.instanceId}</li>`;
            
        }else{
            viewAllocSuppHTML += `<li>${allocation.instanceId}</li>`;
        }    
    })
    if(viewAllocMainHTML){viewAllocMain.innerHTML = viewAllocMainHTML;}else{
        viewAllocMain.innerHTML = '<li>No allocations</li>'
    }
    if(viewAllocSuppHTML){viewAllocSupp.innerHTML = viewAllocSuppHTML;}else{
        viewAllocSupp.innerHTML = '<li>No allocations</li>'
    }
    if(subDevs){
        var monthString = indexToISOMonthString(chosenMonthIndex)
        const currentMonth = new Date(`${chosenYear}-${monthString}-01`)
        var subDevListHTML = '';
        subDevs.forEach((row)=>{
            var startDate = new Date(row.startDate)
            var endDate = new Date(row.endDate)
            if(startDate<=currentMonth && endDate>=currentMonth){
                subDevListHTML+=`<li>${row.subId}</li>`
            }
        })
        if(subDevListHTML){viewAllocSubDev.innerHTML=subDevListHTML}else{viewAllocSubDev.innerHTML='<li>No Subject Development active in this month.</li>'}
    }
    if(load){
        viewAllocLoad.innerHTML=load.result.toFixed(1)
    }
    toggleButton(viewAllocButton, 'Search')
}
const newInstance = async () =>{
    toggleButton(newInsButton)
    var startMonthIndex = monthIndexes.get(newInsMonth.value)
    if(subjectValues.some((subject)=>{if(subject.id==newInsSub.value){return true;}})){
        var instanceId = `${newInsSub.value}_${newInsYear.value}_${newInsMonth.value}`
        if(insRegex.test(instanceId)){
            var startMonth = indexToISOMonthString(startMonthIndex)
            try{
                var body = {id: instanceId, subId: newInsSub.value, startDate:`${newInsYear.value}-${startMonth}-01`}
                
                if(newInsEnrolments.value && (newInsEnrolments.value>=0 && newInsEnrolments.value<400)){
                    body.enrolments=newInsEnrolments.value;
                }else{
                    body.enrolments=0; var enforcedEnrolments = true;
                }
                var response = (await axios.post('/didasko/instances/', body))
                if(response.status<300 && response.status>199){
                    if(enforcedEnrolments){
                        showMessage(false, true, 'Instance added successfully.\nEnrolments were set to 0.', newInsMessage)
                    }else{
                        showMessage(false, true, 'Instance added successfully', newInsMessage)
                    }
                }
            }catch(err){
                if(err.response.data.message.substring(0, 35)==='Violation of PRIMARY KEY constraint'){
                    showMessage(true, false, `Cannot add duplicate record, ${body.id} already exists`, newInsMessage)
                }else{
                    showMessage(true, false, `There was an error, error code: ${err}`, newInsMessage)
                }
            }
        }else{
            showMessage(true, false, 'The instance name does not match the required format, e.g. CSE1ITX_2000_January.', newInsMessage)
        }
    }else{
        showMessage(true, false, 'Subject not found, please try again.', newInsMessage)
    }
    populateCombos()
    toggleButton(newInsButton, 'Add')
}
const editInstance = async () =>{
    toggleButton(editInsButton)
    var chosenInstance = instanceValues.find((instance)=>{
        if(editInsOldIns.value===instance.id){return instance}
    })

    if(chosenInstance){
        var chosenSubject = subjectValues.find((subject)=>{
            if(editInsNewSubject.value === subject.id){return subject}
        })
        if(chosenSubject){
            var instanceId = `${editInsNewSubject.value}_${editInsNewYear.value}_${editInsNewMonth.value}`
            var subId = editInsNewSubject.value;
        }else{
            var subId = chosenInstance.id.substring(0, 7);
            var instanceId = `${subId}_${editInsNewYear.value}_${editInsNewMonth.value}`
            var noSubId = true;
        }
        
        if(insRegex.test(instanceId)){
            var newInstanceMonthIndex = monthIndexes.get(editInsNewMonth.value);
            var startMonth = indexToISOMonthString(newInstanceMonthIndex)
            var body = {id: instanceId, subId: subId, startDate: `${editInsNewYear.value}-${startMonth}-01`}

            if(editInsEnrolments.value && (editInsEnrolments.value>=0 && editInsEnrolments.value<400)){
                body.enrolments=editInsEnrolments.value;
            }else{
                body.enrolments=0; var enforcedEnrolments = true;}

            try{
                var response = (await axios.patch(`/didasko/instances/${editInsOldIns.value}`, body))
                if(response.status<300 && response.status>199){
                    var successText = 'Instance saved successfully';
                    if(noSubId){
                        successText += '\nSubject not changed - omitted or not found.'
                    }else{
                        if (enforcedEnrolments){
                            successText += '\nEnrolments unchanged - omitted, <0, or >400.'
                        }
                    }
                    showMessage(false, true, successText, editInsMessage)
                }
            }catch(err){
                if(err.response.data.message.substring(0, 35)==='Violation of PRIMARY KEY constraint'){
                    showMessage(true, false, `Cannot add duplicate record, ${body.id} already exists`, editInsMessage)
                }else{
                    showMessage(true, false, `There was an error, error code: ${err}`, editInsMessage)
                }
            }
        }
        else{
            showMessage(true, false, 'The instance name does not match the required format, e.g. CSE1ITX_2000_January.', editInsMessage)
        }
    }else{
        showMessage(true, false, 'Instance not found, please try again.', editInsMessage)
    }
    populateCombos()
    toggleButton(editInsButton, 'Save')
}
const deleteInstance = async () =>{
    toggleButton(deleteButton)
    var chosenInstance = instanceValues.find((instance)=>{
        if(instance.id===deleteIns.value){return instance}})
    if(chosenInstance){
        if(confirm(`Are you sure you want to delete the instance ${chosenInstance.id}?\n\nContinuing will also delete associated all associated assignments.`)){
            try{
                var response = (await axios.delete(`/didasko/instances/${chosenInstance.id}`))
                if(response.status<300 && response.status>199){
                    showMessage(false, true, 'Instance deleted successfully.', deleteMessage)
                }
            }catch(err){
                showMessage(true, false, `There was an error, error code: ${response.status}`, deleteMessage)
            }
        }else{
            showMessage(true, false, 'Instance deletion cancelled.', deleteMessage)
        }
    }else{
        showMessage(true, false, 'Instance not found, please try again.', deleteMessage)
    }
    populateCombos()
    toggleButton(deleteButton, 'Delete')
}

const addListeners = () =>{
    //instanceInfo listener
    newInsButton.addEventListener('click', newInstance)
    editInsButton.addEventListener('click', editInstance)
    deleteButton.addEventListener('click', deleteInstance)
    viewAllocButton.addEventListener('click', viewInsAllocation)
    insInfoName.addEventListener('change', insInfo)
}

populateCombos()
addListeners()