//month references
const months = [ "January", "February", "March", "April", "May", "June", 
"July", "August", "September", "October", "November", "December" ];
var monthIndexes = new Map();
months.forEach((month, index)=>{
    monthIndexes.set(month, index);
})
//schedule elements
const scheduleYearPicker = document.querySelector('#scheduleYearPicker')
const yearPickers = document.querySelectorAll('.yearPicker')
const radioButtons = document.querySelectorAll('.radio')
const table = document.querySelector('#scheduleTable')
const instAllButton = document.querySelector('.submitButton')

//view allocation fields
var academicCombo = document.getElementById('academicCombo')
const mainList = document.querySelector('#mainList')
const supportList = document.querySelector('#supportList')
const subDevList = document.querySelector('#subDevList')
const showLoad = document.querySelector('#showLoad')
var insAllocYear = document.getElementById('insAllocYear');
var insAllocMonth = document.getElementById('insAllocMonth');

//instance info fields
const insInfo = document.querySelector('#instanceCombo')
const mainAllocations = document.querySelector('#mainAllocations')
const supportAllocations = document.querySelector('#supportAllocations')
var enrolments = document.getElementById('enrolments');

var subjects;
var assignments;
var instancesSchedule;
var academics = [];
var byYear = new Map();
var assignmentsMap = new Map()

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
//takes array as input with elements being the years that have instances scheduled, e.g. [2022, 2023]
//populates year selecting dropdowns with years included in input
const yearOptions = (years)=>{
    var yearsHTML = ``;
    for( var year of years){
        yearsHTML += `<option>${year}</option>`;
    }
    yearPickers.forEach(yearPicker => {
        yearPicker.innerHTML=yearsHTML;
    });
}
//takes url for data download and destination listID to populate with said data
//can optionally take list in which will be used in place of data pulled using url
const setCombo = (data, listName)=>{
    if(document.querySelector(`#${listName}`)){document.querySelector(`#${listName}`).remove()};
    var comboList = document.createElement('datalist');
    comboList.id = listName;
    document.querySelector('.container').appendChild(comboList);
    data.forEach((value)=>{
        var option = document.createElement('option');
        option.innerHTML=value.id;
        comboList.appendChild(option);
    })
}
// const setCombo = async (url, listId, list)=>{
//     if (list){
//         var comboValues=list;
//     }else{
//         try{
//             var comboValues = ((await axios.get(url)).data)
//         }catch(err){
//             console.log(err)
//         }
//     }
//     var comboList = document.createElement('datalist');
//     comboList.id = `${listId}`;
//     comboValues.forEach((comboValue) =>{
//     var option = document.createElement('option');
//     option.innerHTML = comboValue.id;
//     comboList.appendChild(option);
//     })
//     document.body.appendChild(comboList);
// }
//sets the schedule to the currently chosen settings, called via eventListener
const setScheduleView = ()=>{
    const selectedYear = scheduleYearPicker.value
    var selectedLevel = document.querySelector('input[name="Level"]:checked').value;
    if(selectedLevel==='all'){
        var selectString = `.subjectRow.startYear${selectedYear}`;
    }else{
        var selectString = `.${selectedLevel}.startYear${selectedYear}`
    }
    var allRows = document.querySelectorAll('tr.subjectRow');
    allRows.forEach((row)=>{
        row.style.display = 'none';
    })
    var selectedRows = document.querySelectorAll(`tr${selectString}`);
    selectedRows.forEach(row => {
        row.style.display = 'flex';
    });

}
//checks input in view instance allocation form and displays output, called via event listener
const viewInsAllocation = async ()=>{
    var academicValue = academicCombo.value
    const chosenMonthIndex = months.findIndex((element=>{if(element===`${insAllocMonth.value}`)return true}))
    const chosenYear = insAllocYear.value
    var subDevs;
    var load;
    if(academics.some((academic)=>{
        if(academic.id==academicValue){return true;}
    })){
        try{
            subDevs = (await axios.get(`/didasko/subDev/${academicValue}`)).data
            load = (await axios.get(`/didasko/academics/load/${academicValue}/${chosenYear}/${chosenMonthIndex+1}`)).data
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
    
    var mainAllocationsHTML = ``;
    var supportAllocationsHTML = ``;
    const allocations = assignments.filter((assignment)=>{
        if(assignment.academicId===academicValue){
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
            mainAllocationsHTML += `<li>${allocation.instanceId}</li>`;
            
        }else{
            supportAllocationsHTML += `<li>${allocation.instanceId}</li>`;
        }    
    })
    if(mainAllocationsHTML){mainAllocations.innerHTML = mainAllocationsHTML;}else{
        mainAllocations.innerHTML = '<li>No allocations</li>'
    }
    if(supportAllocationsHTML){supportAllocations.innerHTML = supportAllocationsHTML;}else{
        supportAllocations.innerHTML = '<li>No allocations</li>'
    }
    if(subDevs){
        var monthString = indexToISOMonthString(chosenMonthIndex);
        const currentMonth = new Date(`${chosenYear}-${monthString}-01`);
        console.log('selected month: ', currentMonth.toISOString());
        var subDevListHTML = '';
        subDevs.forEach((row)=>{
            var startDate = new Date(row.startDate)
            var endDate = new Date(row.endDate)
            console.log('start date of current subDev: ', startDate.toISOString(),'end date of current subDev: ', endDate.toISOString())
            if(startDate<=currentMonth && endDate>=currentMonth){
                subDevListHTML+=`<li>${row.subId}</li>`
            }
        })
        if(subDevListHTML){subDevList.innerHTML=subDevListHTML}else{subDevList.innerHTML='<li>No Subject Development active in this month.</li>'}
    }
    if(load){
        showLoad.innerHTML=load.result.toFixed(1)
    }
}

//logic to view information about a certain instance
const viewInsInfo = ()=>{
    const input = insInfo.value
    var mainListHTML = ``;
    var supportListHTML = ``;
    var relevantAcademics;
        byYear.forEach(instanceMap => {
            if(instanceMap.has(input)){

                enrolments.innerText=instanceMap.get(input).enrolments

                relevantAcademics = assignments.filter((assignment)=>{
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
                if(mainListHTML){mainList.innerHTML = mainListHTML;}else{
                    mainList.innerHTML = '<li>No allocations</li>'
                }
                if(supportListHTML){supportList.innerHTML = supportListHTML;}else{
                    supportList.innerHTML = '<li>No allocations</li>'
                }
            }
        });
}
const addListeners = ()=>{
    scheduleYearPicker.addEventListener('change', setScheduleView)
    for (var i = 0;i<radioButtons.length;i++){
        radioButtons[i].addEventListener('change', setScheduleView)
    }
    instAllButton.addEventListener('click', viewInsAllocation)
    insInfo.addEventListener('change', viewInsInfo)
}
const loadSchedule = async ()=>{
    try{
        // academics = await axios.get('/didasko/academics').data;
        
        const data = await Promise.all([
            axios.get('/didasko/academics'),
            axios.get('/didasko/instances/schedule'),
            axios.get('/didasko/assignments'),
            axios.get('/didasko/subjects')]);

        academics = data[0].data;
        instancesSchedule = data[1].data;
        assignments = data[2].data;
        subjects = data[3].data;
        
    for (var o = 0;o<instancesSchedule.length;o++){
            if(!byYear.has(instancesSchedule[o].year)){
                byYear.set(instancesSchedule[o].year, new Map())
            }
            byYear.get(instancesSchedule[o].year).set(instancesSchedule[o].id, instancesSchedule[o])
        }
        //sets year selection fields with years that have instances in them
        yearOptions(byYear.keys())

        for (var i = 0;i<assignments.length;i++){
            if (assignments[i].main){
                assignmentsMap.set(assignments[i].instanceId, assignments[i])
            }
        }

        var tableHTML = ``;
        byYear.forEach((yearInstances, year)=>{
            for (var i = 0;i<subjects.length;i++){
                var statuses='';
                
                for (var o = 0; o<12;o++){
                    const currentInstanceId = `${subjects[i].id}_${year}_${months[o]}`;
                    if (yearInstances.has(currentInstanceId)){
                        if(assignmentsMap.has(currentInstanceId)){
                            statuses+=`<td><div class="scheduleBox greenbox"></div></td>`;
                        }else{
                            statuses+=`<td><div class="scheduleBox redbox"></div></td>`;
                        }
                    }else{
                        statuses+=`<td><div class="scheduleBox graybox"></div></td>`;
                    }                      
                }
                var row = `<tr class="tableRow subjectRow yearLevel${subjects[i].yearLevel} startYear${year}">
                            <th class="scheduleLabel"><span>${subjects[i].id}</span></th>
                            ${statuses}
                        </tr>`;
                tableHTML+=row;
            }
        })
        table.insertAdjacentHTML("beforeend", tableHTML)
        setScheduleView()
        setCombo(academics, 'academicList')        
        setCombo(instancesSchedule, 'instanceList')
    }catch(err){
        console.log(err)
    }
}

loadSchedule();
addListeners();
