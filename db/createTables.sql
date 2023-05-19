create table academics(
    id varchar(60),
    constraint PK_id primary key (id));

create table subjects(
    id varchar(16),
    yearLevel int not null,
    constraint PK_subjects_id primary key (id));

create table instances(
    id varchar(34),
    subId varchar(16) not null,
    enrolments int default 0,
    startDate date not null,
    constraint PK_instance_id primary key (id),
    constraint FK_instance_subject foreign key (subId) references subjects(id) on delete cascade on update cascade);

create table subDev(
    subId varchar(16),
    academicId varchar(60) not null,
    startDate date not null,
    endDate date not null,
    constraint FK_subDev_subject foreign key(subId) references subjects(id) on delete cascade on update cascade,
    constraint FK_subDev_academic foreign key(academicId) references academics(id) on delete cascade on update cascade,
    constraint PK_subDev_subId primary key clustered (subId, academicId));

create table assignments(
    instanceId varchar(34),academicId varchar(60), main bit not null,
    constraint FK_assignment_instance foreign key(instanceId) references instances(id) on delete cascade on update cascade,
    constraint FK_assignment_academic foreign key(academicId) references academics(id) on delete cascade on update cascade,
    constraint PK_assignment_instanceId primary key clustered (instanceId, academicId));

create table qualifications(
    subId varchar(16),
    academicId varchar(60),
    constraint FK_qualifications_subject foreign key(subId) references subjects(id) on delete cascade on update cascade,
    constraint FK_qualifications_academic foreign key(academicId) references academics(id) on delete cascade on update cascade,
    constraint PK_qualifications_subId primary key clustered (subId, academicId));

	CREATE TABLE [dbo].[sessions](
    [sid] [nvarchar](255) NOT NULL PRIMARY KEY,
    [session] [nvarchar](max) NOT NULL,
    [expires] [datetime] NOT NULL
)