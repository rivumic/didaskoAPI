//month references;
const months = ["January", "February", "March", 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const shortMonths = ["Jan", "Feb", "March", "April", "May", "June", 
"July", "Aug", "Sep", "Oct", "Nov", "Dec"];
var monthIndexes = new Map();
months.forEach((month, index)=>{
    monthIndexes.set(month, index);
})
//assign instance elements
const assignInstanceMainAcademicId = document.querySelector('#assignInstanceMainAcademicId');
const assignInstanceMainYear = document.querySelector('#assignInstanceMainYear');
const assignInstanceMainMonth = document.querySelector('#assignInstanceMainMonth');
const assignInstanceMainYear1 = document.querySelector('#assignInstanceMainYear1');
const assignInstanceMainYear2 = document.querySelector('#assignInstanceMainYear2');
const assignInstanceMainYear3 = document.querySelector('#assignInstanceMainYear3');
const assignInstanceMainButton = document.querySelector('#assignInstanceMainButton');
const assignInstanceMainMessage = document.querySelector('#assignInstanceMainMessage');
//assign support instance elements
const assignInstanceSupportAcademicId = document.querySelector('#assignInstanceSupportAcademicId');
const assignInstanceSupportYear = document.querySelector('#assignInstanceSupportYear');
const assignInstanceSupportMonth = document.querySelector('#assignInstanceSupportMonth');
const assignInstanceSupportYear1 = document.querySelector('#assignInstanceSupportYear1');
const assignInstanceSupportYear2 = document.querySelector('#assignInstanceSupportYear2');
const assignInstanceSupportYear3 = document.querySelector('#assignInstanceSupportYear3');
const assignInstanceSupportButton = document.querySelector('#assignInstanceSupportButton');
const assignInstanceSupportMessage = document.querySelector('#assignInstanceSupportMessage');
//view/delete sub dev elements
const subDevAcademicId = document.querySelector('#subDevAcademicId');
const subDevContainer = document.querySelector('.subDevContainer');
const subDevSubmitButton = document.querySelector('#subDevSubmitButton');
const subDevMessage = document.querySelector('#subDevMessage');
//available academics elements
const availableAcademicsQual = document.querySelector('#availableAcademicsQual');
const availableAcademicsYear = document.querySelector('#availableAcademicsYear');
const availabeAcademicsMonth = document.querySelector('#availableAcademicsMonth');
const availableAcademicsButton = document.querySelector('#availableAcademicsButton');
const availableAcademicsMessage = document.querySelector('#availableAcademicsMessage');
const availableAcademicsTable = document.querySelector('#availableAcademicsTable');
//delete academic elements
const deleteAcademicId = document.querySelector('#deleteAcademicId');
const deleteAcademicButton = document.querySelector('#deleteAcademicButton');
const deleteAcademicMessage = document.querySelector('#deleteAcademicMessage');
//view Instance allocation elements
const viewAllocAcademic = document.querySelector('#viewAllocAcademic');
const viewAllocYear = document.querySelector('#viewAllocYear');
const viewAllocMonth = document.querySelector('#viewAllocMonth');
const viewAllocButton = document.querySelector('#viewAllocButton');
const viewAllocMessage = document.querySelector('#viewAllocMessage');
const viewAllocMain = document.querySelector('#viewAllocMain');
const viewAllocSupp = document.querySelector('#viewAllocSupp');
const viewAllocSubDev = document.querySelector('#viewAllocSubDev');
const viewAllocLoad = document.querySelector('#viewAllocLoad');

//instance info elements
const insInfoName = document.querySelector('#insInfoName')
const insInfoMain = document.querySelector('#insInfoMain')
const insInfoSupport = document.querySelector('#insInfoSupport')
const insInfoEnrolments = document.querySelector('#insInfoEnrolments')
//new academic elements
const newAcademicId = document.querySelector('#newAcademicId');
const newAcademicButton = document.querySelector('#newAcademicButton');
const newAcademicMessage = document.querySelector('#newAcademicMessage');
//assign sub dev elements
const newSubDevAcademicId = document.querySelector('#newSubDevAcademicId');
const newSubDevSubject = document.querySelector('#newSubDevSubject');
const newSubDevStartYear = document.querySelector('#newSubDevStartYear');
const newSubDevStartMonth = document.querySelector('#newSubDevStartMonth');
const newSubDevEndYear = document.querySelector('#newSubDevEndYear');
const newSubDevEndMonth = document.querySelector('#newSubDevEndMonth');
const newSubDevButton = document.querySelector('#newSubDevButton');
const newSubDevMessage = document.querySelector('#newSubDevMessage');
//edit academic elements
const editOldAcademicId = document.querySelector('#editOldAcademicId');
const editNewAcademicId = document.querySelector('#editNewAcademicId');
const editAcademicButton = document.querySelector('#editAcademicButton')
const editAcademicMessage = document.querySelector('#editAcademicMessage')



var subjectValues;
var instanceValues;
var byYear = new Map();
var academicValues;
var academicNames = [];
var assignmentValues;
var assignmentMapByMonth = new Map()
var selectedInstances = [];

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

/*Logic for form presentation/form population:*/

//helper method that sets the options for year field in view instance Allocation
//sets options to only years that have instances in them
const yearOptions = (years)=>{
    assignInstanceMainYear.innerHTML = '';
    assignInstanceSupportYear.innerHTML = '';
    availableAcademicsYear.innerHTML = '';
    viewAllocYear.innerHTML = '';
    for( var year of years){
        assignInstanceMainYear.innerHTML += `<option>${year}</option>`;
        assignInstanceSupportYear.innerHTML += `<option>${year}</option>`;
        availableAcademicsYear.innerHTML +=`<option>${year}</option>`;
        viewAllocYear.innerHTML += `<option>${year}</option>`;
    }
}

//helper function for refreshing comboBox values
const setCombo = (data, listName)=>{
    if(document.querySelector(`#${listName}`)){document.querySelector(`#${listName}`).remove()};
    var comboList = document.createElement('datalist');
    comboList.id = listName;
    document.querySelector('.flexContainer').appendChild(comboList);
    data.forEach((value)=>{
        var option = document.createElement('option');
        option.innerHTML=value.id;
        comboList.appendChild(option);
    })
}
//sets the option in field that select the year of in new/edit instance forms
const populateYears = ()=>{
    newSubDevStartYear.innerHTML = '';
    newSubDevEndYear.innerHTML  = '';
    var date = new Date()
    for(var i=0;i<3;i++){
        newSubDevStartYear.innerHTML += `<option>${date.getFullYear()+i}</option>`;
        newSubDevEndYear.innerHTML += `<option>${date.getFullYear()+i}</option>`;
    }
}
//checks checkboxes for subjects that the selected academic is already recorded as qualified to teach
//called upon change of academic 
const fillQuals = async ()=>{
    const chosenAcademic = editOldAcademicId.value;
    document.querySelectorAll('.editAcademicQualsCheckbox').forEach((checkbox)=>{
        checkbox.checked = false;
    })
    if(chosenAcademic){
        if(academicNames.includes(chosenAcademic)){
            const quals = (await axios.get(`/didasko/academics/quals/${chosenAcademic}`)).data
            subjectValues.forEach((subject)=>{
                if(quals.some((qual)=>{if(qual.subId==subject.id){return true;}})){
                    document.querySelector(`#editAcademic_${subject.id}`).checked = true;
                }
            })
        }
    }
}
//helper function for populateFields, populates the subject qualification fields with checkboxes
const populateQuals = (formPrefix)=>{
    const year1 = document.querySelector(`#${formPrefix}AcademicYear1`)
    const year2 = document.querySelector(`#${formPrefix}AcademicYear2`)
    const year3 = document.querySelector(`#${formPrefix}AcademicYear3`)
    year1.innerHTML = '';
    year2.innerHTML = '';
    year3.innerHTML = '';
    
    subjectValues.forEach((subject)=>{
        const subjectHTML = `<input id="${formPrefix}Academic_${subject.id}" type="checkbox" class="academicsCheckbox ${formPrefix}AcademicQualsCheckbox"/><label class="checkboxLabel" for="${formPrefix}Academic_${subject.id}">${subject.id}</label>`
        switch(subject.yearLevel) {
            case 1:
                year1.innerHTML += subjectHTML;
                break;
            case 2:
                year2.innerHTML += subjectHTML;
                break;
            case 3:
                year3.innerHTML += subjectHTML;
                break;
        }
    })
}
//checks the checkboxes that for assignments that commence in the selected year/month that are already assigned to the selected academic
//called upon change of year, month and academic selection
const fillAssignments = (assignType, academicId, year, month)=>{
    var isMain;
    if(assignType=='Main'){
        isMain = true;
    }
    else{
        isMain = false;
    }
    const chosenAcademic = academicId.value;
    document.querySelectorAll(`.assignInstance${assignType}Checkbox`).forEach((checkbox)=>{
        checkbox.checked = false;
    })
    if(chosenAcademic){
        if(academicNames.includes(chosenAcademic)){
            selectedInstances.forEach((instance)=>{
                if(assignmentMapByMonth.has(`${year.value}_${month.value}`)){
                    if(assignmentMapByMonth.get(`${year.value}_${month.value}`).some((assignment)=>{
                        if(assignment.academicId==chosenAcademic && assignment.instanceId==instance.id && assignment.main==isMain){return true;}})){
                    document.querySelector(`#assignInstance${assignType}_${instance.subId}`).checked = true;
                }
                }
                
            })
        }
    }
}
//populates the assign instance form with checkboxes representing the instance scheduled in the selected year/month
const populateInstances = (assignType, year, month, year1, year2, year3, academicId)=>{
    selectedInstances = [];
    year1.innerHTML = '';
    year2.innerHTML = '';
    year3.innerHTML = '';
    const selectedYear = year.value;
    const selectedMonth = month.value;
    
    selectedInstances = instanceValues.filter((instance)=>{
        if(months[instance.month-1]===selectedMonth && instance.year==selectedYear){
                return true;
        }else{
            return false;
        }
    })
    selectedInstances.forEach((instance)=>{
        const subject = instance.subId
        const yearLevel = subject.charAt(3)
        const instanceHTML = `<input id="assignInstance${assignType}_${subject}" type="checkbox" class="academicsCheckbox assignInstance${assignType}Checkbox"/>  <label class="checkboxLabel" for="assignInstance${assignType}_${subject}">${subject}</label>`;
        switch(yearLevel){
            case '1':
                year1.innerHTML += instanceHTML;
                break;
            case '2':
                year2.innerHTML += instanceHTML;
                break;
            case '3':
                year3.innerHTML += instanceHTML;
                break;
        }
    })
    if(!year1.innerHTML){year1.innerHTML='No instance scheduled in this month.'}
    if(!year2.innerHTML){year2.innerHTML='No instance scheduled in this month.'}
    if(!year3.innerHTML){year3.innerHTML= '<span>No instance scheduled in this month.</span'}
    if(academicId.value){
        fillAssignments(assignType, academicId, year, month)
    }
}
//refreshes comboBox values
const populateFields = async ()=>{
    try{
        //sets year fields in new and edit instance forms
    populateYears()
    
    const data = await Promise.all([axios.get('/didasko/subjects'),
    axios.get('/didasko/instances/schedule'),
    axios.get('/didasko/academics'),
    axios.get('/didasko/assignments')])

    subjectValues = data[0].data
    instanceValues = data[1].data
    academicValues = data[2].data
    assignmentValues = data[3].data

    academicNames = [];
    academicValues.forEach((academic)=>{
        academicNames.push(academic.id)
    })

    //sort instances into a map of arrays organising instances by start year
    byYear = new Map();
    for (var o = 0;o<instanceValues.length;o++){
        if(!byYear.has(instanceValues[o].year)){
            byYear.set(instanceValues[o].year, new Map())
        }
        byYear.get(instanceValues[o].year).set(instanceValues[o].id, instanceValues[o])
    }
    //sorts assignments into arrays by month, accessible by a key YYYY_monthName via a Map()
    assignmentMapByMonth = new Map();
    assignmentValues.forEach((assignment)=>{
        if(!assignmentMapByMonth.has(assignment.instanceId.substring(8))){
            assignmentMapByMonth.set(assignment.instanceId.substring(8), [])
        }
        assignmentMapByMonth.get(assignment.instanceId.substring(8)).push(assignment)
    })

    
    //sets year field in view instance allocation
    yearOptions(byYear.keys())

    //set prefill options for combo boxes
    setCombo(subjectValues, 'subjectList')
    setCombo(instanceValues, 'instanceList')
    setCombo(academicValues, 'academicList')

    //populates subject selection for qualification in the new and edit academic forms
    populateQuals('new')
    populateQuals('edit')
    //populates instance options for assign instance form
    populateInstances('Main', assignInstanceMainYear, assignInstanceMainMonth, assignInstanceMainYear1, assignInstanceMainYear2, assignInstanceMainYear3, assignInstanceMainAcademicId)
    populateInstances('Support', assignInstanceSupportYear, assignInstanceSupportMonth, assignInstanceSupportYear1, assignInstanceSupportYear2, assignInstanceSupportYear3, assignInstanceMainAcademicId)

    fillAssignments('Main', assignInstanceMainAcademicId, assignInstanceMainYear, assignInstanceMainMonth)
    fillAssignments('Support', assignInstanceSupportAcademicId, assignInstanceSupportYear, assignInstanceSupportMonth)
    fillQuals()
    }catch(err){
        console.log(err)
    }
    
}

//display logic for the available academics form
const availableAcademics = async ()=>{
    toggleButton(availableAcademicsButton)
    var chosenMonth = indexToISOMonthString(monthIndexes.get(availableAcademicsMonth.value))
    if(availableAcademicsQual.value){
        var chosenQual = subjectValues.find((subject)=>{
            if(availableAcademicsQual.value === subject.id){
                return subject;
            }
        })
        if(chosenQual){
            try{
                var response = (await axios.get(`/didasko/academics/quals/load/${chosenQual.id}/${availableAcademicsYear.value}/${chosenMonth}`))
                availableAcademicsTable.innerHTML = '';
                for (const academic in response.data.result){
                    availableAcademicsTable.innerHTML += `<tr><td>${academic}</td><td class="tableLoadValue">${response.data.result[academic].toFixed(1)}</td></tr>`;
                }
            }catch(err){
                showMessage(true, false, `There was an error: error code ${err}`, availableAcademicsMessage)
            }
        }else{
            showMessage(true, false, 'Subject not found.', availableAcademicsMessage)
        }
    }else{
        showMessage(true, false, 'Please enter a qualification.', availableAcademicsMessage)
    }
    toggleButton(availableAcademicsButton, 'Search')
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
//displays subject development workloads for a selected academic
const viewSubDev = async ()=>{
    subDevContainer.innerHTML = '';
    var chosenAcademic = subDevAcademicId.value
    if(academicNames.includes(chosenAcademic)){
        try{
            var response = (await axios.get(`didasko/subDev/${chosenAcademic}`)).data
            if(response.length){  
                response.forEach((subDev)=>{
                    var startDate = new Date(subDev.startDate)
                    var endDate = new Date(subDev.endDate)
                    subDevContainer.innerHTML += `<input id="subDev_${subDev.subId}" type="checkbox" class="subDevCheckbox"/>  <label class="subDevCheckboxLabel" for="subDev_${subDev.subId}"><h4 class="subDevHeading">${subDev.subId}</h4><p class="subDevSubHeading">Start: <span class="subDevDate">${shortMonths[startDate.getMonth()] + ' ' + startDate.getFullYear()}</span></p><p class="subDevSubHeading">End: <span class="subDevDate">${shortMonths[endDate.getMonth()] + ' ' + endDate.getFullYear()}</span></p></label>`
                })
            }else{
                subDevContainer.innerHTML = `<h4>No Subject Development found for ${chosenAcademic}.</h4>`;
            }
        }
        catch(err){
            showMessage(true, false, `There was an error: error code ${err}`, subDevMessage)
        }
    }
}

//display logic for the view instance allocation form - called from event listener
const viewInsAllocation = async ()=>{
    toggleButton(viewAllocButton)
    var chosenAcademic = viewAllocAcademic.value
    const chosenMonthIndex = monthIndexes.get(viewAllocMonth.value);
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
                // console.log(assignment.instanceId.substring(7))
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
        const currentMonth = new Date(`${chosenYear}-${indexToISOMonthString(chosenMonthIndex)}-01`)
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
    toggleButton(viewAllocButton, "Search")
}

/*Logic for form submission:*/
//add new academic
const addAcademic = async ()=>{
    toggleButton(newAcademicButton)
    const chosenAcademic = newAcademicId.value;
    var quals = [];
    document.querySelectorAll('input.newAcademicQualsCheckbox[type="checkbox"]:checked').forEach((checkbox)=>{
        quals.push(checkbox.id.substring(12))
    })
    var body = {id: chosenAcademic, quals: quals};

    try{
        var response = (await axios.post('/didasko/academics', body))
        if(response.status<300 && response.status>199){
            showMessage(false, true, 'Academic created successfully.', newAcademicMessage)
        }
    }catch(err){
        if(err.response.data.message.substring(0, 35)==='Violation of PRIMARY KEY constraint'){
            showMessage(true, false, `Cannot add create duplicate record, ${body.id} already exists`, newAcademicMessage)
        }else{
            showMessage(true, false, `There was an error, error code: ${err}`, newAcademicMessage)
        }
    }
    populateFields()
    toggleButton(newAcademicButton, 'Add')
}
const editAcademic = async ()=>{
    toggleButton(editAcademicButton)
    const chosenAcademic = editOldAcademicId.value;
    if(chosenAcademic && academicNames.includes(chosenAcademic)){
        
        var quals = [];
        document.querySelectorAll('input.editAcademicQualsCheckbox[type="checkbox"]:checked').forEach((checkbox)=>{
            quals.push(checkbox.id.substring(13))
        })
        
        var body = {quals: quals}

        if(editNewAcademicId.value){
            body.id=editNewAcademicId.value;
        }        
        
        try{
            var response = (await axios.patch(`/didasko/academics/${chosenAcademic}`, body))
            if(response.status<300 && response.status>199){
                showMessage(false, true, 'Academic saved successfully.', editAcademicMessage)
            }
            editOldAcademicId.value = '';
            editOldAcademicId.value = '';
            fillQuals()
        }catch(err){
            if(err.response.data.message.substring(0, 35)==='Violation of PRIMARY KEY constraint'){
                showMessage(true, false, `Cannot add create duplicate record, ${body.id} already exists`, editAcademicMessage)
            }else{
                showMessage(true, false, `There was an error, ${err.response.data.message}`, editAcademicMessage)
            }
            fillQuals()
        }
    }else{
        showMessage(true, false, `Academic not found, please try again.`, editAcademicMessage)
    }
    populateFields()
    toggleButton(editAcademicButton, 'Save')
}
const deleteAcademic = async ()=>{
    toggleButton(deleteAcademicButton, 'Delete')
    const chosenAcademic = deleteAcademicId.value;
    if(chosenAcademic && academicNames.includes(chosenAcademic)){
        if(window.confirm(`Are you sure you want to delete the academic: "${chosenAcademic}"?\n\nContinuing will delete all associated qualifications, assignments and subject development.`)){
            try{
                var response = (await axios.delete(`/didasko/academics/${chosenAcademic}`))
                if(response.status<300 && response.status>199){
                    showMessage(false, true, 'Academic deleted successfully.', deleteAcademicMessage)
                }
                deleteAcademicId.value = '';
            }catch(err){
                if(response.status==404){
                    showMessage(true, false, 'Academic not found, please try again.', deleteAcademicMessage)
                }else{
                    showMessage(true, false, `There was an error, error code: ${err}`, deleteAcademicMessage)
                }
            }
        }
    }
    populateFields()
    toggleButton(deleteAcademicButton, 'Delete')
}
//assign support instance allocations
const assignInstances = async (button, academicId, yearField, monthField, errorField, assignType)=>{
    toggleButton(button)
    var isMain;
    if(assignType=='Main'){
        isMain=true;
    }else{
        isMain=false;
    }
    const chosenAcademic = academicId.value;
    const year = yearField.value;
    const month = monthField.value;


    if(academicNames.includes(chosenAcademic)){
        selectedInstances = [];
        document.querySelectorAll(`input.assignInstance${assignType}Checkbox[type="checkbox"]:checked`).forEach((checkbox)=>{
            selectedInstances.push({instanceId: `${checkbox.id.substring(checkbox.id.length-7)}_${year}_${month}`, academicId: chosenAcademic, main: isMain})
        })


        var startDate = new Date(`${year}-${indexToISOMonthString(monthIndexes.get(month))}-01`)
        const body = {startDate: startDate, isMainUpdate: isMain, assignments: selectedInstances}


        try{
            var response = (await axios.patch(`/didasko/assignments/${chosenAcademic}`, body))

            if(response.status<300 && response.status>199){
                if(response.data.unqualified){
                    var alertString = `${chosenAcademic} was not qualified to teach all selected instances. The following instances were not assigned:\n`;
                    
                    response.data.unqualified.forEach((unQual)=>{
                        alertString += `\n${unQual}`;
                    })
                    window.alert(alertString)
                }

                if(response.data.overloadMonths){
                    var overloadString = `Assignment successful.\nNote: ${chosenAcademic} is over max load in:\n`;
                    response.data.overloadMonths.forEach((overload)=>{
                        overloadMonth = new Date(overload)
                        overloadString+= `${months[overloadMonth.getMonth()]} ${overloadMonth.getFullYear()}\n`
                    })
                    showMessage(true, false, overloadString, errorField)    
                }else{
                showMessage(false, true, 'Assignment successful.', errorField)
                }
            }
        }catch(err){
            if(err.response.data.message.substring(0, 35)==='Violation of PRIMARY KEY constraint'){
                showMessage(true, false, `Error: Cannot add create duplicate record.`, errorField)
            }else{
                showMessage(true, false, `There was an error: ${err}`, errorField)
            }            
        }
    }else{
        showMessage(true, false, 'Academic not found, please try again.', errorField)
    }
    populateFields();
    toggleButton(button, 'Save');
}
//adds subject development workload
const addSubDev = async ()=>{
    toggleButton(newSubDevButton, 'Add')
    const chosenAcademic = newSubDevAcademicId.value;
    const chosenSubject = newSubDevSubject.value;
    if(academicNames.includes(chosenAcademic) && subjectValues.some((subject)=>{if(subject.id==chosenSubject) return true;})){
        var startDate = new Date(`${newSubDevStartYear.value}-${indexToISOMonthString(monthIndexes.get(newSubDevStartMonth.value))}`)
        var endDate = new Date(`${newSubDevEndYear.value}-${indexToISOMonthString(monthIndexes.get(newSubDevEndMonth.value))}`)
    
        var body = {startDate: startDate.toISOString(),endDate: endDate.toISOString()}
        if(startDate<=endDate){
            try{
                var response = (await axios.post(`/didasko/subDev/${chosenAcademic}/${chosenSubject}`, body))
                if(response.status<300 && response.status>199){
                    if(response.data.overload){
                        console.log('')
                        var overloadString = `Subject development added successfully.\nNote: ${chosenAcademic} is over max load in:\n`;
                        response.data.overloadMonths.forEach((overload)=>{
                            overloadMonth = new Date(overload)

                            overloadString+= `${months[overloadMonth.getMonth()]} ${overloadMonth.getFullYear()}\n`
                        })
                        showMessage(true, false, overloadString, newSubDevMessage)    
                    }else{
                        showMessage(false, true, 'Subject development added successfully.', newSubDevMessage)
                    }
                }
            }catch(err){
                if(err.response.data.message.substring(0, 35)==='Violation of PRIMARY KEY constraint'){
                    showMessage(true, false, `Error: Cannot add create duplicate record, ${chosenAcademic} is already assigned subject development for ${chosenSubject}.`, newSubDevMessage)
                }else{
                    showMessage(true, false, `There was an error: ${err}`, newSubDevMessage)
                }
            }
        }else{
            showMessage(true, false, 'The start date must be after the end date.', newSubDevMessage)
        }
    }else{
        showMessage(true, false, 'The academic name and/or subject name could not be verified, please try again.', newSubDevMessage)
    }
    viewSubDev();
    populateFields();
    toggleButton(newSubDevButton, 'Add')
}
//send delete request for subject development workloads
const deleteSubDev = async ()=>{
    toggleButton(subDevSubmitButton, 'Delete Selection')
    const chosenAcademic = subDevAcademicId.value;
    if(academicNames.includes(chosenAcademic)){
        var subDevs = [];
        document.querySelectorAll('input.subDevCheckbox[type="checkbox"]:checked').forEach((checkbox)=>{
            subDevs.push(checkbox.id.substring(7))
        })
        if(subDevs){
            var body = [];
            subDevs.forEach((subDev)=>{
            body.push({academicId: chosenAcademic,subId: subDev})
        })
            try{
                var response = (await axios.patch(`/didasko/subDev/`, body))
                if(response.status<300 && response.status>199){
                    showMessage(false, true, 'success!', subDevMessage)
                }
            }catch(err){
                showMessage(true, false, `There was an error, error code: ${err}`, subDevMessage)
            }
        }else{
            showMessage(true, true, 'No subject development selection supplied, click a subject to select it.', subDevMessage)
        }
    }else{
        showMessage(true, false, 'Academic not found, please try again.', subDevMessage)
    }
    viewSubDev()
    populateFields()
    toggleButton(subDevSubmitButton, 'Delete Selection')
}

const addListeners = () =>{
    //view sub dev 
    subDevAcademicId.addEventListener('change', viewSubDev)
    //available academics
    availableAcademicsButton.addEventListener('click', availableAcademics)
    //instance allocation
    viewAllocButton.addEventListener('click', viewInsAllocation)
    //view instance Info
    insInfoName.addEventListener('change', insInfo)
    //populate edit academic qualifications
    editOldAcademicId.addEventListener('input', fillQuals)

    //form submission listeners
    //add new academic form
    newAcademicButton.addEventListener('click', addAcademic)
    //edit academic form
    editAcademicButton.addEventListener('click', editAcademic)
    //delete academic form
    deleteAcademicButton.addEventListener('click', deleteAcademic)
    //add sub Dev form
    newSubDevButton.addEventListener('click', addSubDev)
    //delete sub Dev form
    subDevSubmitButton.addEventListener('click', deleteSubDev)
    //assign main role
    assignInstanceMainAcademicId.addEventListener('input', ()=>{fillAssignments('Main', assignInstanceMainAcademicId, assignInstanceMainYear, assignInstanceMainMonth)})
    assignInstanceMainMonth.addEventListener('change', ()=>{populateInstances('Main', assignInstanceMainYear, assignInstanceMainMonth, assignInstanceMainYear1, assignInstanceMainYear2, assignInstanceMainYear3, assignInstanceMainAcademicId)})
    assignInstanceMainYear.addEventListener('change', ()=>{populateInstances('Main', assignInstanceMainYear, assignInstanceMainMonth, assignInstanceMainYear1, assignInstanceMainYear2, assignInstanceMainYear3, assignInstanceMainAcademicId)})
    assignInstanceMainButton.addEventListener('click', ()=>{assignInstances(assignInstanceMainButton, assignInstanceMainAcademicId, assignInstanceMainYear, assignInstanceMainMonth, assignInstanceMainMessage, 'Main')})
    //assign support role
    assignInstanceSupportAcademicId.addEventListener('input', ()=>{fillAssignments('Support', assignInstanceSupportAcademicId, assignInstanceSupportYear, assignInstanceSupportMonth)})
    assignInstanceSupportMonth.addEventListener('change', ()=>{populateInstances('Support', assignInstanceSupportYear, assignInstanceSupportMonth, assignInstanceSupportYear1, assignInstanceSupportYear2, assignInstanceSupportYear3, assignInstanceSupportAcademicId)})
    assignInstanceSupportYear.addEventListener('change', ()=>{populateInstances('Support', assignInstanceSupportYear, assignInstanceSupportMonth, assignInstanceSupportYear1, assignInstanceSupportYear2, assignInstanceSupportYear3, assignInstanceSupportAcademicId)})
    assignInstanceSupportButton.addEventListener('click', ()=>{assignInstances(assignInstanceSupportButton, assignInstanceSupportAcademicId, assignInstanceSupportYear, assignInstanceSupportMonth, assignInstanceSupportMessage, 'Support')})
}

populateFields()
addListeners()


