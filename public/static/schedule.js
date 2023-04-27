// get * from subjects
// get * from instances
// get * from assignments

// const academics = (await axios.get('/didasko/academics')).data
//const instances = (await axios.get('/didasko/instances')).data

const months = [ "January", "February", "March", "April", "May", "June", 
"July", "August", "September", "October", "November", "December" ];
const scheduleYearPicker = document.querySelector('#scheduleYearPicker')
const yearPickers = document.querySelectorAll('.yearPicker')
const radioButtons = document.querySelectorAll('.radio')
const table = document.querySelector('#scheduleTable')
const instAllButton = document.querySelector('.submitButton')
const insInfo = document.querySelector('#instanceCombo')
const mainList = document.querySelector('#mainList')
const supportList = document.querySelector('#supportList')
const subDevList = document.querySelector('#subDevList')
const showLoad = document.querySelector('#showLoad')
const mainAllocations = document.querySelector('#mainAllocations')
const supportAllocations = document.querySelector('#supportAllocations')
var academicCombo = document.getElementById('academicCombo')
var insAllYear = document.getElementById('insAllYear');
var insAllMonth = document.getElementById('insAllMonth');

var assignments;
var instancesSchedule;
var academics = [];
var byYear = new Map();
var assignmentsMap = new Map()

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
const setCombo = async (url, listId, list)=>{
    if (list){
        var comboValues=list;
    }else{
        var comboValues = ((await axios.get(url)).data)
        if(listId==='academicList'){
            comboValues.forEach((element)=>{
                academics.push(element.id)
            })}
    }
    var comboList = document.createElement('datalist');
    comboList.id = `${listId}`;
    comboValues.forEach((comboValue) =>{
    var option = document.createElement('option');
    option.innerHTML = comboValue.id;
    comboList.appendChild(option);
    })
    document.body.appendChild(comboList);
}
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
    const chosenMonth = months.findIndex((element=>{if(element===`${insAllMonth.value}`)return true}))
    const chosenYear = insAllYear.value
    var subDevs;
    var load;
    if(academics.includes(academicValue)){
        try{
            subDevs = (await axios.get(`/didasko/subDev/${academicValue}`)).data
            load = (await axios.get(`/didasko/academics/load/${academicValue}/${chosenYear}/${chosenMonth+1}`)).data
        }catch(err){
            console.log(err)
        }
    }
    
    var yearMonths = new Map()
    for(var i = (chosenMonth-2);i<=(chosenMonth);i++){
        yearMonths.set(`_${chosenYear}_${months[i]}`, i)
    }
    
    var mainAllocationsHTML = ``;
    var supportAllocationsHTML = ``;
    const allocations = assignments.filter((assignment)=>{
        if(assignment.academicId===academicValue){
            if (yearMonths.has(assignment.instanceId.substring(7))){
                // console.log(assignment.instanceId.substring(7))
                return true;
            }
        }
        return false;
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
        if(chosenMonth<=8){
            var monthString = `0${chosenMonth+1}`
        }else{
            var monthString = `${chosenMonth+1}`
        }
        const currentMonth = new Date(`${chosenYear}-${monthString}-01`)
        console.log('selected month: ', currentMonth.toISOString())
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
    const input = document.getElementById('instanceCombo').value;
    var enrolments = document.getElementById('enrolments');
    var mainListHTML = ``;
    var supportListHTML = ``;
    var relevantAcademics;
    if(input){
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
                
            }else{
                console.log('instance name not found in list')
            }
        });
    }
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
        const subjects = (await axios.get('/didasko/subjects')).data
        instancesSchedule = (await axios.get('/didasko/instances/schedule')).data
        assignments = (await axios.get('/didasko/assignments')).data

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
    
    }catch(err){
        console.log(err)
    }
}

loadSchedule();
addListeners();
setCombo('/didasko/academics', 'academicList');
setCombo('/didasko/instances', 'instanceList');