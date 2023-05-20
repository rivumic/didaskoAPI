--subjects
insert into subjects(id, yearLevel)
values('CSE1ITX', 1);
insert into subjects(id, yearLevel)
values('CSE1PGX', 1);
insert into subjects(id, yearLevel)
values('CSE1CFX', 1);
insert into subjects(id, yearLevel)
values('CSE1OFX', 1);
insert into subjects(id, yearLevel)
values('CSE1ISX', 1);
insert into subjects(id, yearLevel)
values('CSE1IOX', 1);
insert into subjects(id, yearLevel)
values('CSE2NFX', 2);
insert into subjects(id, yearLevel)
values('CSE2DCX', 2);
insert into subjects(id, yearLevel)
values('CSE2CNX', 2);
insert into subjects(id, yearLevel)
values('CSE2OSX', 2);
insert into subjects(id, yearLevel)
values('CSE2ICX', 2);
insert into subjects(id, yearLevel)
values('CSE3CSX', 3);
insert into subjects(id, yearLevel)
values('CSE3PEX', 3);
insert into subjects(id, yearLevel)
values('CSE3BDX', 3);
insert into subjects(id, yearLevel)
values('CSE3PAX', 3);
insert into subjects(id, yearLevel)
values('CSE3PBX', 3);
--instance-less subjects for subDev
insert into subjects(id, yearLevel)
values('CSE3TEX', 3);
insert into subjects(id, yearLevel)
values('CSE3CEX', 3);
insert into subjects(id, yearLevel)
values('CSE3HTX', 3);
insert into subjects(id, yearLevel)
values('CSE3EEX', 3);
insert into subjects(id, yearLevel)
values('CSE3OUX', 3);
insert into subjects(id, yearLevel)
values('CSE3PPX', 3);
--academics
insert into academics(id)
values('Ken Adams');
insert into academics(id)
values('William Guile');
insert into academics(id)
values('Cammy White');
insert into academics(id)
values('Chun Li');
insert into academics(id)
values('Charlie Nash');
insert into academics(id)
values('Dhalsim Bhat');
insert into academics(id)
values('Fabio de la Vega');
insert into academics(id)
values('Karin Kanzuki');
insert into academics(id)
values('Mike Bison');
insert into academics(id)
values('Ryu Johnson');

--instances 2023
insert into instances(id, subId, enrolments, startDate)
values('CSE1ITX_2023_January', 'CSE1ITX', 60, '2023-01-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1ITX_2023_February', 'CSE1ITX', 45, '2023-02-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1ITX_2023_March', 'CSE1ITX', 67, '2023-03-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1ITX_2023_April', 'CSE1ITX', 60, '2023-04-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1ITX_2023_May', 'CSE1ITX', 32, '2023-05-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1ITX_2023_June', 'CSE1ITX', 20, '2023-06-01');

insert into instances(id, subId, enrolments, startDate)
values('CSE1PGX_2023_January', 'CSE1PGX', 60, '2023-01-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1PGX_2023_February', 'CSE1PGX', 45, '2023-02-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1PGX_2023_March', 'CSE1PGX', 69, '2023-03-01');

insert into instances(id, subId, enrolments, startDate)
values('CSE1CFX_2023_January', 'CSE1CFX', 25, '2023-01-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1CFX_2023_February', 'CSE1CFX', 26, '2023-02-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1CFX_2023_March', 'CSE1CFX', 63, '2023-03-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1CFX_2023_April', 'CSE1CFX', 43, '2023-04-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1CFX_2023_May', 'CSE1CFX', 87, '2023-05-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1CFX_2023_June', 'CSE1CFX', 13, '2023-06-01');

insert into instances(id, subId, enrolments, startDate)
values('CSE1OFX_2023_January', 'CSE1OFX',0, '2023-01-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1OFX_2023_February', 'CSE1OFX',5, '2023-02-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1OFX_2023_March', 'CSE1OFX',9, '2023-03-01');

insert into instances(id, subId, enrolments, startDate)
values('CSE1ISX_2023_January', 'CSE1ISX', 70, '2023-01-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1ISX_2023_April', 'CSE1ISX', 10, '2023-04-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1ISX_2023_May', 'CSE1ISX', 27, '2023-05-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1ISX_2023_June', 'CSE1ISX', 78, '2023-06-01');

insert into instances(id, subId, enrolments, startDate)
values('CSE1IOX_2023_January', 'CSE1IOX', 50, '2023-01-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1IOX_2023_February', 'CSE1IOX', 35, '2023-02-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1IOX_2023_March', 'CSE1IOX', 54, '2023-03-01');

--Second year
--NFX
insert into instances(id, subId, enrolments, startDate)
values('CSE2NFX_2023_January', 'CSE2NFX', 75, '2023-01-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE2NFX_2023_February', 'CSE2NFX', 65, '2023-02-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE2NFX_2023_March', 'CSE2NFX', 87, '2023-03-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE2NFX_2023_April', 'CSE2NFX', 30, '2023-04-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE2NFX_2023_May', 'CSE2NFX', 23, '2023-05-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE2NFX_2023_June', 'CSE2NFX', 90, '2023-06-01');

--CSE2DCX
insert into instances(id, subId, enrolments, startDate)
values('CSE2DCX_2023_February', 'CSE2DCX', 35, '2023-02-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE2DCX_2023_April', 'CSE2DCX', 23, '2023-04-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE2DCX_2023_May', 'CSE2DCX', 33, '2023-05-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE2DCX_2023_June', 'CSE2DCX', 12, '2023-06-01');

--CSE2CNX
insert into instances(id, subId, enrolments, startDate)
values('CSE2CNX_2023_May', 'CSE2CNX', 8, '2023-05-01');

--CSE2OSX
insert into instances(id, subId, enrolments, startDate)
values('CSE2OSX_2023_February', 'CSE2OSX', 16, '2023-02-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE2OSX_2023_May', 'CSE2OSX', 19, '2023-05-01');

--CSE2ICX
insert into instances(id, subId, enrolments, startDate)
values('CSE2ICX_2023_February', 'CSE2ICX', 35, '2023-02-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE2ICX_2023_March', 'CSE2ICX', 60, '2023-03-01');

-- CSE3CSX
insert into instances(id, subId, enrolments, startDate)
values('CSECSX_2023_February', 'CSE3CSX', 35, '2023-02-01');
-- CSE3PEX
insert into instances(id, subId, enrolments, startDate)
values('CSE3PEX_2023_May', 'CSE3PEX', 23, '2023-05-01');
-- CSE3BDX
insert into instances(id, subId, enrolments, startDate)
values('CSE3BDX_2023_April', 'CSE3BDX', 23, '2023-04-01');
-- CSE3PAX
insert into instances(id, subId, enrolments, startDate)
values('CSE3PAX_2023_February', 'CSE3PAX', 16, '2023-02-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE3PAX_2023_May', 'CSE3PAX', 19, '2023-05-01');
-- CSE3PBX
insert into instances(id, subId, enrolments, startDate)
values('CSE3PBX_2023_February', 'CSE3PBX', 16, '2023-02-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE3PBX_2023_May', 'CSE3PBX', 19, '2023-05-01');

--qualifications
insert into qualifications(subId, academicId)
values('CSE1ITX', 'Ken Adams');
insert into qualifications(subId, academicId)
values('CSE1PGX', 'William Guile');
insert into qualifications(subId, academicId)
values('CSE1CFX', 'Cammy White');
insert into qualifications(subId, academicId)
values('CSE1OFX', 'Chun Li');
insert into qualifications(subId, academicId)
values('CSE1ISX', 'Charlie Nash');
insert into qualifications(subId, academicId)
values('CSE1IOX', 'William Guile');
insert into qualifications(subId, academicId)
values('CSE2NFX', 'Dhalsim Bhat');
insert into qualifications(subId, academicId)
values('CSE2DCX', 'Cammy White');
insert into qualifications(subId, academicId)
values('CSE2CNX', 'Dhalsim Bhat');
insert into qualifications(subId, academicId)
values('CSE2OSX', 'Charlie Nash');
insert into qualifications(subId, academicId)
values('CSE2ICX', 'Fabio de la Vega');
insert into qualifications(subId, academicId)
values('CSE3CSX', 'Karin Kanzuki');
insert into qualifications(subId, academicId)
values('CSE3PEX', 'Mike Bison');
insert into qualifications(subId, academicId)
values('CSE3BDX', 'Ryu Johnson');
insert into qualifications(subId, academicId)
values('CSE3PAX', 'Mike Bison');
insert into qualifications(subId, academicId)
values('CSE3PBX', 'Mike Bison');

--instances 2024
insert into instances(id, subId, enrolments, startDate)
values('CSE1ITX_2024_January', 'CSE1ITX', 60, '2024-01-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1ITX_2024_February', 'CSE1ITX', 45, '2024-02-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1ITX_2024_March', 'CSE1ITX', 67, '2024-03-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1ITX_2024_April', 'CSE1ITX', 60, '2024-04-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1ITX_2024_May', 'CSE1ITX', 32, '2024-05-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1ITX_2024_June', 'CSE1ITX', 20, '2024-06-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1ITX_2024_July', 'CSE1ITX', 60, '2024-07-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1ITX_2024_August', 'CSE1ITX', 45, '2024-08-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1ITX_2024_September', 'CSE1ITX', 67, '2024-09-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1ITX_2024_October', 'CSE1ITX', 60, '2024-10-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1ITX_2024_November', 'CSE1ITX', 32, '2024-11-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1ITX_2024_December', 'CSE1ITX', 20, '2024-12-01');

insert into instances(id, subId, enrolments, startDate)
values('CSE1PGX_2024_January', 'CSE1PGX', 60, '2024-01-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1PGX_2024_February', 'CSE1PGX', 45, '2024-02-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1PGX_2024_March', 'CSE1PGX', 69, '2024-03-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1PGX_2024_July', 'CSE1PGX', 60, '2024-07-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1PGX_2024_August', 'CSE1PGX', 45, '2024-08-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1PGX_2024_September', 'CSE1PGX', 69, '2024-09-01');

insert into instances(id, subId, enrolments, startDate)
values('CSE1CFX_2024_January', 'CSE1CFX', 25, '2024-01-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1CFX_2024_February', 'CSE1CFX', 26, '2024-02-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1CFX_2024_March', 'CSE1CFX', 63, '2024-03-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1CFX_2024_April', 'CSE1CFX', 43, '2024-04-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1CFX_2024_May', 'CSE1CFX', 87, '2024-05-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1CFX_2024_June', 'CSE1CFX', 13, '2024-06-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1CFX_2024_July', 'CSE1CFX', 25, '2024-07-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1CFX_2024_August', 'CSE1CFX', 26, '2024-08-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1CFX_2024_September', 'CSE1CFX', 63, '2024-09-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1CFX_2024_October', 'CSE1CFX', 43, '2024-10-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1CFX_2024_November', 'CSE1CFX', 87, '2024-11-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1CFX_2024_December', 'CSE1CFX', 13, '2024-12-01');

insert into instances(id, subId, enrolments, startDate)
values('CSE1OFX_2024_January', 'CSE1OFX',0, '2024-01-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1OFX_2024_February', 'CSE1OFX',5, '2024-02-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1OFX_2024_March', 'CSE1OFX',9, '2024-03-01');

insert into instances(id, subId, enrolments, startDate)
values('CSE1OFX_2024_July', 'CSE1OFX',0, '2024-07-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1OFX_2024_August', 'CSE1OFX',5, '2024-08-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1OFX_2024_September', 'CSE1OFX',9, '2024-09-01');

insert into instances(id, subId, enrolments, startDate)
values('CSE1ISX_2024_May', 'CSE1ISX', 70, '2024-05-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1ISX_2024_June', 'CSE1ISX', 10, '2024-06-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1ISX_2024_July', 'CSE1ISX', 27, '2024-07-01');

insert into instances(id, subId, enrolments, startDate)
values('CSE1ISX_2024_October', 'CSE1ISX', 70, '2024-10-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1ISX_2024_Novemeber', 'CSE1ISX', 10, '2024-11-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1ISX_2024_December', 'CSE1ISX', 27, '2024-12-01');

insert into instances(id, subId, enrolments, startDate)
values('CSE1IOX_2024_January', 'CSE1IOX', 50, '2024-01-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1IOX_2024_February', 'CSE1IOX', 35, '2024-02-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1IOX_2024_March', 'CSE1IOX', 54, '2024-03-01');

insert into instances(id, subId, enrolments, startDate)
values('CSE1IOX_2024_July', 'CSE1IOX', 50, '2024-07-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1IOX_2024_August', 'CSE1IOX', 35, '2024-08-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE1IOX_2024_September', 'CSE1IOX', 54, '2024-09-01');

--Second year
--NFX
insert into instances(id, subId, enrolments, startDate)
values('CSE2NFX_2024_January', 'CSE2NFX', 75, '2024-01-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE2NFX_2024_February', 'CSE2NFX', 65, '2024-02-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE2NFX_2024_March', 'CSE2NFX', 87, '2024-03-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE2NFX_2024_April', 'CSE2NFX', 30, '2024-04-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE2NFX_2024_May', 'CSE2NFX', 23, '2024-05-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE2NFX_2024_June', 'CSE2NFX', 90, '2024-06-01');

--CSE2DCX
insert into instances(id, subId, enrolments, startDate)
values('CSE2DCX_2024_February', 'CSE2DCX', 35, '2024-02-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE2DCX_2024_April', 'CSE2DCX', 23, '2024-04-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE2DCX_2024_May', 'CSE2DCX', 33, '2024-05-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE2DCX_2024_June', 'CSE2DCX', 12, '2024-06-01');

--CSE2CNX
insert into instances(id, subId, enrolments, startDate)
values('CSE2CNX_2024_May', 'CSE2CNX', 8, '2024-05-01');

--CSE2OSX
insert into instances(id, subId, enrolments, startDate)
values('CSE2OSX_2024_February', 'CSE2OSX', 16, '2024-02-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE2OSX_2024_May', 'CSE2OSX', 19, '2024-05-01');

--CSE2ICX
insert into instances(id, subId, enrolments, startDate)
values('CSE2ICX_2024_February', 'CSE2ICX', 35, '2024-02-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE2ICX_2024_March', 'CSE2ICX', 60, '2024-03-01');

-- CSE3CSX
insert into instances(id, subId, enrolments, startDate)
values('CSECSX_2024_February', 'CSE3CSX', 35, '2024-02-01');
-- CSE3PEX
insert into instances(id, subId, enrolments, startDate)
values('CSE3PEX_2024_May', 'CSE3PEX', 23, '2024-05-01');
-- CSE3BDX
insert into instances(id, subId, enrolments, startDate)
values('CSE3BDX_2024_April', 'CSE3BDX', 23, '2024-04-01');
-- CSE3PAX
insert into instances(id, subId, enrolments, startDate)
values('CSE3PAX_2024_February', 'CSE3PAX', 16, '2024-02-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE3PAX_2024_May', 'CSE3PAX', 19, '2024-05-01');
-- CSE3PBX
insert into instances(id, subId, enrolments, startDate)
values('CSE3PBX_2024_February', 'CSE3PBX', 16, '2024-02-01');
insert into instances(id, subId, enrolments, startDate)
values('CSE3PBX_2024_May', 'CSE3PBX', 19, '2024-05-01');

--assignments
insert into assignments(instanceId, academicId, main)
values('CSE1ITX_2023_January', 'Ken Adams', 1);
insert into assignments(instanceId, academicId, main)
values('CSE1ITX_2023_February', 'Ken Adams', 1);
insert into assignments(instanceId, academicId, main)
values('CSE1ITX_2023_March', 'Ken Adams', 1);
insert into assignments(instanceId, academicId, main)
values('CSE1ITX_2023_April', 'Ken Adams', 1);
insert into assignments(instanceId, academicId, main)
values('CSE1ITX_2023_May', 'Ken Adams', 1);
insert into assignments(instanceId, academicId, main)
values('CSE1ITX_2023_June', 'Ken Adams', 1);
insert into assignments(instanceId, academicId, main)
values('CSE1PGX_2023_January', 'William Guile', 1);
insert into assignments(instanceId, academicId, main)
values('CSE1PGX_2023_February', 'William Guile', 1);
insert into assignments(instanceId, academicId, main)
values('CSE1PGX_2023_March', 'William Guile', 1);
insert into assignments(instanceId, academicId, main)
values('CSE1CFX_2023_January', 'Cammy White', 1);
insert into assignments(instanceId, academicId, main)
values('CSE1CFX_2023_February', 'Cammy White', 1);
insert into assignments(instanceId, academicId, main)
values('CSE1CFX_2023_March', 'Cammy White', 1);
insert into assignments(instanceId, academicId, main)
values('CSE1CFX_2023_April', 'Cammy White', 1);
insert into assignments(instanceId, academicId, main)
values('CSE1CFX_2023_May', 'Cammy White', 1);
insert into assignments(instanceId, academicId, main)
values('CSE1CFX_2023_June', 'Cammy White', 1);
insert into assignments(instanceId, academicId, main)
values('CSE1OFX_2023_January', 'Chun Li', 1);
insert into assignments(instanceId, academicId, main)
values('CSE1OFX_2023_February', 'Chun Li', 1);
insert into assignments(instanceId, academicId, main)
values('CSE1OFX_2023_March', 'Chun Li', 1);
insert into assignments(instanceId, academicId, main)
values('CSE1ISX_2023_January', 'Charlie Nash', 1);
insert into assignments(instanceId, academicId, main)
values('CSE1ISX_2023_April', 'Charlie Nash', 1);
insert into assignments(instanceId, academicId, main)
values('CSE1ISX_2023_May', 'Charlie Nash', 1);
insert into assignments(instanceId, academicId, main)
values('CSE1ISX_2023_June', 'Charlie Nash', 1);
insert into assignments(instanceId, academicId, main)
values('CSE1IOX_2023_January', 'William Guile', 1);
insert into assignments(instanceId, academicId, main)
values('CSE1IOX_2023_February', 'William Guile', 1);
insert into assignments(instanceId, academicId, main)
values('CSE1IOX_2023_March', 'William Guile', 1);
insert into assignments(instanceId, academicId, main)
values('CSE2NFX_2023_January', 'Dhalsim Bhat', 1);
insert into assignments(instanceId, academicId, main)
values('CSE2NFX_2023_February', 'Dhalsim Bhat', 1);
insert into assignments(instanceId, academicId, main)
values('CSE2NFX_2023_March', 'Dhalsim Bhat', 1);
insert into assignments(instanceId, academicId, main)
values('CSE2NFX_2023_April', 'Dhalsim Bhat', 1);
insert into assignments(instanceId, academicId, main)
values('CSE2NFX_2023_May', 'Dhalsim Bhat', 1);
insert into assignments(instanceId, academicId, main)
values('CSE2NFX_2023_June', 'Dhalsim Bhat', 1);
insert into assignments(instanceId, academicId, main)
values('CSE2DCX_2023_February', 'Cammy White', 1);
insert into assignments(instanceId, academicId, main)
values('CSE2DCX_2023_April', 'Cammy White', 1);
insert into assignments(instanceId, academicId, main)
values('CSE2DCX_2023_May', 'Cammy White', 1);
insert into assignments(instanceId, academicId, main)
values('CSE2DCX_2023_June', 'Cammy White', 1);
insert into assignments(instanceId, academicId, main)
values('CSE2DCX_2023_June', 'Fabio de la Vega', 0);
insert into assignments(instanceId, academicId, main)
values('CSE2DCX_2023_June', 'Ryu Johnson', 0);
insert into assignments(instanceId, academicId, main)
values('CSE2CNX_2023_May', 'Dhalsim Bhat', 1);
insert into assignments(instanceId, academicId, main)
values('CSE2OSX_2023_February', 'Charlie Nash', 1);
insert into assignments(instanceId, academicId, main)
values('CSE2OSX_2023_May', 'Charlie Nash', 1);
insert into assignments(instanceId, academicId, main)
values('CSE2ICX_2023_February', 'Fabio de la Vega', 1);
insert into assignments(instanceId, academicId, main)
values('CSE2ICX_2023_March', 'Fabio de la Vega', 1);
insert into assignments(instanceId, academicId, main)
values('CSE2ICX_2023_February', 'Karin Kanzuki', 1);
insert into assignments(instanceId, academicId, main)
values('CSE3PEX_2023_May', 'Mike Bison', 1);
insert into assignments(instanceId, academicId, main)
values('CSE3BDX_2023_April', 'Ryu Johnson', 1);
insert into assignments(instanceId, academicId, main)
values('CSE3PAX_2023_February', 'Mike Bison', 1);
insert into assignments(instanceId, academicId, main)
values('CSE3PAX_2023_May', 'Mike Bison', 1);
insert into assignments(instanceId, academicId, main)
values('CSE3PBX_2023_February', 'Mike Bison', 1);
insert into assignments(instanceId, academicId, main)
values('CSE3PBX_2023_May', 'Mike Bison', 1);


--subDev workloads
insert into subDev(subId, academicId, startDate, endDate)
values('CSE3TEX', 'Ryu Johnson', '2023-05-01', '2023-07-01');
insert into subDev(subId, academicId, startDate, endDate)
values('CSE3CEX', 'Ryu Johnson', '2023-05-01', '2023-07-01');
insert into subDev(subId, academicId, startDate, endDate)
values('CSE3HTX', 'Karin Kanzuki', '2023-05-01', '2023-07-01');
insert into subDev(subId, academicId, startDate, endDate)
values('CSE3PPX', 'Karin Kanzuki', '2023-05-01', '2023-07-01');
insert into subDev(subId, academicId, startDate, endDate)
values('CSE3OUX', 'Fabio de la Vega', '2023-06-01', '2023-08-01');
insert into subDev(subId, academicId, startDate, endDate)
values('CSE3PPX', 'Fabio de la Vega', '2023-10-01', '2023-11-01');