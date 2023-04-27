const months = [ "January", "February", "March", "April", "May", "June", 
"July", "August", "September", "October", "November", "December" ];
//new Instance elements
const newInsSub = document.querySelector('#newInsSub')
const newInsYear = document.querySelector('#newInsYear')
const newInsMonth = document.querySelector('#newInsMonth')
const newInsEnrolments = document.querySelector('#newInsEnrolments')
const newInsButton = document.querySelector('#newInsButton')
//edit instance elements
const editInsOldIns = document.querySelector('#editInsOldIns')
const editInsNewSubject = document.querySelector('#editInsNewSubject')
const editInsNewYear = document.querySelector('#editInsNewYear')
const editInsNewMonth = document.querySelector('#editInsNewMonth')
const editInsEnrolments = document.querySelector('#editInsEnrolments')
const editInsButton = document.querySelector('#editInsButton')
//view Instance allocation elements
const viewAllocAcademic = document.querySelector('#viewAllocAcademic')
const viewAllocYear = document.querySelector('#viewAllocYear')
const viewAllocMonth = document.querySelector('#viewAllocMonth')
const viewAllocMain = document.querySelector('#viewAllocMain')
const viewAllocSupp = document.querySelector('#viewAllocSupp')
const viewAllocSubDev = document.querySelector('#viewAllocSubDev')
const viewAllocLoad = document.querySelector('#viewAllocLoad')
const viewAllocButton = document.querySelector('#viewAllocButton')
//instance info elements
const insInfoName = document.querySelector('#insInfoName')
const insInfoMain = document.querySelector('#insInfoMain')
const insInfoSupport = document.querySelector('#insInfoSupport')
const insInfoEnrolments = document.querySelector('#insInfoEnrolments')
//delete instance elements
const deleteIns = document.querySelector('#deleteIns')
const deleteButton = document.querySelector('#deleteButton')

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
//helper method that sets the options for year field in view instance Allocation
//sets options to only years that have instances in them
const yearOptions = (years)=>{
    var yearsHTML = ``;
    for( var year of years){
        viewAllocYear.innerHTML += `<option>${year}</option>`;
    }
}
//helper fucntion for refreshing comboBox values
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
    console.log(date)
    for(var i=0;i<3;i++){
        newInsYear.innerHTML += `<option>${date.getFullYear()+i}</option>`;
    }
    for(var i=0;i<3;i++){
        editInsNewYear.innerHTML += `<option>${date.getFullYear()+i}</option>`;
    }
}
//refreshes comboBox values
const populateCombos = async ()=>{
    subjectValues = (await axios.get('/didasko/subjects')).data
    instanceValues = (await axios.get('/didasko/instances/schedule')).data
    academicValues = (await axios.get('/didasko/academics')).data
    assignmentValues = (await axios.get('/didasko/assignments')).data

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
    var chosenAcademic = viewAllocAcademic.value
    const chosenMonthIndex = months.findIndex((element=>{if(element===`${viewAllocMonth.value}`)return true}))
    const chosenYear = viewAllocYear.value
    var subDevs;
    var load;
    if(academicNames.includes(chosenAcademic)){
        try{
            subDevs = (await axios.get(`/didasko/subDev/${chosenAcademic}`)).data
            load = (await axios.get(`/didasko/academics/load/${chosenAcademic}/${chosenYear}/${chosenMonthIndex+1}`)).data
        }catch(err){
            console.log(err)
        }
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
                // console.log(assignment.instanceId.substring(7))
                return true;
            }
        }
        return false;
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
        if(chosenMonthIndex<=8){
            var monthString = `0${chosenMonthIndex+1}`
        }else{
            var monthString = `${chosenMonthIndex+1}`
        }
        const currentMonth = new Date(`${chosenYear}-${monthString}-01`)
        var subDevListHTML = '';
        subDevs.forEach((row)=>{
            var startDate = new Date(row.startDate)
            var endDate = new Date(row.endDate)
            console.log('start date of current subDev: ', startDate.toISOString(),'end date of current subDev: ', endDate.toISOString())
            if(startDate<=currentMonth && endDate>=currentMonth){
                subDevListHTML+=`<li>${row.subId}</li>`
            }
        })
        if(subDevListHTML){viewAllocSubDev.innerHTML=subDevListHTML}else{viewAllocSubDev.innerHTML='<li>No Subject Development active in this month.</li>'}
    }
    if(load){
        viewAllocLoad.innerHTML=load.result.toFixed(1)
    }
}
const newInstance = async () =>{
    toggleButton(newInsButton)
    var startMonthIndex = months.findIndex((element)=>{if(element===`${newInsMonth.value}`)return true})
    if(subRegex.test(newInsSub.value)){
        var instanceId = `${newInsSub.value}_${newInsYear.value}_${newInsMonth.value}`
        if(insRegex.test(instanceId)){
            if((startMonthIndex+1)<=8){
                var startMonth = `0${startMonthIndex+1}`
            }else{
                var startMonth = `${startMonthIndex+1}`
            }
            try{
                var response = (await axios.post('/didasko/instances/', {id: instanceId, subId: newInsSub.value, startDate:`${newInsYear.value}-${startMonth}-01`, enrolments: newInsEnrolments.value})).data
                console.log('response')
                if(response.status<300 && response.status>199){
                    console.log('success!')
                }
            }catch(err){console.log(`there was an error, error code: ${err}`)}
            console.log('out of try catch')
            populateCombos()            
            console.log('populated combos')
        }else{
            console.log('instance is did not pass the instance regex')
        }
    }else{
        console.log('subject id did not pass the subject regex')
    }
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
            if(insRegex.test(instanceId)){
                var newInstanceMonthIndex = months.findIndex((element)=>{if(element===`${editInsNewMonth.value}`)return true})
                if((newInstanceMonthIndex+1)<=8){
                    var startMonth = `0${newInstanceMonthIndex+1}`
                }else{
                    var startMonth = `${newInstanceMonthIndex+1}`
                }
                var newInstance = {id: instanceId, subId: editInsNewSubject.value, startDate: `${editInsNewYear.value}-${startMonth}-01`}
                if(editInsEnrolments.value){
                    newInstance.enrolments = editInsEnrolments.value
                }
                try{
                    var response = (axios.patch(`/didasko/instances/${editInsOldIns.value}`, newInstance)).data
                    console.log(response)
                    if(response.status<300 && response.status>199){
                        console.log('success!')
                    }
                }catch(err){
                    console.log(`There was an error, error ${err}`)
                }
                console.log('out of try catch')
                populateCombos()
                console.log('populated combos')
            }
            else{
                console.log('new instance ID could not be validated')
            }
        }else{
            console.log('chosen subject was not found in list, please refresh and try again. The subject must already exist for a instance to be created.')
        }
    }else{
        console.log('instance to edit was not found in the list, please refresh and try again')
    }
    toggleButton(editInsButton, 'Save')
}
const deleteInstance = async () =>{
    toggleButton(deleteButton)
    if(insRegex.test(deleteIns.value)){
        var chosenInstance = instanceValues.find((instance)=>{
            if(instance.id===deleteIns.value){return instance}})
        if(chosenInstance){
            if(confirm(`Are you sure you want to delete ${chosenInstance.id}?\nThis operation will also delete any associated academic assignments.`)){
                try{
                    var response = (await axios.delete(`/didasko/instances/${chosenInstance.id}`))
                    if(response.status<300 && response.status>199){
                        console.log('success!')
                    }
                }catch(err){
                    console.log(`There was an error, error code: ${response.status}`)
                    console.log(reponse)
                }
                populateCombos()
            }else{
                console.log('They did not really want to do it')
            }
        }else{

        }
    }else{
        console.log('instance did not match the regex pattern')
    }
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